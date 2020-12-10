import {World} from "./world.js";

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', init);

function init() {
    //remove the overlay as no longer needed
    document.getElementById("overlay").remove();

    new World().init();
}
