// =================================
// NSH.EDITZ — CSS 3D TABLET
// No Three.js / No WebGL required
// =================================

const viewer = document.querySelector("#tablet-viewer");

if (viewer) {
  viewer.innerHTML = `
  <div class="dream-scene">

    <div class="dream-glow glow-one"></div>
    <div class="dream-glow glow-two"></div>

    <div class="orbit orbit-one"></div>
    <div class="orbit orbit-two"></div>

    <div class="float-card float-left">
      <span>✦ CREATIVE</span>
      <strong>Make it lovely.</strong>
    </div>

    <div class="float-card float-right">
      <span>♡ DIGITAL STUDIO</span>
      <strong>Design your world.</strong>
    </div>

    <div class="tablet-stage">
      <div class="tablet-shell">

        <div class="tablet-camera"></div>
        <div class="tablet-button"></div>

        <div class="tablet-screen">

          <div class="screen-top">
            <span>nsh.editz ♡</span>
            <span>✦ 01</span>
          </div>

          <div class="screen-main">
            <span class="screen-label">WELCOME TO OUR STUDIO</span>
            <h3>Make your ideas<br>
              <span>look lovely.</span>
            </h3>
            <p>A little space for your creativity.</p>
          </div>

          <div class="screen-bottom">
            <div class="screen-tile tile-one">
              <span>01</span>
              <strong>Digital</strong>
            </div>
            <div class="screen-tile tile-two">
              <span>02</span>
              <strong>Creative</strong>
            </div>
            <div class="screen-tile tile-three">
              <span>03</span>
              <strong>Design</strong>
            </div>
          </div>

        </div>
      </div>

      <div class="tablet-shadow"></div>
    </div>

    <div class="tiny-star star-one">✧</div>
    <div class="tiny-star star-two">✦</div>
    <div class="tiny-star star-three">✧</div>

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
