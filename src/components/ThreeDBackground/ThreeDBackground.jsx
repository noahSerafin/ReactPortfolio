import "./ThreeDBackground.scss";
import {useLocation} from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import React, { useState, useEffect } from "react";
import frags from './frags';
//import dat from "dat.gui";

const ThreeDBackground = () => {
  
  var [currentPage, setCurrentPage] = useState();
  var [index, setIndex] = useState(0);
  console.log('index:', index)
  useLocation();
 
  function init() {
    console.log('init')
    createWorld();
    createPrimitive();
    pageListen();
    createParticles();
    //createGUI();
    //---
    scene.add(plane)
    animation();
  } 

  var Theme = { _darkred: 0x000000 };

  //--------------------------------------------------------------------

  var scene, camera, renderer, container;
  var start = Date.now();
  var _width, _height;
  function createWorld() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    //---
    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog(Theme._darkred, 8, 20);
    scene.background = new THREE.Color(Theme._darkred);
    //---
    camera = new THREE.PerspectiveCamera(55, _width / _height, 1, 1000);
    camera.position.z = 12;
    //---
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(_width, _height);
    //---
    container = document.getElementById("container");
    container.appendChild(renderer.domElement);
    //---
    window.addEventListener("resize", onWindowResize, false);
  }

  function onWindowResize() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    renderer.setSize(_width, _height);
    camera.aspect = _width / _height;
    camera.updateProjectionMatrix();
    console.log("- resize -");
  }

  //--------------------------------------------------------------------
  const vert =`
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;

  attribute vec3 position;

  void main()
  {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`
const frag =`
    precision mediump float;
    
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
  const VS = `
      // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
      // Distributed under the MIT license. See LICENSE file.
      // Distributed under the MIT license. See LICENSE file.
      // https://github.com/ashima/webgl-noise
      //

      vec3 mod289(vec3 x)
      {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 mod289(vec4 x)
      {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec4 permute(vec4 x)
      {
        return mod289(((x*34.0)+1.0)*x);
      }

      vec4 taylorInvSqrt(vec4 r)
      {
        return 1.79284291400159 - 0.85373472095314 * r;
      }

      vec3 fade(vec3 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
      }

      // Classic Perlin noise
      float cnoise(vec3 P)
      {
        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }

      // Classic Perlin noise, periodic variant
      float pnoise(vec3 P, vec3 rep)
      {
        vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
        vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 1.5 * n_xyz;
      }

      // Turbulence By Jaume Sanchez => https://codepen.io/spite/

      varying vec2 vUv;
      varying float noise;
      varying float qnoise;
      varying float displacement;

      uniform float time;
      uniform float pointscale;
      uniform float decay;
      uniform float complex;
      uniform float waves;
      uniform float eqcolor;
      uniform bool fragment;

      float turbulence( vec3 p) {
        float t = - 0.1;
        for (float f = 1.0 ; f <= 3.0 ; f++ ){
          float power = pow( 2.0, f );
          t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
        }
        return t;
      }

      void main() {

        vUv = uv;

        noise = (1.0 *  - waves) * turbulence( decay * abs(normal + time));
        qnoise = (2.0 *  - eqcolor) * turbulence( decay * abs(normal + time));
        float b = pnoise( complex * (position) + vec3( 1.0 * time ), vec3( 100.0 ) );

        if (fragment == true) {
          displacement = - sin(noise) + normalize(b * 0.5);
        } else {
          displacement = - sin(noise) + cos(b * 0.5);
        }

        vec3 newPosition = (position) + (normal * displacement);
        gl_Position = (projectionMatrix * modelViewMatrix) * vec4( newPosition, 1.0 );
        gl_PointSize = (pointscale);
        //gl_ClipDistance[0];

      }
    `;

    const FS = `
      varying float qnoise;
  
      uniform float time;
      uniform bool redhell;

      void main() {
        float r, g, b;
      

        if (!redhell == true) {
          r = cos(qnoise + 0.5);
          g = cos(qnoise - 0.5);
          b = 0.0;
        } else {
          r = cos(qnoise + 0.5);
          g = cos(qnoise - 0.5);
          b = abs(qnoise);
        }
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;
    var particlesMesh;
    function createParticles() {
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
      const particlesMaterial = new THREE.PointsMaterial({
          size: 0.005,
         //map: pic,
         //transparent: true,
         //color: 'blue'
       });
      particlesMesh = new THREE.Points(
          particlesGeometry,
          particlesMaterial
      );
      particlesMesh.position.z = 10;
      scene.add(particlesMesh)
    }

  var mat;
  var primitiveElement = function () {
    this.mesh = new THREE.Object3D();
    mat = new THREE.ShaderMaterial({
      wireframe: false,
      //fog: true,
      uniforms: {
        time: {
          type: "f",
          value: 0.0,
        },
        pointscale: {
          type: "f",
          value: 0.0,
        },
        decay: {
          type: "f",
          value: 0.0,
        },
        complex: {
          type: "f",
          value: 0.0,
        },
        waves: {
          type: "f",
          value: 0.0,
        },
        eqcolor: {
          type: "f",
          value: 0.0,
        },
        fragment: {
          type: "i",
          value: true,
        },
        redhell: {
          type: "i",
          value: true,
        },
      },
      vertexShader: VS,
      fragmentShader: FS
    });
    var geo = new THREE.IcosahedronBufferGeometry(3, 7);
    var mesh = new THREE.Mesh(geo, mat);

    //---
    this.mesh.add(mesh);
  };

  var _primitive;
  function createPrimitive() {
    _primitive = new primitiveElement();
    scene.add(_primitive.mesh);
  }

  const geometry = new THREE.PlaneGeometry(500, 500);
  const shader = new THREE.RawShaderMaterial( {

    uniforms: {
      //time: { value: 1.0 },
      //resolution: { value: new THREE.Vector2() }
      /*uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;*/
    },
  
    vertexShader: vert,
    fragmentShader: frags[0]
  
  } );
  const plane =  new THREE.Mesh(geometry, shader);
  /*plane.rotation.x = 45;
  plane.rotation.y = 45;
  plane.position.z = 5;*/
  

  //--------------------------------------------------------------------

  var options = {
    perlin: {
      vel: 0.002,
      speed: 0.0005,
      perlins: 1.0,
      decay: 0.1,
      complex: 0.3,
      waves: 20.0,
      eqcolor: 11.0,
      fragment: true,
      redhell: true,
    },
    spin: {
      sinVel: 0.0,
      ampVel: 80.0,
    },
  };

  useEffect(() => { 
    //page listener 
    window.addEventListener("load", init, false);
      const url = window.location.href;
      const urlEnd = url.substring(url.lastIndexOf('/') + 1);
      setCurrentPage(currentPage = urlEnd)
  });


  /*function createGUI() {
    var gui = new dat.GUI();
    var camGUI = gui.addFolder("Camera");
    //cam.add(, 'speed', 0.0, 30.00).listen();
    camGUI.add(camera.position, "z", 3, 20).name("Zoom").listen();
    camGUI.add(options.perlin, "vel", 0.0, 0.02).name("Velocity").listen();
    //camGUI.open();

    var mathGUI = gui.addFolder("Math Options");
    mathGUI.add(options.spin, "sinVel", 0.0, 0.5).name("Sine").listen();
    mathGUI.add(options.spin, "ampVel", 0.0, 90.0).name("Amplitude").listen();
    //mathGUI.open();

    var perlinGUI = gui.addFolder("Setup Perlin Noise");
    perlinGUI.add(options.perlin, "perlins", 1.0, 5.0).name("Size").step(1);
    perlinGUI.add(options.perlin, "speed", 0.0, 0.0005).name("Speed").listen();
    perlinGUI.add(options.perlin, "decay", 0.0, 1.0).name("Decay").listen();
    perlinGUI.add(options.perlin, "waves", 0.0, 20.0).name("Waves").listen();
    perlinGUI.add(options.perlin, "fragment", true).name("Fragment");
    perlinGUI.add(options.perlin, "complex", 0.1, 1.0).name("Complex").listen();
    perlinGUI.add(options.perlin, "redhell", true).name("Electroflow");
    perlinGUI.add(options.perlin, "eqcolor", 0.0, 15.0).name("Hue").listen();
    perlinGUI.open();
  }*/

  //--------------------------------------------------------------------
  const pageListen = () => {
    if(currentPage === "graphics"){
      scene.remove(_primitive.mesh)
      scene.add(plane)
    } else {
      //scene.add(_primitive.mesh)
    }
  }
  const animateParticles = (event) => {
    mouseY = event.clientY;
    mouseX = event.clientX;
  };
  document.addEventListener("mousemove", animateParticles);
    let mouseX = 0;
    let mouseY = 0
    const clock = new THREE.Clock();
    function animation() {
    requestAnimationFrame(animation);
    const elapsedTime = clock.getElapsedTime();
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008);
    particlesMesh.rotation.x = mouseY * (Math.abs(Math.sin(elapsedTime)) * 0.00008);

    var performance = Date.now() * 0.003;
    
    _primitive.mesh.rotation.y += options.perlin.vel;
    _primitive.mesh.rotation.x =
      (Math.sin(performance * options.spin.sinVel) *
        options.spin.ampVel *
        Math.PI) /
      180;
    //---
    mat.uniforms["time"].value = options.perlin.speed * (Date.now() - start);
    mat.uniforms["pointscale"].value = options.perlin.perlins;
    mat.uniforms["decay"].value = options.perlin.decay;
    mat.uniforms["complex"].value = options.perlin.complex;
    mat.uniforms["waves"].value = options.perlin.waves;
    mat.uniforms["eqcolor"].value = options.perlin.eqcolor;
    mat.uniforms["fragment"].value = options.perlin.fragment;
    mat.uniforms["redhell"].value = options.perlin.redhell;
    //---
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  return (
    <div className="background" id="container">
      <div id="webglCanvas" className="webgl"></div>
    </div>
  );
};

export default ThreeDBackground;
