import {World} from "./world.js";
import {io} from "socket.io-client";

const startButton = document.getElementById('startButton');
const shareScreenButton = document.getElementById("shareScreen");
const disconnectCallButton = document.getElementById("disconnectCall");
const toggleAudioButton = document.getElementById("toggleAudio");
const toggleVideoButton = document.getElementById("toggleVideo");

let world = null;

let socket;

let videoStream, audioStream, screenStream;

let selfSocketId = null;

let audioEnabled = false, videoEnabled = false;
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
            })
            .catch(reason => console.log("Couldn't set remote answer description " + reason));
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
    peerConnection.onicecandidate = () => {
        console.log("onicecandidate");
    }
    peerConnection.onicecandidateerror = () => {
        console.log("onicecandidateerror");
    }
    peerConnection.oniceconnectionstatechange = () => {
        console.log("oniceconnectionstatechange");
    }
    peerConnection.onicegatheringstatechange = () => {
        console.log("onicegatheringstatechange");
    }
    peerConnection.ontrack = () => {
        console.log("ontrack");
    }
    peerConnection.onstatsended = () => {
        console.log("onstatsended");
    }
    peerConnection.onsignalingstatechange = () => {
        console.log("onsignalingstatechange");
    }
    peerConnection.onnegotiationneeded = () => {
        console.log("onnegotiationneeded");
    }

    world.clients[key].peerConnection = peerConnection;
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
        position: [world.user.position.x, world.user.position.y, world.user.position.z],
        rotation: [world.user.quaternion.x, world.user.quaternion.y, world.user.quaternion.z, world.user.quaternion.w]
    });
}

function callConnect() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("conferenceOptions").style.display = "flex";
    document.getElementById("streamOptions").style.display = "flex";

    world = new World(sendUserPosition);
    world.init();

    shareScreenButton.addEventListener('click', shareScreen);
    disconnectCallButton.addEventListener('click', disconnectCall);
    toggleAudioButton.addEventListener('click', toggleAudio);
    toggleVideoButton.addEventListener('click', toggleVideo);
}

function toggleAudio() {
    if (audioEnabled && audioStream) {
        audioStream.getTracks().forEach(track => {
            track.stop();
            audioStream.removeTrack(track);
        });
        audioStream = null;

        audioEnabled = false;

        world.removeAudioStreamForUser();
    } else {
        let constraints = {
            audio: true
        };

        let localMediaStream = navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            audioEnabled = true;

            audioStream = stream;

            world.addAudioForUser(stream);
        });
    }
}

function toggleVideo() {
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
    } else {
        let constraints = {
            audio: false,
            video: {
                frameRate: 10,
                width: 1280,
                height: 720
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
        });
    }
}

function disconnectCall() {
    socket.disconnect();
}

function handleCallDisconnect() {
    //remove the call options as no longer needed, show overlay
    stopSharingScreen();
    document.getElementById("conferenceOptions").style.display = "none";
    document.getElementById("streamOptions").style.display = "none";
    document.getElementById("overlay").style.display = "flex";

    world.endWorld();
    world = null;

    if (videoStream) {
        videoStream.getTracks().forEach(track => {
            track.stop();
        });
        videoStream = null;
    }

    if (audioStream) {
        audioStream.getTracks().forEach(track => {
            track.stop();
        });
        audioStream = null;
    }

    videoEnabled = false;
    audioEnabled = false;

    if (screenStream) {
        screenStream.getTracks().forEach(track => {
            track.stop();
        });
        screenStream = null;
    }

    shareScreenButton.removeEventListener('click', shareScreen);
    shareScreenButton.removeEventListener('click', stopSharingScreen);
    disconnectCallButton.removeEventListener('click', disconnectCall);
    toggleAudioButton.removeEventListener('click', toggleAudio);
    toggleVideoButton.removeEventListener('click', toggleVideo);
}

function shareScreen() {
    let localScreenStream = navigator.mediaDevices.getDisplayMedia({
        video: {
            frameRate: 10,
            width: 1280,
            height: 720
        },
        audio: true
    }).then((stream) => {
        screenStream = stream;
        let video = document.createElement('video');
        video.srcObject = stream;
        video.id = "local_video";
        video.play().then(() => {
            console.log("Local screen playing");
        });

        world.addScreenShare(video);

        shareScreenButton.textContent = "Stop Sharing";
        shareScreenButton.removeEventListener('click', shareScreen);
        shareScreenButton.addEventListener('click', stopSharingScreen);
    }).catch(err => {
        console.error("Error:" + err);
        return null;
    });
}

function stopSharingScreen() {
    shareScreenButton.textContent = "Share Screen";
    shareScreenButton.removeEventListener('click', stopSharingScreen);
    shareScreenButton.addEventListener('click', shareScreen);

    world.removeScreenShare();
}
