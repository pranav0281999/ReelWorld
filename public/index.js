import {World} from "./world.js";
import {io} from "socket.io-client";

const startButton = document.getElementById('startButton');
const shareScreenButton = document.getElementById("shareScreen");

let world = null;

let socket;

startButton.addEventListener('click', init);

function init() {
    startButton.textContent = "Joining...";

    socket = io();

    socket.on("connect", () => {
        startButton.textContent = "Join";

        console.log("Connected to server");

        callConnect();

        shareScreenButton.addEventListener('click', shareScreen);

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
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
    }).then((mediaStream) => {
        let video = document.createElement('video');
        video.srcObject = mediaStream;
        video.id = "local_video";
        video.play().then(() => {
            console.log("Local video playing");
        });

        world = new World(video);
        world.init();
    });
}

function callDisconnect() {
    //remove the call options as no longer needed, show overlay
    document.getElementById("conferenceOptions").style.display = "none";
    document.getElementById("overlay").style.display = "block";
}

function shareScreen() {
    let screenStream = navigator.mediaDevices.getDisplayMedia({
        video: {
            frameRate: 10,
            width: 1280,
            height: 720
        },
        audio: true
    }).then((mediaStream) => {
        let video = document.createElement('video');
        video.srcObject = mediaStream;
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
