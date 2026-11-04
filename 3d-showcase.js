// =================================
// NSH.EDITZ — CSS 3D TABLET
// No Three.js / No WebGL required
// =================================

const viewer = document.querySelector("#tablet-viewer");

if (viewer) {
  viewer.innerHTML = `
    <div class="tablet-stage">
      <div class="tablet-shell">
        <div class="tablet-screen">
          <div class="tablet-brand">nsh.editz ♡</div>

          <div class="tablet-message">
            <h3>
              Make your ideas<br>
              <span>look lovely.</span>
            </h3>
            <p>Your little creative space ♡</p>
          </div>

          <div class="tablet-cards">
            <div class="tablet-card">DIGITAL</div>
            <div class="tablet-card">CREATIVE</div>
            <div class="tablet-card">DESIGN</div>
          </div>
        </div>

        <div class="tablet-camera"></div>
      </div>

      <div class="tablet-shadow"></div>
    </div>
  `;

  const tablet = viewer.querySelector(".tablet-shell");

  let rotationX = -12;
  let rotationY = -22;

  let startX = 0;
  let startY = 0;

  let dragging = false;

  function updateTablet() {
    tablet.style.transform =
      `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }

  updateTablet();

  viewer.addEventListener("pointerdown", event => {
    dragging = true;

    startX = event.clientX;
    startY = event.clientY;

    viewer.setPointerCapture(event.pointerId);
  });

  viewer.addEventListener("pointermove", event => {
    if (!dragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    rotationY += dx * 0.5;

    // Mouse can rotate vertically too.
    if (event.pointerType !== "touch") {
      rotationX -= dy * 0.35;
    }

    rotationX = Math.max(-35, Math.min(35, rotationX));

    startX = event.clientX;
    startY = event.clientY;

    updateTablet();
  });

  function stopDragging() {
    dragging = false;
  }

  viewer.addEventListener("pointerup", stopDragging);
  viewer.addEventListener("pointercancel", stopDragging);
  viewer.addEventListener("lostpointercapture", stopDragging);

  // Reset button
  const resetButton = document.querySelector("#tabletReset");

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      rotationX = -12;
      rotationY = -22;
      updateTablet();
    });
  }
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
