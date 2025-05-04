// js/metal-canvas.js
const canvas = document.getElementById("metal-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// 1D-Noise
let seed = 0;
function noise() {
  seed += 0.01;
  return (Math.sin(seed) + 1) / 2;
}

// Fire-Particle
class FireParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 50 + 20;
    this.speed = Math.random() * 2 + 1;
    this.life = this.size;
    this.gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
    this.gradient.addColorStop(0, "rgba(255,255,200,1)");
    this.gradient.addColorStop(0.3, "rgba(255,100,0,0.8)");
    this.gradient.addColorStop(1, "rgba(50,0,0,0)");
  }
  update() {
    this.y -= this.speed * (0.5 + noise() * 0.5);
    this.x += (noise() - 0.5) * 4;
    this.life -= 1;
    if (this.life <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = Math.max(0, this.life / this.size);
    ctx.filter = "blur(4px)";
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-this.size * 0.3, this.size * 1.2);
    ctx.lineTo(this.size * 0.3, this.size * 1.2);
    ctx.closePath();
    ctx.fillStyle = this.gradient;
    ctx.fill();
    ctx.restore();
  }
}

// Smoke-Particle
class SmokeParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.size = Math.random() * 200 + 100;
    this.speed = Math.random() * 0.5 + 0.2;
    this.life = Math.random() * 0.2 + 0.1;
  }
  update() {
    this.y -= this.speed;
    this.x += (noise() - 0.5) * 2;
    this.life -= 0.001;
    if (this.life <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.globalAlpha = this.life;
    ctx.filter = "blur(30px)";
    ctx.fillStyle = "rgba(80,0,80,0.15)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const fires = Array.from({ length: 120 }, () => new FireParticle());
const smokes = Array.from({ length: 40 }, () => new SmokeParticle());

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  smokes.forEach((s) => {
    s.update();
    s.draw();
  });
  fires.forEach((f) => {
    f.update();
    f.draw();
  });
  requestAnimationFrame(animate);
}
animate();
