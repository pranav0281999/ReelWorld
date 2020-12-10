import {World} from "./world.js";

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', init);

function init() {
    //remove the overlay as no longer needed
    document.getElementById("overlay").remove();

    let localMediaStream = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            aspectRatio: 1
        }
    }).then((mediaStream) => {
        let video = document.createElement( 'video' );
        video.srcObject = mediaStream;
        video.id = "local_video";
        video.play().then(() => {
            console.log("Local video playing");
        });

        new World(video).init();
    });
}
