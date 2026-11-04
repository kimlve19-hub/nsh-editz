
// ======================================
// NSH.EDITZ — REALISTIC 3D LAPTOP
// CSS 3D — NO THREE.JS / NO WEBGL
// ======================================

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

          <!-- WIDE LAPTOP SCREEN -->
          <div class="laptop-display">
            <div class="laptop-camera"></div>

            <div class="laptop-screen">

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

          <!-- HINGE -->
          <div class="laptop-hinge"></div>

          <!-- KEYBOARD BASE -->
          <div class="laptop-base">

            <div class="laptop-keyboard">

              <div class="key-row">
                <span>1</span><span>2</span><span>3</span>
                <span>4</span><span>5</span><span>6</span>
                <span>7</span><span>8</span><span>9</span>
                <span>0</span><span>-</span><span>=</span>
              </div>

              <div class="key-row">
                <span>Q</span><span>W</span><span>E</span>
                <span>R</span><span>T</span><span>Y</span>
                <span>U</span><span>I</span><span>O</span>
                <span>P</span>
              </div>

              <div class="key-row">
                <span>A</span><span>S</span><span>D</span>
                <span>F</span><span>G</span><span>H</span>
                <span>J</span><span>K</span><span>L</span>
              </div>

              <div class="key-row">
                <span class="key-wide">⇧</span>
                <span>Z</span><span>X</span><span>C</span>
                <span>V</span><span>B</span><span>N</span>
                <span>M</span>
                <span class="key-wide">↵</span>
              </div>

              <div class="key-row bottom-row">
                <span>Ctrl</span>
                <span>Alt</span>
                <span class="key-space"></span>
                <span>Alt</span>
                <span>Ctrl</span>
              </div>

            </div>

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

// SCROLL REVEAL
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
