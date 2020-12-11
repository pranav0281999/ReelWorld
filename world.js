import * as THREE from "./lib/three.module.js";
import {PlayerControls} from "./lib/playerControls.js";
import {CSS2DRenderer, CSS2DObject} from "./lib/CSS2DRenderer.js";

class World {
    constructor(videoStream) {
        this.localVideoStream = videoStream;
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
        const far = 283;
        const near = 1;
        let camera = new THREE.PerspectiveCamera(fov, aspect, far, near);
        camera.position.y = 10;
        camera.position.z = 15;
        camera.lookAt(0, 0, 0);

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

        let userLabelDiv = document.createElement( 'div' );
        userLabelDiv.className = 'label';
        userLabelDiv.textContent = 'You';
        userLabelDiv.style.marginTop = '-2em';
        userLabelDiv.style.color = "white";
        userLabelDiv.style.fontSize = "2em";
        const userLabel = new CSS2DObject( userLabelDiv );
        userLabel.position.set( 0, 11, 0 );
        userBody.add( userLabel );

        let user = new THREE.Group();
        user.add(userBody);
        user.add(camera);

        scene.add(user);

        //setting up movement controls
        //I have not used the main camera here as I didn't like the camera movement provided by the library
        let controls = new PlayerControls(camera, user);
        controls.moveSpeed = 2;
        controls.turnSpeed = 0.1;
        controls.maxDistanceFromCenter = 100;

        //to show labels
        let labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize( window.innerWidth, window.innerHeight );
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        document.body.appendChild( labelRenderer.domElement );

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const pixelRatio = window.devicePixelRatio;
            const width = canvas.clientWidth * pixelRatio | 0;
            const height = canvas.clientHeight * pixelRatio | 0;
            const needResize = canvas.width !== width || canvas.height !== height;

            if (needResize) {
                renderer.setSize(width, height, false);
                labelRenderer.setSize( width, height );
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
            labelRenderer.render( scene, camera );

            setTimeout(function () {
                requestAnimationFrame(render);
            }, 1000 / 30);
        }

        requestAnimationFrame(render);
    }
}

export {World}
