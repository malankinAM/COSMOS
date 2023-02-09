import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; //orbit controls a three js addons module for controlling
import WebGL from 'capabilities'; //check capabilites of broser by checking support form WebGL

(() => {
  console.log('javascript is running...');

  //we will create a scene first in which we will add shapes later
  const scene = new THREE.Scene();

  //set camera
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  //load all textures by loading different images
  const t1 = new THREE.TextureLoader().load('textures/square_texture_1.jpg');
  const t2 = new THREE.TextureLoader().load('textures/pb-abs-1.jpg');
  const t3 = new THREE.TextureLoader().load('textures/capsule.jpg');

  //textures array created
  const textures = [t1, t2, t3];

  // set texture wrap and repeat for all texutures in textures array.
  textures.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  });

  // this is the main thing a renderer which is use for rendering our objects or simply a <canvas></canvas>
  const renderer = new THREE.WebGLRenderer({ alpha: true }); //if alpha is true then the background will be transparent
  renderer.setSize(window.innerWidth, window.innerHeight); //set renderer size
  const container = document.getElementById('threejs'); //this is our container in which our object animates
  container.appendChild(renderer.domElement); //now append to canvas to threejs container

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(1000, 1000, 1000);

  // geometries
  const g1 = new THREE.BoxGeometry(1000, 1000, 1000);
  const g2 = new THREE.SphereGeometry(700, 700, 700);
  const g3 = new THREE.CapsuleGeometry(300, 1000, 40, 80);
  const g4 = new THREE.ConeGeometry(400, 2000, 40, 80);
  const g5 = new THREE.TorusKnotGeometry(560, 50, 1000, 400, 15, 14);

  //materials
  const m1 = new THREE.MeshBasicMaterial({
    color: 'white',
    map: t1,
  });
  const m2 = new THREE.MeshBasicMaterial({
    color: 'white',
    map: t2,
  });
  const m3 = new THREE.MeshBasicMaterial({
    color: 'white',
    map: t3,
  });

  // shapes
  const s1 = new THREE.Mesh(g1, m1); //creates square
  const s2 = new THREE.Mesh(g2, m2); //creates sphere
  const s3 = new THREE.Mesh(g3, m3); //creates capsule
  const s4 = new THREE.Mesh(g4, m1); //creates cone
  const s5 = new THREE.Mesh(g5, m2); //creates torus

  const shapesArr = [s1, s2, s3, s4, s5];

  const btnEl = document.querySelectorAll('.shape-btn');

  //add shapes to scene
  for (let i = 0; i < btnEl.length; i++) {
    scene.add(s1); //create box
    btnEl[i].addEventListener('click', () => {
      //create on demand shapes
      console.log('clicked', btnEl[i]);
      shapesArr.forEach((shape) => scene.remove(shape));
      scene.add(shapesArr[i]);
    });
  }

  controls.update();

  const shape_updater = (shape) => {
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.005;
    shape.rotation.z += 0.003;
  };

  const animate = () => {
    requestAnimationFrame(animate);
    shapesArr.forEach((shape) => {
      shape_updater(shape);
    });
    controls.update();
    renderer.render(scene, camera);
  };

  //   check WebGL support by browsers
  if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
  } else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('threejs').appendChild(warning);
  }

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  addEventListener('resize', onWindowResize);

  const vidBtn = document.querySelector('.vid-btn');

  const toggleVideo = () => {
    const vid = document.querySelector('video');
    if (vid.classList.contains('disable')) {
      vid.removeAttribute('class', 'disable');
      vidBtn.innerHTML = 'Disable Background';
    } else {
      vid.setAttribute('class', 'disable');
      vidBtn.innerHTML = 'Enable Background';
    }
  };

  vidBtn.addEventListener('click', toggleVideo);
})();
