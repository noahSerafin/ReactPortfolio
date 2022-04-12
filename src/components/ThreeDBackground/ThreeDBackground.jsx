import {useLocation} from "react-router-dom";
import "./ThreeDBackground.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import React, { useState, useEffect } from "react";

const ThreeDBackground = () => {  
  var [currentPage, setCurrentPage] = useState();
  useLocation();
  useEffect(() => { 
    //page listener 
      const url = window.location.href;
      const urlEnd = url.substring(url.lastIndexOf('/') + 1);
      setCurrentPage(currentPage = urlEnd)

    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();

    // Objects
    //const geometry = new THREE.TorusGeometry( .8, .3, 18, 100 );
    const geometry = new THREE.SphereGeometry(1, 60, 60, 1);
    const moonGeometry = new THREE.SphereGeometry(0.1, 24, 24);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 5000;
    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
      //console.log('particles!')
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Texture Loader
    //const loader = new THREE.TextureLoader()
    //const pic = loader.load('./circ.png')

    // Materials
    const shadowMaterial = new THREE.MeshPhongMaterial({
        color: 0x5b5b5b
      //transparent: false
    });

    const  material = new THREE.MeshPhongMaterial({
        color: 0xcfe2f3
    });

    const particlesMaterial = new THREE.PointsMaterial({
       size: 0.005,
      //map: pic,
      //transparent: true,
      //color: 'blue'
    });

    // Mesh
    const sphere = new THREE.Mesh(geometry, shadowMaterial);
    sphere.receiveShadow = true;
    //sphere.castShadow = true;
    const moon = new THREE.Mesh(moonGeometry, material);
    moon.receiveShadow = true;
    moon.castShadow = true;
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    particlesMesh.castShadow = true;
    //sphere.rotation.x = Math.PI / 2
    sphere.position.z = 0.5;
    //sphere.position.y = -0.01;
    if(currentPage !== "contact"){
      scene.add(sphere)
    } else{
      scene.remove(sphere)
    }
    scene.add(particlesMesh, moon);   
    

    // Lights

    //const pointLight = new THREE.PointLight(0xffffff, 0.1);
    //pointLight.position.x = 2;
    //pointLight.position.y = 3;
    //pointLight.position.z = 4;
    //scene.add(pointLight);
    
    //extra Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    //ambientLight.castShadow = true;
    scene.add(ambientLight);
    const spotLight = new THREE.DirectionalLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 0, 5);
    scene.add(spotLight);
    //scene.add( new THREE.CameraHelper(spotLight.shadow.camera));
    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));      
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color("#21282a"), 1);
    renderer.shadowMap.enabled = true;

    //mouse
    const animateParticles = (event) => {
      mouseY = event.clientY;
      mouseX = event.clientX;
    };

    document.addEventListener("mousemove", animateParticles);
    let mouseX = 0;
    let mouseY = 0;

    let mouseDown = false;
    //const sphereMat = new THREE.MeshNormalMaterial({ wireframe: true});

    const catchMouse = () => {
      //sphere.material = sphereMat;
      mouseDown = true;
    };
    const stopMouse = () => {
      //sphere.material = THREE.PointsMaterial
      mouseDown = false;
    };
    document.addEventListener("mousedown", catchMouse);
    document.addEventListener("mouseup", stopMouse);

    /**
     * Animate
     */

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects

      if (mouseDown) {
        sphere.rotation.y = mouseX * (elapsedTime * 0.00008);
        sphere.rotation.x = mouseY * (elapsedTime * 0.00008);
      } else {
        sphere.rotation.y = 0.00008 * elapsedTime;
      }
      particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008);
      particlesMesh.rotation.x = mouseY * (elapsedTime * 0.00008);
      moon.position.x = 1.7 * Math.sin(elapsedTime);
      moon.position.z = 2.2 * Math.cos(elapsedTime);

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }); //, []

  return (
    <div className="background">
      <canvas id="webglCanvas" className="webgl"></canvas>
    </div>
  );
};

export default ThreeDBackground;
