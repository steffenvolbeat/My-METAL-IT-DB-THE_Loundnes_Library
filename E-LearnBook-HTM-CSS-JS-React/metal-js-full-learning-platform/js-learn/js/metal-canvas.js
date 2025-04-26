// js/metal-canvas.js
const canvas = document.getElementById("metal-canvas");
const ctx    = canvas.getContext("2d");

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// einfacher 1D-Noise für Drift
let noiseSeed = 0;
function noise() {
  noiseSeed += 0.007;
  return (Math.sin(noiseSeed) + 1) * 0.5;
}

// ─── Fire ────────────────────────────────────────────────────────────────────
class FireParticle {
  constructor() { this.reset(); }
  reset() {
    this.x        = Math.random() * canvas.width;
    this.y        = canvas.height + 20;
    this.size     = Math.random() * 60 + 30;
    this.speed    = Math.random() * 2 + 1.5;
    this.life     = this.size;
    this.gradient = ctx.createRadialGradient(0,0,0,0,0,this.size);
    this.gradient.addColorStop(0,   "rgba(230,200,255,1)");
    this.gradient.addColorStop(0.2, "rgba(180, 50,255,0.8)");
    this.gradient.addColorStop(0.5, "rgba(100,  0,200,0.6)");
    this.gradient.addColorStop(1,   "rgba(30,   0, 50,0)");
  }
  update() {
    this.y    -= this.speed * (0.8 + noise()*0.8);
    this.x    += (noise() - 0.5) * 8;
    this.size -= 0.6;
    this.life -= 1.2;
    if (this.life <= 0 || this.size <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = Math.max(0, this.life / (this.size + 20));
    ctx.filter = "blur(5px)";
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(-this.size*0.2, this.size*1.5);
    ctx.lineTo( this.size*0.2, this.size*1.5);
    ctx.closePath();
    ctx.fillStyle = this.gradient;
    ctx.fill();
    ctx.restore();
  }
}

// ─── Smoke ────────────────────────────────────────────────────────────────────
class SmokeParticle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = canvas.height;
    this.size  = Math.random() * 400 + 200;
    this.speed = Math.random() * 1 + 0.3;
    this.life  = Math.random() * 0.3 + 0.1;
  }
  update() {
    this.y    -= this.speed;
    this.x    += (noise() - 0.5) * 4;
    this.life -= 0.0008;
    if (this.life <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.globalAlpha = this.life;
    ctx.filter = "blur(60px)";
    ctx.fillStyle = "rgba(58,6,125,0.25)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

// ─── Ash Sparks ───────────────────────────────────────────────────────────────
class AshSpark {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height * 0.75; // obere Hälfte
    this.vx    = (Math.random() - 0.5) * 0.5;
    this.vy    = (Math.random() - 0.2) * 0.5;
    this.size  = Math.random() * 4 + 1;
    this.life  = Math.random() * 100 + 40;
  }
  update() {
    this.x    += this.vx;
    this.y    += this.vy;
    this.life -= 1;
    if (this.life <= 0) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = this.life / 60;
    ctx.filter      = "blur(2px)";
    ctx.fillStyle   = "rgba(200,200,200,0.6)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

// ─── Lightning ───────────────────────────────────────────────────────────────
let lightningTimer = 0;
function drawLightning() {
  if (--lightningTimer > 0) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = `rgba(255,255,255,${lightningTimer/5})`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.restore();
  } else if (Math.random() < 0.002) {
    lightningTimer = 5; // Blitzblitz!
  }
}

// ─── Setup ───────────────────────────────────────────────────────────────────
const fires   = Array.from({ length: 180 }, () => new FireParticle());
const smokes  = Array.from({ length:  60 }, () => new SmokeParticle());
const ashes   = Array.from({ length: 100 }, () => new AshSpark());

// ─── Animation Loop ──────────────────────────────────────────────────────────
function animate() {
  // Motion-Blur-Background
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  smokes.forEach(s => { s.update(); s.draw(); });
  fires.forEach(f  => { f.update(); f.draw(); });
  ashes.forEach(a  => { a.update(); a.draw(); });
  drawLightning();

  requestAnimationFrame(animate);
}
animate();
