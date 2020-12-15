import * as THREE from "./lib/three.module.js";
import {PlayerControls} from "./lib/playerControls.js";
import {CSS2DRenderer, CSS2DObject} from "./lib/CSS2DRenderer.js";

class World {
    constructor(videoStream) {
        this.localVideoStream = videoStream;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new PlayerControls(this.camera, new THREE.Object3D());
        this.labelRenderer = new CSS2DRenderer();
        this.sharedScreenBoards = [];
    }

    init = () => {
        const canvas = document.getElementById("c");
        this.renderer = new THREE.WebGLRenderer({canvas, logarithmicDepthBuffer: true});

        this.scene = new THREE.Scene();
        this.scene.background = 0x000000;

        //ambient light to reduce computations and keep everything visible
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this.scene.add(ambientLight);

        //setting this so that center is known
        const axesHelper = new THREE.AxesHelper(5);
        axesHelper.position.y = 1;
        this.scene.add(axesHelper);

        //setting the stage
        let gridHelper = new THREE.GridHelper(200, 20);
        this.scene.add(gridHelper);

        //camera to follow user around
        const fov = 90;
        const aspect = window.innerWidth / window.innerHeight;
        const far = 283;
        const near = 1;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, far, near);
        this.camera.position.y = 10;
        this.camera.position.z = 15;
        this.camera.lookAt(0, 0, 0);

        //setting up user
        const userLowerBodyGeo = new THREE.BoxGeometry(5, 5, 5);
        const userLowerBodyMat = new THREE.MeshBasicMaterial();
        let userLowerBodyMesh = new THREE.Mesh(userLowerBodyGeo, userLowerBodyMat);
        userLowerBodyMesh.position.y = 2.5;

        const userUpperBodyGeo = new THREE.BoxGeometry(5, 5, 5);
        const userUpperBodyVideoTexture = new THREE.VideoTexture(this.localVideoStream);
        const userUpperBodyMat = new THREE.MeshBasicMaterial({map: userUpperBodyVideoTexture});
        let userUpperBodyMesh = new THREE.Mesh(userUpperBodyGeo, userUpperBodyMat);
        userUpperBodyMesh.position.y = 7.5;

        let userBody = new THREE.Object3D();
        userBody.add(userUpperBodyMesh);
        userBody.add(userLowerBodyMesh);

        let userLabelDiv = document.createElement('div');
        userLabelDiv.className = 'label';
        userLabelDiv.textContent = 'You';
        userLabelDiv.style.marginTop = '-2em';
        userLabelDiv.style.color = "white";
        userLabelDiv.style.fontSize = "2em";
        const userLabel = new CSS2DObject(userLabelDiv);
        userLabel.position.set(0, 11, 0);
        userBody.add(userLabel);

        let user = new THREE.Group();
        user.add(userBody);
        user.add(this.camera);

        this.scene.add(user);

        //setting up movement controls
        //I have not used the main camera here as I didn't like the camera movement provided by the library
        this.controls = new PlayerControls(this.camera, user);
        this.controls.moveSpeed = 2;
        this.controls.turnSpeed = 0.1;
        this.controls.maxDistanceFromCenter = 100;

        //to show labels
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        document.body.appendChild(this.labelRenderer.domElement);

        requestAnimationFrame(this.render);
    }

    addScreenShare = (video) => {
        //TODO cannot be more than 4
        let videoTexture = new THREE.VideoTexture(video);

        let planeMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshBasicMaterial({map: videoTexture})
        );

        this.sharedScreenBoards.push(planeMesh);

        const numberOfScreens = this.sharedScreenBoards.length - 1;

        video.onloadeddata = function () {
            const aspectRatio = video.videoWidth / video.videoHeight;
            planeMesh.scale.set(1, 1 / aspectRatio, 1);

            planeMesh.position.y = 25 / aspectRatio;

            if (numberOfScreens > 1) {
                if (numberOfScreens % 2) {
                    planeMesh.rotation.y = - 0 * Math.PI / 180;
                    planeMesh.position.z = - 100;
                } else {
                    planeMesh.rotation.y = 90 * Math.PI / 180;
                    planeMesh.position.x = - 100;
                }
            } else {
                if (numberOfScreens % 2) {
                    planeMesh.rotation.y = 180 * Math.PI / 180;
                    planeMesh.position.z = 100;
                } else {
                    planeMesh.rotation.y = - 90 * Math.PI / 180;
                    planeMesh.position.x = 100;
                }
            }
        };

        this.scene.add(planeMesh);
    }

    removeScreenShare = () => {
        this.scene.remove(this.sharedScreenBoards.pop());
    }

    resizeRendererToDisplaySize = () => {
        const canvas = this.renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            this.renderer.setSize(width, height, false);
            this.labelRenderer.setSize(width, height);
        }

        return needResize;
    }

    render = (time) => {
        if (this.resizeRendererToDisplaySize()) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.controls.update();

        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);

        setTimeout(() => {
            requestAnimationFrame(this.render);
        }, 1000 / 30);
    }
}

export {World}