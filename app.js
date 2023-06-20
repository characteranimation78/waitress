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

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // This will make the output better on high-resolution screens
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('./waitress.gltf', function(gltf) {
        character = gltf.scene;

        // Calculate the bounding box of the whole model
        const box = new THREE.Box3().setFromObject(character);

        // Get the center of the bounding box
        const center = box.getCenter(new THREE.Vector3());

        // Move the whole model so that its center is at the origin
        character.position.sub(center);

        scene.add(character);
        camera.lookAt(0, 0, 0); // Make sure the camera is pointing at the center of the scene

        // Get color picker elements
        const hairColorPicker = document.getElementById('hairColorPicker');
        const skinColorPicker = document.getElementById('skinColorPicker');

        // Add event listeners to color pickers
        hairColorPicker.addEventListener('input', function() {
            setColor(character, 'Hair', hairColorPicker.value);
            setColor(character, 'Hair2', hairColorPicker.value);
        });
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

// Function to change color of a named object in the model
function setColor(obj, name, color) {
    obj.traverse(function(child) {
        if (child.name === name) {
            child.material.color = new THREE.Color(color);
        }
    });
}
