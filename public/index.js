import {World} from "./world.js";
import {io} from "socket.io-client";

const startButton = document.getElementById('startButton');
const shareScreenButton = document.getElementById("shareScreen");
const disconnectCallButton = document.getElementById("disconnectCall");
const toggleAudioButton = document.getElementById("toggleAudio");
const toggleVideoButton = document.getElementById("toggleVideo");

let world = null;

let socket;

let mediaStream, screenStream;

let selfSocketId = null;

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
        }
    });

    socket.on("client_exit", (data) => {
        console.log("client_exit");

        if (selfSocketId !== data.clientId) {
            world.removeClient(data.clientId);
        }
    });
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
    console.log("Toggle Audio");
}

function toggleVideo() {
    console.log("Toggle Video");
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

    if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
            track.stop();
        });
        mediaStream = null;
    }

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
