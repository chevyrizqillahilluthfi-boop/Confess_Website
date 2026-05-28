const lines = [
  { el: document.getElementById('line1'), text: 'Hi, aku punya sesuatu untuk kamu...' },
  { el: document.getElementById('line2'), text: 'Please stay for a moment...' },
  { el: document.getElementById('line3'), text: 'Karena ada hal yang sudah lama ingin aku sampaikan.' },
];

let lineIndex = 0;
let charIndex = 0;

function typeChar() {
  if (lineIndex >= lines.length) {
    showButton();
    return;
  }

  const { el, text } = lines[lineIndex];
  el.style.width = 'auto';

  if (charIndex < text.length) {
    el.textContent += text[charIndex];
    charIndex++;
    setTimeout(typeChar, 50);
  } else {
    // Selesai 1 baris
    el.classList.add('typed');
    lineIndex++;
    charIndex = 0;
    setTimeout(typeChar, 500);
  }
}

function showButton() {
  const btn = document.getElementById('openBtn');
  const dateStamp = document.querySelector('.date-stamp');
  btn.classList.add('visible');
  if (dateStamp) dateStamp.classList.add('visible');
}

function goToLetter() {
  const overlay = document.getElementById('pageTransition');
  overlay.classList.add('active');
  setTimeout(() => {
    window.location.href = 'letter.html';
  }, 520);
}

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Warna-warna pastel
const heartColors = [
  'rgba(255,182,209,0.55)',
  'rgba(255,143,175,0.45)',
  'rgba(255,214,231,0.6)',
  'rgba(255,160,196,0.4)',
  'rgba(255,120,160,0.35)',
];

const particles = Array.from({ length: 26 }, () => createParticle(true));

function createParticle(random = false) {
  return {
    x: Math.random() * window.innerWidth,
    y: random ? Math.random() * window.innerHeight : window.innerHeight + 20,
    size: 8 + Math.random() * 16,
    speedY: 0.4 + Math.random() * 0.8,
    speedX: (Math.random() - 0.5) * 0.5,
    opacity: 0.3 + Math.random() * 0.5,
    color: heartColors[Math.floor(Math.random() * heartColors.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.01 + Math.random() * 0.02,
    rotation: (Math.random() - 0.5) * 0.4,
  };
}

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

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.wobble += p.wobbleSpeed;
    p.y -= p.speedY;
    p.x += Math.sin(p.wobble) * 0.6 + p.speedX;

    drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);

    // Reset saat keluar layar
    if (p.y < -40) {
      particles[i] = createParticle(false);
    }
  });

  requestAnimationFrame(animateCanvas);
}

window.addEventListener('load', () => {
  const loading = document.getElementById('loading-overlay');
  const main = document.getElementById('main-content');

  setTimeout(() => {
    loading.classList.add('hidden');
    main.classList.add('visible');
    // Mulai animasi canvas
    animateCanvas();
    // Mulai typing setelah sedikit delay
    setTimeout(typeChar, 600);
  }, 800);
});
