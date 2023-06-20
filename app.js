import * as THREE from 'https://threejs.org/build/three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

var scene, camera, renderer;

init();
animate();

function init() {
    scene = new THREE.Scene();
	
	// Add ambient light
	var ambientLight = new THREE.AmbientLight(0xcccccc);
	scene.add(ambientLight);

	// Add directional light
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0, 1, 1).normalize();

	scene.add(directionalLight);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('./waitress.gltf', function(gltf) {
        scene.add(gltf.scene);
    }, undefined, function(error) {
        console.error(error);
    });

    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
