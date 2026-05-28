const canvas = document.getElementById('celebration-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
});

function drawHeart(cx, cy, size, color, alpha, rot) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  const s = size * 0.5;
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(s, -s * 0.8, s * 2, s * 0.5, 0, s * 1.8);
  ctx.bezierCurveTo(-s * 2, s * 0.5, -s, -s * 0.8, 0, s * 0.3);
  ctx.fill();
  ctx.restore();
}

const floatColors = [
  '#ffb3d1', '#ff88b8', '#ffd6e7', '#e8789a',
  '#ffcce0', '#ff6aa0', '#ffe4f0', '#c4767a',
];

const floaters = Array.from({ length: 40 }, () => createFloater(true));

function createFloater(randomY = false) {
  return {
    x: Math.random() * window.innerWidth,
    y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 20,
    size: 8 + Math.random() * 18,
    speedY: 0.6 + Math.random() * 1,
    speedX: (Math.random() - 0.5) * 0.8,
    opacity: 0.4 + Math.random() * 0.5,
    color: floatColors[Math.floor(Math.random() * floatColors.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.01 + Math.random() * 0.025,
    rotation: (Math.random() - 0.5) * 0.6,
    rotSpeed: (Math.random() - 0.5) * 0.04,
  };
}

function updateFloaters() {
  floaters.forEach((p, i) => {
    p.wobble += p.wobbleSpeed;
    p.y -= p.speedY;
    p.x += Math.sin(p.wobble) * 0.8 + p.speedX;
    p.rotation += p.rotSpeed;
    drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
    if (p.y < -30) {
      floaters[i] = createFloater(false);
    }
  });
}

let bursts = [];

function createBurst(x, y) {
  const count = 14 + Math.floor(Math.random() * 10);
  const color = floatColors[Math.floor(Math.random() * floatColors.length)];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
    const speed = 2.5 + Math.random() * 4;
    bursts.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 8,
      color,
      opacity: 0.9,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      gravity: 0.08 + Math.random() * 0.06,
      life: 1,
      decay: 0.012 + Math.random() * 0.012,
    });
  }
}

function updateBursts() {
  bursts = bursts.filter(p => p.life > 0);
  bursts.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.97;
    p.rotation += p.rotSpeed;
    p.life -= p.decay;
    p.opacity = Math.max(0, p.life);
    drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
  });
}

function scheduleBursts() {
  const burst = () => {
    // 1–2 burst sekaligus
    const n = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) {
      const x = 80 + Math.random() * (canvas.width - 160);
      const y = 80 + Math.random() * (canvas.height * 0.7);
      createBurst(x, y);
    }
  };

  setTimeout(() => burst(), 100);
  setTimeout(() => burst(), 400);
  setTimeout(() => burst(), 750);

  function loopBurst() {
    burst();
    const next = 600 + Math.random() * 600;
    setTimeout(loopBurst, next);
  }
  setTimeout(loopBurst, 1200);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateFloaters();
  updateBursts();
  requestAnimationFrame(animate);
}

function initMusic() {
  const music = document.getElementById('celebration-music');
  if (!music || !music.src || music.src === window.location.href) return;
  music.volume = 0.35;
  music.play().catch(() => {
    // Autoplay blocked — ok
  });
}

window.addEventListener('load', () => {
  animate();
  scheduleBursts();
  initMusic();

  setTimeout(() => {
    document.getElementById('surpriseContainer').classList.add('visible');
  }, 150);
});
