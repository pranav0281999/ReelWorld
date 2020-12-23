import {World} from "./world.js";
import {io} from "socket.io-client";

const startButton = document.getElementById('startButton');
const shareScreenButton = document.getElementById("shareScreen");
const disconnectCallButton = document.getElementById("disconnectCall");
const toggleAudioButton = document.getElementById("toggleAudio");
const toggleVideoButton = document.getElementById("toggleVideo");

let world = null;

let socket;

let videoStream, audioStream, screenShareStream;

let selfSocketId = null;

let audioEnabled = false, videoEnabled = false, screenShareEnabled = false;
let currentVideoElement = null;

startButton.addEventListener('click', init);

function init() {
    startButton.textContent = "Joining...";

    socket = io();

    socket.on("connect", () => {
        startButton.textContent = "Join";

        console.log("Connected to server");

        callConnect();
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");

        handleCallDisconnect();

        selfSocketId = null;
    });

    socket.on("initial_state", (data) => {
        console.log("initial_state");

        selfSocketId = data.clientId;

        Object.keys(data.clients).forEach(function (key) {
            if (key !== selfSocketId) {
                if (data.clients[key]) {
                    world.addClient(key);
                    world.updateClient(key, data.clients[key].position, data.clients[key].rotation);

                    addPeerConnectionForClient(key);
                }
            }
        });
    });

    socket.on("client_transformation", (data) => {
        console.log("client_transformation");

        if (selfSocketId !== data.clientId) {
            world.updateClient(data.clientId, data.position, data.rotation);
        }
    });

    socket.on("client_new", (data) => {
        console.log("client_new");

        if (selfSocketId !== data.clientId) {
            world.addClient(data.clientId);

            addPeerConnectionForClient(data.clientId);
            callClient(data.clientId);
        }
    });

    socket.on("client_exit", (data) => {
        console.log("client_exit");

        if (selfSocketId !== data.clientId) {
            closePeerConnection(data.clientId);
            world.removeClient(data.clientId);
        }
    });

    socket.on("offer-from-client", data => {
        console.log("Offer from " + data.clientId);

        world.clients[data.clientId].peerConnection.setRemoteDescription(data.offer)
            .then(value => {
                console.log("Remote description set " + value);

                const answer = world.clients[data.clientId].peerConnection.createAnswer().then(answer => {
                    world.clients[data.clientId].peerConnection.setLocalDescription(answer)
                        .then(value => {
                            console.log("Local answer description set " + value);

                            socket.emit("answer-to-client", {
                                clientId: data.clientId,
                                answer: answer
                            });
                        })
                        .catch(reason => console.log("Couldn't set local answer description " + reason));
                })
                    .catch(reason => console.log("Couldn't create answer"));
            })
            .catch(reason => console.log("Couldn't set remote offer description " + reason));
    });

    socket.on("answer-from-client", data => {
        console.log("Answer from " + data.clientId);

        world.clients[data.clientId].peerConnection.setRemoteDescription(data.answer)
            .then(value => {
                console.log("Remote answer description set " + value);

                if (videoEnabled && videoStream) {
                    world.clients[data.clientId].videoSender = world.clients[data.clientId].peerConnection
                        .addTrack(videoStream.getVideoTracks()[0], videoStream);
                }

                if (audioEnabled && audioStream) {
                    world.clients[data.clientId].audioSender = world.clients[data.clientId].peerConnection
                        .addTrack(audioStream.getAudioTracks()[0], audioStream);
                }
            })
            .catch(reason => console.log("Couldn't set remote answer description " + reason));
    });

    socket.on("icecandidate-from-client", data => {
        console.log("ICECandidate from " + data.clientId);

        const candidate = new RTCIceCandidate(data.icecandidate);

        world.clients[data.clientId].peerConnection.addIceCandidate(candidate)
            .then(value => console.log("ICECandidate added" + value))
            .catch(reason => console.log("Couldn't add ICECandidate " + reason));
    });
}

function addPeerConnectionForClient(key) {
    let peerConnection = new RTCPeerConnection({
        iceServers:
            [{
                urls:
                    ["stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302"]
            }]
    });

    peerConnection.onconnectionstatechange = () => {
        console.log("onconnectionstatechange");
    }

    peerConnection.ondatachannel = () => {
        console.log("ondatachannel");
    }

    peerConnection.onicecandidate = (event) => {
        console.log("onicecandidate");

        if (event.candidate) {
            socket.emit("icecandidate-to-client", {
                clientId: key,
                icecandidate: event.candidate
            });
        }
    }

    peerConnection.onicecandidateerror = () => {
        console.log("onicecandidateerror");
    }

    peerConnection.oniceconnectionstatechange = () => {
        console.log("oniceconnectionstatechange");

        switch (peerConnection.iceConnectionState) {
            case "closed":
            case "failed":
                closePeerConnection(key);
                break;
        }
    }

    peerConnection.onicegatheringstatechange = () => {
        console.log("onicegatheringstatechange");
    }

    peerConnection.ontrack = (event) => {
        console.log("ontrack");

        if (event.streams[0].getAudioTracks().length > 0) {
            world.addAudioForClient(key, event.streams[0]);

            event.streams[0].onremovetrack = (ev) => {
                if (event.streams[0].getAudioTracks().length < 1) {
                    world.removeAudioForClient(key);
                }
            }
        }

        if (event.streams[0].getVideoTracks().length > 0) {
            world.addVideoForClient(key, event.streams[0]);

            event.streams[0].onremovetrack = (ev) => {
                if (event.streams[0].getVideoTracks().length < 1) {
                    world.removeVideoForClient(key);
                }
            }
        }
    }

    peerConnection.onstatsended = () => {
        console.log("onstatsended");
    }

    peerConnection.onsignalingstatechange = (event) => {
        console.log("onsignalingstatechange");

        switch (peerConnection.signalingState) {
            case "closed":
                closePeerConnection(key);
        }
    }

    peerConnection.onnegotiationneeded = () => {
        console.log("onnegotiationneeded");

        callClient(key);
    }

    world.clients[key].peerConnection = peerConnection;
    world.clients[key].videoSender = null;
    world.clients[key].audioSender = null;
}

function closePeerConnection(key) {
    if (world.clients[key].peerConnection) {
        world.clients[key].peerConnection.ontrack = null;
        world.clients[key].peerConnection.onremovetrack = null;
        world.clients[key].peerConnection.onremovestream = null;
        world.clients[key].peerConnection.onicecandidate = null;
        world.clients[key].peerConnection.oniceconnectionstatechange = null;
        world.clients[key].peerConnection.onsignalingstatechange = null;
        world.clients[key].peerConnection.onicegatheringstatechange = null;
        world.clients[key].peerConnection.onnegotiationneeded = null;

        world.clients[key].peerConnection.close();
        world.clients[key].peerConnection = null;
    }
}


function callClient(key) {
    const offer = world.clients[key].peerConnection.createOffer()
        .then(offer => {
            world.clients[key].peerConnection.setLocalDescription(offer)
                .then(value => {
                    console.log("Local offer description set " + value);

                    socket.emit("offer-to-client", {
                        clientId: key,
                        offer: offer
                    });
                })
                .catch(reason => console.log("Couldn't set local offer description " + reason));
        })
        .catch(reason => console.log("Couldn't create offer"));
}

function sendUserPosition() {
    socket.emit("client_transformation", {
        position: [
            world.user.position.x,
            world.user.position.y,
            world.user.position.z
        ],
        rotation: [
            world.user.quaternion.x,
            world.user.quaternion.y,
            world.user.quaternion.z,
            world.user.quaternion.w
        ]
    });
}

function callConnect() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("conferenceOptions").style.display = "flex";
    document.getElementById("streamOptions").style.display = "flex";

    world = new World(sendUserPosition);
    world.init();

    shareScreenButton.addEventListener('click', toggleShareScreen);
    disconnectCallButton.addEventListener('click', disconnectCall);
    toggleAudioButton.addEventListener('click', toggleAudio);
    toggleVideoButton.addEventListener('click', toggleVideo);
}

function toggleAudio() {
    if (audioEnabled && audioStream) {
        turnAudioOff()
    } else {
        turnAudioOn();
    }
}

function turnAudioOff() {
    if (audioEnabled && audioStream) {
        audioStream.getTracks().forEach(track => {
            track.stop();
            audioStream.removeTrack(track);
        });
        audioStream = null;

        audioEnabled = false;

        Object.keys(world.clients).forEach(function (key) {
            if (key !== selfSocketId) {
                if (world.clients[key]) {
                    if (world.clients[key].audioSender) {
                        world.clients[key].peerConnection.removeTrack(world.clients[key].audioSender);
                        world.clients[key].audioSender = null;
                    }
                }
            }
        });
    }
}

function turnAudioOn() {
    let constraints = {
        audio: {
            echoCancellation: true,
            noiseSuppression: true
        }
    };

    let localMediaStream = navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        audioEnabled = true;

        audioStream = stream;

        Object.keys(world.clients).forEach(function (key) {
            if (key !== selfSocketId) {
                if (world.clients[key]) {
                    world.clients[key].audioSender = world.clients[key].peerConnection
                        .addTrack(stream.getAudioTracks()[0], stream);
                }
            }
        });
    });
}

function toggleVideo() {
    if (videoEnabled && videoStream) {
        turnVideoOff();
    } else {
        turnVideoOn();
    }
}

function turnVideoOff() {
    if (videoEnabled && videoStream) {
        videoStream.getTracks().forEach(track => {
            track.stop();
            videoStream.removeTrack(track);
        });

        videoStream = null;

        videoEnabled = false;

        world.removeVideoStreamForUser();

        if (currentVideoElement) {
            currentVideoElement.pause();
        }
        currentVideoElement = null;

        Object.keys(world.clients).forEach(function (key) {
            if (key !== selfSocketId) {
                if (world.clients[key]) {
                    if (world.clients[key].videoSender) {
                        world.clients[key].peerConnection.removeTrack(world.clients[key].videoSender);
                        world.clients[key].videoSender = null;
                    }
                }
            }
        });
    }
}

function turnVideoOn() {
    let constraints = {
        audio: false,
        video: {
            frameRate: 10,
            width: 100,
            height: 100,
            aspectRatio: 1
        }
    };

    let localMediaStream = navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoEnabled = true;

        videoStream = stream;
        let video = document.createElement('video');
        video.srcObject = stream;
        video.id = "local_video";
        video.play().then(() => {
            console.log("Local video playing");
        });

        if (currentVideoElement) {
            currentVideoElement.pause();
        }
        currentVideoElement = video;

        world.addVideoForUser(video);

        Object.keys(world.clients).forEach(function (key) {
            if (key !== selfSocketId) {
                if (world.clients[key]) {
                    world.clients[key].videoSender = world.clients[key].peerConnection
                        .addTrack(stream.getVideoTracks()[0], stream);
                }
            }
        });
    });
}

function toggleShareScreen() {
    if (screenShareEnabled && screenShareStream) {
        turnScreenShareOff();
    } else {
        turnScreenShareOn();
    }
}

function turnScreenShareOn() {
    let localScreenStream = navigator.mediaDevices.getDisplayMedia({
        video: {
            frameRate: 10,
            width: 1280,
            height: 720
        },
        audio: true
    }).then((stream) => {
        screenShareStream = stream;

        shareScreenButton.textContent = "Stop Sharing";

        screenShareEnabled = true;
    }).catch(err => {
        console.error("Error:" + err);
        return null;
    });
}

function turnScreenShareOff() {
    if (screenShareEnabled && screenShareStream) {
        screenShareStream.getTracks().forEach(track => {
            track.stop();
            screenShareStream.removeTrack(track);
        });

        screenShareStream = null;

        screenShareEnabled = false;

        // world.removeVideoStreamForUser();
        world.removeScreenShare();

        // if (currentVideoElement) {
        //     currentVideoElement.pause();
        // }
        // currentVideoElement = null;

        shareScreenButton.textContent = "Share Screen";
    }
}

function disconnectCall() {
    socket.disconnect();
}

function handleCallDisconnect() {
    //remove the call options as no longer needed, show overlay
    document.getElementById("conferenceOptions").style.display = "none";
    document.getElementById("streamOptions").style.display = "none";
    document.getElementById("overlay").style.display = "flex";

    turnAudioOff();
    turnVideoOff();
    turnScreenShareOff();

    videoEnabled = false;
    audioEnabled = false;
    screenShareEnabled = false;

    Object.keys(world.clients).forEach(function (key) {
        if (key !== selfSocketId) {
            if (world.clients[key]) {
                if (world.clients[key].peerConnection) {
                    world.clients[key].peerConnection.close();
                }
            }
        }
    });

    world.endWorld();
    world = null;

    shareScreenButton.removeEventListener('click', toggleShareScreen);
    disconnectCallButton.removeEventListener('click', disconnectCall);
    toggleAudioButton.removeEventListener('click', toggleAudio);
    toggleVideoButton.removeEventListener('click', toggleVideo);
}
