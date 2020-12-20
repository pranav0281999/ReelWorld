import * as THREE from "./lib/three.module.js";
import {PlayerControls} from "./lib/playerControls.js";
import {CSS2DRenderer, CSS2DObject} from "./lib/CSS2DRenderer.js";
import {ResourceTracker} from "./threejsResourceTracker";
import {PositionalAudioHelper} from "../../../examples/jsm/helpers/PositionalAudioHelper";

class World {
    constructor(sendUserPositionCallback) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new PlayerControls(this.camera, new THREE.Object3D());
        this.labelRenderer = new CSS2DRenderer();
        this.sharedScreenBoards = [];
        this.resourseTracker = new ResourceTracker();
        this.frameTimer = null;
        this.user = new THREE.Group();
        this.userHeadMesh = new THREE.Mesh();
        this.position = new THREE.Vector3();
        this.rotation = new THREE.Quaternion();
        this.sendUserPosition = sendUserPositionCallback;
        this.clients = {};
        this.audioListener = new THREE.AudioListener();
        this.userAudio = null;
    }

    init = () => {
        const canvas = document.getElementById("c");
        this.renderer = new THREE.WebGLRenderer({canvas, logarithmicDepthBuffer: true});

        this.scene = new THREE.Scene();
        this.scene.background = 0x000000;

        //ambient light to reduce computations and keep everything visible
        const ambientLight = this.resourseTracker.track(new THREE.AmbientLight(0xFFFFFF, 1));
        this.scene.add(ambientLight);

        //setting this so that center is known
        const axesHelper = this.resourseTracker.track(new THREE.AxesHelper(5));
        axesHelper.position.y = 1;
        this.scene.add(axesHelper);

        //setting the stage
        let gridHelper = this.resourseTracker.track(new THREE.GridHelper(200, 20));
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
        const userUpperBodyMat = new THREE.MeshNormalMaterial();
        let userUpperBodyMesh = new THREE.Mesh(userUpperBodyGeo, userUpperBodyMat);
        userUpperBodyMesh.position.y = 7.5;

        this.userHeadMesh = userUpperBodyMesh;

        let userBody = new THREE.Object3D();
        userBody.add(userUpperBodyMesh);
        userBody.add(userLowerBodyMesh);
        userBody.add(this.audioListener);

        let userLabelDiv = document.createElement('div');
        userLabelDiv.className = 'label';
        userLabelDiv.textContent = 'You';
        userLabelDiv.style.marginTop = '-2em';
        userLabelDiv.style.color = "white";
        userLabelDiv.style.fontSize = "2em";
        const userLabel = new CSS2DObject(userLabelDiv);
        userLabel.position.set(0, 11, 0);
        userBody.add(userLabel);

        this.user = this.resourseTracker.track(new THREE.Group());
        this.user.add(userBody);
        this.user.add(this.camera);

        this.scene.add(this.user);

        //setting up movement controls
        //I have not used the main camera here as I didn't like the camera movement provided by the library
        this.controls = new PlayerControls(this.camera, this.user);
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

        let planeMesh = this.resourseTracker.track(new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshBasicMaterial({map: videoTexture})
        ));

        this.sharedScreenBoards.push(planeMesh);

        const numberOfScreens = this.sharedScreenBoards.length - 1;

        video.onloadeddata = function () {
            const aspectRatio = video.videoWidth / video.videoHeight;
            planeMesh.scale.set(1, 1 / aspectRatio, 1);

            planeMesh.position.y = 25 / aspectRatio;

            if (numberOfScreens > 1) {
                if (numberOfScreens % 2) {
                    planeMesh.rotation.y = -0 * Math.PI / 180;
                    planeMesh.position.z = -100;
                } else {
                    planeMesh.rotation.y = 90 * Math.PI / 180;
                    planeMesh.position.x = -100;
                }
            } else {
                if (numberOfScreens % 2) {
                    planeMesh.rotation.y = 180 * Math.PI / 180;
                    planeMesh.position.z = 100;
                } else {
                    planeMesh.rotation.y = -90 * Math.PI / 180;
                    planeMesh.position.x = 100;
                }
            }
        };

        this.scene.add(planeMesh);
    }

    addClient = (clientId) => {
        //setting up client
        const clientLowerBodyGeo = new THREE.BoxGeometry(5, 5, 5);
        const clientLowerBodyMat = new THREE.MeshBasicMaterial();
        let clientLowerBodyMesh = new THREE.Mesh(clientLowerBodyGeo, clientLowerBodyMat);
        clientLowerBodyMesh.position.y = 2.5;

        const clientUpperBodyGeo = new THREE.BoxGeometry(5, 5, 5);
        const clientUpperBodyMat = new THREE.MeshNormalMaterial();
        let clientUpperBodyMesh = new THREE.Mesh(clientUpperBodyGeo, clientUpperBodyMat);
        clientUpperBodyMesh.position.y = 7.5;

        let clientBody = new THREE.Object3D();
        clientBody.add(clientUpperBodyMesh);
        clientBody.add(clientLowerBodyMesh);

        let clientLabelDiv = document.createElement('div');
        clientLabelDiv.className = 'label';
        clientLabelDiv.textContent = 'Other';
        clientLabelDiv.style.marginTop = '-2em';
        clientLabelDiv.style.color = "white";
        clientLabelDiv.style.fontSize = "2em";
        const clientLabel = new CSS2DObject(clientLabelDiv);
        clientLabel.position.set(0, 11, 0);
        clientBody.add(clientLabel);

        let client = this.resourseTracker.track(new THREE.Group());
        client.add(clientBody);

        this.clients[clientId] = client;

        this.scene.add(client);
    }

    removeClient = (clientId) => {
        if (this.clients[clientId]) {
            this.scene.remove(this.clients[clientId]);
            delete this.clients[clientId];
        }
    }

    updateClient = (clientId, position, rotation) => {
        if (this.clients[clientId]) {
            this.clients[clientId].position.set(...position);
            this.clients[clientId].quaternion.set(...rotation);
        }
    }

    removeScreenShare = () => {
        let screenBoard = this.sharedScreenBoards.pop();

        if (screenBoard) {
            this.scene.remove(screenBoard);
        }
    }

    addVideoForUser = (video) => {
        const videoTexture = new THREE.VideoTexture(video);
        this.userHeadMesh.material = new THREE.MeshBasicMaterial({map: videoTexture});
    }

    addAudioForUser = (stream) => {
        this.userAudio = new THREE.PositionalAudio(this.audioListener);
        this.userAudio.position.set(0, 0, 0);

        this.userAudio.setMediaStreamSource(stream);
        this.userAudio.setRefDistance(1);
        this.userAudio.setMaxDistance(200);
        this.userAudio.play();

        this.scene.add(this.userAudio);
    }

    removeVideoStreamForUser = () => {
        this.userHeadMesh.material = new THREE.MeshNormalMaterial();
    }

    removeAudioStreamForUser = () => {
        if (this.userAudio) {
            this.scene.remove(this.userAudio);
            this.userAudio = null;
        }
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
        try {
            let distance = this.position.distanceTo(this.user.position);

            if (distance > 1) {
                this.position.copy(this.user.position);
                this.sendUserPosition();
            }

            let rotation = this.user.quaternion.angleTo(this.rotation) * 180 / Math.PI;

            if (rotation > 2) {
                this.rotation.copy(this.user.quaternion)
                this.sendUserPosition();
            }

            if (this.resizeRendererToDisplaySize()) {
                const canvas = this.renderer.domElement;
                this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
                this.camera.updateProjectionMatrix();
            }

            this.controls.update();

            this.renderer.render(this.scene, this.camera);
            this.labelRenderer.render(this.scene, this.camera);

            this.frameTimer = setTimeout(() => {
                requestAnimationFrame(this.render);
            }, 1000 / 30);
        } catch (e) {
            console.error(e);
        }
    }

    endWorld = () => {
        this.removeVideoStreamForUser();
        this.removeAudioStreamForUser();
        this.removeScreenShare();

        Object.keys(this.clients).forEach((key) => {
            this.removeClient(key);
        });

        if (this.frameTimer) {
            clearTimeout(this.frameTimer);
        }

        this.resourseTracker.dispose();
        this.resourseTracker = null;
        // this.scene.dispose();
        this.scene = null;
        this.renderer.dispose();
        this.renderer = null;

        this.camera = null;
        this.controls = null;
        this.labelRenderer = null;
        this.sharedScreenBoards = null;

        this.position = null;
        this.rotation = null;
        this.sendUserPosition = null;
        this.clients = null;
        this.audioListener = null;
        this.userAudio = null;

        document.getElementById("c").remove();
        let newCanvas = document.createElement("canvas");
        newCanvas.id = "c"
        document.body.appendChild(newCanvas);
    }
}

export {World};
