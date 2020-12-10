import * as THREE from "./lib/three.module.js";
import {PlayerControls} from "./lib/playerControls.js";

class World {
    constructor() {
        console.log("World Created");
    }

    init() {
        const canvas = document.getElementById("c");
        let renderer = new THREE.WebGLRenderer({canvas});

        let scene = new THREE.Scene();
        scene.background = 0x000000;

        //ambient light to reduce computations and keep everything visible
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        scene.add(ambientLight);

        //setting this so that center is known
        const axesHelper = new THREE.AxesHelper(5);
        axesHelper.position.y = 1;
        scene.add(axesHelper);

        //setting the stage
        let gridHelper = new THREE.GridHelper(200, 20);
        scene.add(gridHelper);

        //camera to follow user around
        const fov = 90;
        const aspect = window.innerWidth / window.innerHeight;
        const far = 500;
        const near = 1;
        let camera = new THREE.PerspectiveCamera(fov, aspect, far, near);
        camera.position.y = 2.5;
        camera.position.z = 15;
        camera.lookAt(0, 0, 0);

        //setting up user
        const userBodyGeo = new THREE.BoxGeometry(5, 5, 5);
        const userBodyMat = new THREE.MeshNormalMaterial();
        let userBodyMesh = new THREE.Mesh(userBodyGeo, userBodyMat);
        userBodyMesh.position.y = 2.5;

        let user = new THREE.Group();
        user.add(userBodyMesh);
        user.add(camera);

        scene.add(user);

        //setting up movement controls
        //I have not used the main camera here as I didn't like the camera movement provided by the library
        let controls = new PlayerControls(camera, user);
        controls.moveSpeed = 1;
        controls.turnSpeed = 0.1;
        controls.minDistance = 20;
        controls.maxDistance = 100;

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const pixelRatio = window.devicePixelRatio;
            const width = canvas.clientWidth * pixelRatio | 0;
            const height = canvas.clientHeight * pixelRatio | 0;
            const needResize = canvas.width !== width || canvas.height !== height;

            if (needResize) {
                renderer.setSize(width, height, false);
            }

            return needResize;
        }

        function render(time) {
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            controls.update();

            renderer.render(scene, camera);

            setTimeout(function () {
                requestAnimationFrame(render);
            }, 1000 / 30);
        }

        requestAnimationFrame(render);
    }
}

export {World}
