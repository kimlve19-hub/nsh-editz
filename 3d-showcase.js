import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// 1. Ambil area viewer
const container = document.getElementById("tablet-viewer");

// 2. Membuat scene
const scene = new THREE.Scene();

// 3. Membuat kamera
const camera = new THREE.PerspectiveCamera(
  40,
  container.clientWidth / container.clientHeight,
  0.1,
  100
);

camera.position.set(0, 0, 7);

// 4. Membuat renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(
  container.clientWidth,
  container.clientHeight
);

renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

// 5. Pencahayaan soft
const ambientLight = new THREE.AmbientLight(
  0xffffff,
  2
);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(
  0xffffff,
  3
);
mainLight.position.set(3, 4, 5);
scene.add(mainLight);

// 6. Grup tablet
const tablet = new THREE.Group();
scene.add(tablet);

// Body tablet
const bodyGeometry = new RoundedBoxGeometry(
  3.2, 2.15, 0.16, 6, 0.12
);

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0xc8b8ed,
  roughness: 0.35,
  metalness: 0.15
});

const body = new THREE.Mesh(
  bodyGeometry,
  bodyMaterial
);

tablet.add(body);

// 7. Membuat tampilan layar
const screenCanvas = document.createElement("canvas");
screenCanvas.width = 1024;
screenCanvas.height = 700;

const ctx = screenCanvas.getContext("2d");

// Background layar
ctx.fillStyle = "#f3efff";
ctx.fillRect(0, 0, 1024, 700);

// Judul layar
ctx.fillStyle = "#71618f";
ctx.font = "bold 58px Arial";
ctx.fillText("nsh.editz", 65, 115);

ctx.fillStyle = "#a095bc";
ctx.font = "30px Arial";
ctx.fillText("make your ideas look lovely", 65, 165);

// Kartu preview
const cards = [
  { x: 65, color: "#b9d7f5" },
  { x: 385, color: "#d2c4f0" },
  { x: 705, color: "#f1d9eb" }
];

cards.forEach((card, index) => {
  ctx.fillStyle = card.color;
  ctx.beginPath();
  ctx.roundRect(card.x, 240, 250, 300, 24);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px Arial";
  ctx.fillText(
    "Design 0" + (index + 1),
    card.x + 25,
    430
  );

  ctx.font = "22px Arial";
  ctx.fillText(
    "Digital collection",
    card.x + 25,
    475
  );
});

// Tekstur layar
const screenTexture = new THREE.CanvasTexture(screenCanvas);
screenTexture.colorSpace = THREE.SRGBColorSpace;

const screenMaterial = new THREE.MeshBasicMaterial({
  map: screenTexture
});

const screen = new THREE.Mesh(
  new THREE.PlaneGeometry(2.96, 1.94),
  screenMaterial
);

screen.position.z = 0.086;
tablet.add(screen);

// 8. Kamera kecil di bagian depan
const cameraDot = new THREE.Mesh(
  new THREE.CircleGeometry(0.035, 32),
  new THREE.MeshBasicMaterial({ color: 0x81769b })
);

cameraDot.position.set(0, 0.98, 0.09);
tablet.add(cameraDot);

// 9. Posisi awal tablet
const initialRotation = {
  x: -0.12,
  y: -0.35
};

tablet.rotation.x = initialRotation.x;
tablet.rotation.y = initialRotation.y;

// 10. Kontrol drag
let isDragging = false;
let previousX = 0;
let previousY = 0;

let targetRotationX = initialRotation.x;
let targetRotationY = initialRotation.y;

container.addEventListener("pointerdown", (event) => {
  isDragging = true;

  previousX = event.clientX;
  previousY = event.clientY;

  container.setPointerCapture(event.pointerId);
});

container.addEventListener("pointermove", (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - previousX;
  const deltaY = event.clientY - previousY;

  targetRotationY += deltaX * 0.008;
  targetRotationX += deltaY * 0.008;

  previousX = event.clientX;
  previousY = event.clientY;

  // Membatasi sudut agar tablet tidak terbalik
  targetRotationX = THREE.MathUtils.clamp(
    targetRotationX,
    -1.1,
    1.1
  );
});

function stopDragging() {
  isDragging = false;
}

container.addEventListener("pointerup", stopDragging);
container.addEventListener("pointercancel", stopDragging);

// 11. Tombol reset
document.getElementById("reset-view").addEventListener(
  "click",
  () => {
    targetRotationX = initialRotation.x;
    targetRotationY = initialRotation.y;
  }
);

// 12. Animasi
function animate() {
  requestAnimationFrame(animate);

  // Gerakan halus mengikuti drag
  tablet.rotation.x +=
    (targetRotationX - tablet.rotation.x) * 0.12;

  tablet.rotation.y +=
    (targetRotationY - tablet.rotation.y) * 0.12;

  renderer.render(scene, camera);
}

animate();

// 13. Menyesuaikan ukuran layar
window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
