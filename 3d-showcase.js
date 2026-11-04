import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";
import { RoundedBoxGeometry } from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/geometries/RoundedBoxGeometry.js";

const viewer = document.querySelector("#tablet-viewer");

if (viewer) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 1.75)
  );

  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  viewer.appendChild(renderer.domElement);

  // Lighting
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc9c0e8, 2));

  const light = new THREE.DirectionalLight(0xffffff, 2.5);
  light.position.set(3, 4, 5);
  scene.add(light);

  const softLight = new THREE.DirectionalLight(0xded5f8, 1.5);
  softLight.position.set(-4, -2, 3);
  scene.add(softLight);

  // Tablet group
  const tablet = new THREE.Group();
  scene.add(tablet);

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xa8c8f0,
    roughness: 0.35,
    metalness: 0.2
  });

  const body = new THREE.Mesh(
    new RoundedBoxGeometry(3.45, 2.25, 0.18, 6, 0.12),
    bodyMaterial
  );

  tablet.add(body);

  // Screen frame
  const frame = new THREE.Mesh(
    new RoundedBoxGeometry(3.2, 2.0, 0.025, 6, 0.09),
    new THREE.MeshStandardMaterial({
      color: 0x5579ad,
      roughness: 0.4
    })
  );

  frame.position.z = 0.1;
  tablet.add(frame);

  // Screen design
  const screenCanvas = document.createElement("canvas");
  screenCanvas.width = 1024;
  screenCanvas.height = 640;

  const ctx = screenCanvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 1024, 640);
  gradient.addColorStop(0, "#f8faff");
  gradient.addColorStop(0.6, "#eaf2ff");
  gradient.addColorStop(1, "#e6ddfa");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 640);

  ctx.fillStyle = "#8774bd";
  ctx.font = "bold 35px Arial";
  ctx.fillText("nsh.editz", 65, 95);

  ctx.fillStyle = "#27314b";
  ctx.font = "bold 68px Arial";
  ctx.fillText("Make your ideas", 65, 230);
  ctx.fillText("look lovely.", 65, 315);

  ctx.fillStyle = "#78819a";
  ctx.font = "28px Arial";
  ctx.fillText("Your little creative space ♡", 68, 370);

  // Decorative cards
  const cards = [
    { x: 65, color: "#a8c8f0", label: "DIGITAL" },
    { x: 380, color: "#ded5f8", label: "CREATIVE" },
    { x: 695, color: "#d8e8f7", label: "DESIGN" }
  ];

  cards.forEach(card => {
    ctx.fillStyle = card.color;
    ctx.beginPath();
    ctx.roundRect(card.x, 440, 260, 125, 22);
    ctx.fill();

    ctx.fillStyle = "#27314b";
    ctx.font = "bold 25px Arial";
    ctx.fillText(card.label, card.x + 25, 510);
  });

  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(3.08, 1.88),
    new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    })
  );

  screen.position.z = 0.116;
  tablet.add(screen);

  // Front camera
  const cameraDot = new THREE.Mesh(
    new THREE.CircleGeometry(0.035, 32),
    new THREE.MeshBasicMaterial({ color: 0x27314b })
  );

  cameraDot.position.set(0, 1.04, 0.12);
  tablet.add(cameraDot);

  // Initial angle
  tablet.rotation.x = -0.12;
  tablet.rotation.y = -0.28;

  let targetX = tablet.rotation.x;
  let targetY = tablet.rotation.y;

  let dragging = false;
  let previousX = 0;
  let previousY = 0;

  // Drag to rotate
  viewer.addEventListener("pointerdown", event => {
    dragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    viewer.setPointerCapture(event.pointerId);
  });

  viewer.addEventListener("pointermove", event => {
    if (!dragging) return;

    const dx = event.clientX - previousX;
    const dy = event.clientY - previousY;

    targetY += dx * 0.008;
    targetX += dy * 0.008;

    targetX = Math.max(-0.8, Math.min(0.8, targetX));

    previousX = event.clientX;
    previousY = event.clientY;
  });

  function stopDragging() {
    dragging = false;
  }

  viewer.addEventListener("pointerup", stopDragging);
  viewer.addEventListener("pointercancel", stopDragging);
  viewer.addEventListener("lostpointercapture", stopDragging);

  // Reset button
  document.querySelector("#tabletReset")?.addEventListener("click", () => {
    targetX = -0.12;
    targetY = -0.28;
  });

  // Responsive resize
  function resizeViewer() {
    const width = viewer.clientWidth;
    const height = viewer.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  window.addEventListener("resize", resizeViewer);

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    tablet.rotation.x += (targetX - tablet.rotation.x) * 0.12;
    tablet.rotation.y += (targetY - tablet.rotation.y) * 0.12;

    renderer.render(scene, camera);
  }

  animate();
}

// Scroll reveal
const revealElements = document.querySelectorAll(
  ".showcase-3d, .section-heading, .feature-card, .bottom-banner"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => {
    element.classList.add("js-reveal");
    observer.observe(element);
  });
}
