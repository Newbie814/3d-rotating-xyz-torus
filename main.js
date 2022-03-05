import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from 'three';
import { MathUtils, PointLight } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(9, 4, 16, 200);
const material = new THREE.MeshStandardMaterial({
  color: 0x91e5f6,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

animate();

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffdd99 });
  // const material2 = new THREE.MeshStandardMaterial({ color: 0xa9d3ff });
  // const material3 = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(50));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load(
  'https://res.cloudinary.com/dylvkdabj/image/upload/v1646514283/website%20pics%20family/wp2647127-space-wallpaper-hd_irkddn.jpg'
);
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}
