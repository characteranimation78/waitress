import * as THREE from 'https://threejs.org/build/three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

var scene, camera, renderer, character;

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
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // This will make the output better on high-resolution screens
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('./waitress.gltf', function(gltf) {
        character = gltf.scene;
        character.traverse(function(node) {
            if (node.isMesh) {
                node.geometry.center(); // Center the character
            }
        });
        scene.add(character);

        camera.lookAt(character.position); // Make sure the camera is pointing at the character
    }, undefined, function(error) {
        console.error(error);
    });

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

// Change hair color function (replace 'hairMaterialName' with the correct material name for the hair)
function changeHairColor(color) {
    character.traverse(function(node) {
        if (node.isMesh && node.material.name === 'hair') {
            node.material.color.set(color);
        }
    });
}

changeHairColor('red');
