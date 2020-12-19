import {World} from "./world.js";
import {io} from "socket.io-client";

const startButton = document.getElementById('startButton');
const shareScreenButton = document.getElementById("shareScreen");
const disconnectCallButton = document.getElementById("disconnectCall");

let world = null;

let socket;

let mediaStream, screenStream;

startButton.addEventListener('click', init);

function init() {
    startButton.textContent = "Joining...";

    socket = io();

    socket.on("connect", () => {
        startButton.textContent = "Join";

        console.log("Connected to server");

        callConnect();

        shareScreenButton.addEventListener('click', shareScreen);
        disconnectCallButton.addEventListener('click', disconnectCall);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from server");

        handleCallDisconnect();
    });

    socket.on("initial_state", (data) => {
        console.log(data);
    });

    socket.on("client_transformation", (data) => {
        console.log(data);
    });

    socket.on("client_new", (data) => {
        console.log(data);
    });

    socket.on("client_exit", (data) => {
        console.log(data);
    });
}

function sendUserPosition() {
    socket.emit("client_transformation", {
        position: [world.user.position.x, world.user.position.x, world.user.position.z],
        rotation: [world.user.quaternion.x, world.user.quaternion.y, world.user.quaternion.z, world.user.quaternion.w]
    });
}

function callConnect() {
    //remove the overlay as no longer needed, show call options
    document.getElementById("overlay").style.display = "none";
    document.getElementById("conferenceOptions").style.display = "flex";

    //get local media stream, create the world and pass on stream
    let localMediaStream = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            frameRate: 10,
            width: 1280,
            height: 720
        }
    }).then((stream) => {
        mediaStream = stream;
        let video = document.createElement('video');
        video.srcObject = stream;
        video.id = "local_video";
        video.play().then(() => {
            console.log("Local video playing");
        });

        world = new World(video, sendUserPosition);
        world.init();
    });
}

function disconnectCall() {
    socket.disconnect();
}

function handleCallDisconnect() {
    //remove the call options as no longer needed, show overlay
    stopSharingScreen();
    document.getElementById("conferenceOptions").style.display = "none";
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
