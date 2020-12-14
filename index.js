import {World} from "./world.js";

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', init);

let world = null;

function init() {
    callConnect();

    const shareScreenButton = document.getElementById("shareScreen");
    shareScreenButton.addEventListener('click', shareScreen);
}

function callConnect() {
    //remove the overlay as no longer needed, show call options
    document.getElementById("overlay").style.display = "none";
    document.getElementById("conferenceOptions").style.display = "flex";

    //get local media stream, create the world and pass on stream
    let localMediaStream = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            aspectRatio: 1
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
        video: true,
        audio: true
    }).then((mediaStream) => {
        let video = document.createElement('video');
        video.srcObject = mediaStream;
        video.id = "local_video";
        video.play().then(() => {
            console.log("Local screen playing");
        });

        world.localVideoStream = mediaStream;
    }).catch(err => {
        console.error("Error:" + err);
        return null;
    });
}
