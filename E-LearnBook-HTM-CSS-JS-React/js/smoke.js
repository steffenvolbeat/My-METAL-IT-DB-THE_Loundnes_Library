const smokeCanvas = document.getElementById("smokeCanvas");
const sCtx = smokeCanvas.getContext("2d");

function resizeSmokeCanvas() {
  smokeCanvas.width = window.innerWidth;
  smokeCanvas.height = window.innerHeight;
}
resizeSmokeCanvas();
window.addEventListener("resize", resizeSmokeCanvas);

let smokeParticles = [];
let mouseX = window.innerWidth / 2;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});

function createSmokeParticle() {
  const x = mouseX + (Math.random() * 100 - 50);
  const y = smokeCanvas.height + 20;
  const size = Math.random() * 60 + 20;
  const speedY = Math.random() * -0.5 - 0.3;
  const alpha = Math.random() * 0.2 + 0.05;
  return { x, y, size, speedY, alpha };
}

function drawSmokeParticle(p) {
  const gradient = sCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
  gradient.addColorStop(0, `rgba(186,85,211,${p.alpha})`);
  gradient.addColorStop(0.5, `rgba(138,43,226,${p.alpha * 0.6})`);
  gradient.addColorStop(1, `rgba(75,0,130,0)`);
  sCtx.fillStyle = gradient;
  sCtx.beginPath();
  sCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  sCtx.fill();
}

function animateSmoke() {
  sCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
  if (smokeParticles.length < 100) {
    smokeParticles.push(createSmokeParticle());
  }
  smokeParticles.forEach((p, i) => {
    p.y += p.speedY;
    p.alpha -= 0.0005;
    drawSmokeParticle(p);
    if (p.alpha <= 0 || p.y < -p.size) {
      smokeParticles.splice(i, 1);
    }
  });
  requestAnimationFrame(animateSmoke);
}

animateSmoke();