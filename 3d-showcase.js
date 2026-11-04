
// =================================
// NSH.EDITZ — CSS 3D FLOATING LAPTOP
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

    <div class="laptop-stage">

      <div class="laptop-model">

        <div class="laptop-display">
          <div class="laptop-camera"></div>

          <div class="tablet-screen">
            <div class="mood-header">
              <span class="mood-logo">nsh.editz <span>♡</span></span>
              <span class="mood-menu">✦ &nbsp; EXPLORE</span>
            </div>

            <div class="mood-intro">
              <div>
                <span class="mood-caption">A LITTLE CREATIVE SPACE</span>
                <h3>Little things, <span>lovely ideas.</span></h3>
              </div>
              <span class="mood-number">01 / 04</span>
            </div>

            <div class="moodboard-grid">

              <div class="mood-card mood-feature">
                <div class="mood-art art-one">
                  <span class="art-flower">✿</span>
                  <span class="art-word">CREATE<br>YOUR<br>MAGIC</span>
                </div>
                <span class="mood-tag">CREATIVE MOOD</span>
              </div>

              <div class="mood-card">
                <div class="mood-art art-two">
                  <span class="art-circle"></span>
                  <span class="art-small">soft<br>moments</span>
                </div>
                <span class="mood-tag">AESTHETIC</span>
              </div>

              <div class="mood-card">
                <div class="mood-art art-three">
                  <span class="art-star">✧</span>
                  <span class="art-word-small">Dream<br>in color.</span>
                </div>
                <span class="mood-tag">DESIGN</span>
              </div>

              <div class="mood-card">
                <div class="mood-art art-four">
                  <span class="art-flower">✿</span>
                  <span class="art-small">Lovely<br>details</span>
                </div>
                <span class="mood-tag">TEMPLATES</span>
              </div>

              <div class="mood-card">
                <div class="mood-art art-five">
                  <span class="art-star">✦</span>
                  <span class="art-word-small">made<br>with love</span>
                </div>
                <span class="mood-tag">DIGITAL ART</span>
              </div>

            </div>
          </div>
        </div>

        <div class="laptop-hinge"></div>

        <div class="laptop-base">
          <div class="laptop-keyboard"></div>
          <div class="laptop-trackpad"></div>
        </div>

      </div>

      <div class="laptop-shadow"></div>
    </div>

    <div class="tiny-star star-one">✧</div>
    <div class="tiny-star star-two">✦</div>
    <div class="tiny-star star-three">✧</div>

  </div>
  `;

  const laptop = viewer.querySelector(".laptop-model");

  let rotationX = -12;
  let rotationY = -22;
  let startX = 0;
  let startY = 0;
  let dragging = false;

  function updateLaptop() {
    laptop.style.transform =
      `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }

  updateLaptop();

  viewer.addEventListener("pointerdown", event => {
    if (event.target.closest("#tabletReset")) return;

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

    if (event.pointerType !== "touch") {
      rotationX -= dy * 0.35;
    }

    rotationX = Math.max(-35, Math.min(35, rotationX));

    startX = event.clientX;
    startY = event.clientY;

    updateLaptop();
  });

  function stopDragging() {
    dragging = false;
  }

  viewer.addEventListener("pointerup", stopDragging);
  viewer.addEventListener("pointercancel", stopDragging);
  viewer.addEventListener("lostpointercapture", stopDragging);

  const resetButton = document.querySelector("#tabletReset");

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      rotationX = -12;
      rotationY = -22;
      updateLaptop();
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
