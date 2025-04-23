const particleCanvas = document.getElementById("particleCanvas");
const pCtx = particleCanvas.getContext("2d");

function resizeParticleCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeParticleCanvas();
window.addEventListener("resize", resizeParticleCanvas);

let particlesArray = [];
const particleColors = ['#9d00ff', '#ffffff', '#888888'];

class Particle {
  constructor() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
    this.alpha = Math.random() * 0.5 + 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.005;
    else this.size = 0;
  }
  draw() {
    pCtx.globalAlpha = this.alpha;
    pCtx.fillStyle = this.color;
    pCtx.beginPath();
    pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.globalAlpha = 1;
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 200; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();