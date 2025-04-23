document.addEventListener("DOMContentLoaded", () => {
  // ————— Standard‐Initialisierung —————
  const loader = document.getElementById("loader");
  const scrollIndicator = document.getElementById("scroll-indicator");
  const body = document.body;
  const mainContent = document.getElementById("main-content");
  const bgMusic = document.getElementById("bg-music");
  const volumeControl = document.getElementById("volume-control");

  // Musik starten
  bgMusic.volume = 0.5;
  bgMusic.play().catch((e) => console.warn("BG Music Autoplay prevented", e));
  volumeControl.addEventListener("input", () => {
    bgMusic.volume = volumeControl.value;
  });

  // Intro‐Video faden + Loader ausblenden
  setTimeout(() => {
    document.getElementById("metal-intro").classList.add("fade-out");
    setTimeout(() => document.getElementById("metal-intro").remove(), 2000);
  }, 6000);
  setTimeout(() => (loader.style.opacity = 0), 4000);
  setTimeout(() => (loader.style.pointerEvents = "none"), 5000);

  // Portal‐Kreis entfernen
  setTimeout(() => {
    const p = document.getElementById("portal-effect");
    p && p.remove();
  }, 3000);

  // Scroll‐Indikator einblenden **und klickbar machen**
  setTimeout(() => {
    scrollIndicator.classList.add("visible");
    scrollIndicator.style.cursor = "pointer";
    scrollIndicator.addEventListener("click", () => {
      // Scroll freigeben und sanft zum Content scrollen
      body.style.overflow = "auto";
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, 4500);

  // Scroll erlauben + Content einblenden
  setTimeout(() => {
    body.style.overflow = "auto";
    mainContent.style.opacity = 1;
  }, 6000);

  // Klick‐Sound für Buttons & Links
  const clickSound = new Audio("./assets/sounds/click-metal.mp3");
  document.querySelectorAll("button, a").forEach((el) =>
    el.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    })
  );

  // Glitch beim Scroll
  window.addEventListener("scroll", () => {
    document.body.classList.add("glitch");
    clearTimeout(window.__glitchTimeout);
    window.__glitchTimeout = setTimeout(() => {
      document.body.classList.remove("glitch");
    }, 200);
  });

  // Distortion‐Sound ab halber Fensterhöhe
  let distortionPlayed = false;
  window.addEventListener("scroll", () => {
    if (!distortionPlayed && window.scrollY > window.innerHeight / 2) {
      distortionPlayed = true;
      const d = new Audio("./assets/sounds/distortion.mp3");
      d.play();
    }
  });

  // Lightning‐Flash bei Klick
  document.addEventListener("click", () => {
    const bolt = document.createElement("div");
    bolt.className = "lightning";
    document.body.appendChild(bolt);
    setTimeout(() => bolt.remove(), 400);
  });

  // ————— Gate‐Button: Portal + Effekte + Konsole öffnen —————
  const gateButton = document.getElementById("gate-button");
  const gatePortal = document.getElementById("gate-portal");
  const gateSound = new Audio("./assets/sounds/gate-whoosh.mp3");

  gateButton.addEventListener("click", () => {
    // Whoosh-Portal-Effekt
    gatePortal.classList.add("active", "portal-tear");
    gateSound.currentTime = 0;
    gateSound.play();

    // Screech-Sound
    const screech = new Audio("./assets/sounds/screech.mp3");
    screech.volume = 0.5;
    screech.play();

    // "Fenster-Reißt-Auf"-Tear-Effect
    const tear = document.createElement("div");
    tear.className = "tear-effect";
    document.body.appendChild(tear);
    setTimeout(() => tear.remove(), 1500);

    // Dämonenstimme & Filter bleibt unverändert
    const demonVoice = new Audio("./assets/sounds/demon-voice.mp3");
    demonVoice.volume = 0.3;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const src = audioCtx.createMediaElementSource(demonVoice);
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2000;
    src.connect(filter).connect(audioCtx.destination);
    gateButton.addEventListener("mouseenter", () => {
      demonVoice.currentTime = 0;
      demonVoice.play();
    });
    gateButton.addEventListener("mouseleave", () => demonVoice.pause());
    window.addEventListener("scroll", () => {
      filter.frequency.value = Math.max(100, 2000 - window.scrollY * 5);
    });

    // Nach 2 Sekunden: Portal schließen, scrollen & Konsole öffnen
    setTimeout(() => {
      gatePortal.classList.remove("active", "portal-tear");
      body.style.overflow = "auto";
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });

      // Statt window.open():
      window.location.href =
        "/E-LearnBook-HTM-CSS-JS-React/metal-js-full-learning-platform/JS-Learn/Ultimate-JS-Console/ultimate-console.html";
    }, 2000);
  });

  // Hover‐Orb bleibt unverändert
  const orb = document.getElementById("metal-orb");
  let mx = 0,
    my = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  (function animateOrb() {
    orb.style.transform = `translate(${mx - 15}px,${my - 15}px)`;
    requestAnimationFrame(animateOrb);
  })();

  // Shockwave bei Klick bleibt unverändert
  document.addEventListener("click", (e) => {
    const shock = document.createElement("div");
    shock.className = "shockwave";
    shock.style.top = e.clientY + "px";
    shock.style.left = e.clientX + "px";
    document.body.appendChild(shock);
    setTimeout(() => shock.remove(), 600);
  });
});
