const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const heartColors = [
  'rgba(255,182,209,0.45)',
  'rgba(255,143,175,0.35)',
  'rgba(255,214,231,0.55)',
  'rgba(255,120,160,0.3)',
];

const particles = Array.from({ length: 22 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: 7 + Math.random() * 14,
  speedY: 0.4 + Math.random() * 0.7,
  speedX: (Math.random() - 0.5) * 0.5,
  opacity: 0.3 + Math.random() * 0.4,
  color: heartColors[Math.floor(Math.random() * heartColors.length)],
  wobble: Math.random() * Math.PI * 2,
  wobbleSpeed: 0.01 + Math.random() * 0.02,
  rotation: (Math.random() - 0.5) * 0.4,
}));

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
    if (p.y < -30) {
      particles[i] = {
        ...particles[i],
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        speedY: 0.4 + Math.random() * 0.7,
        opacity: 0.3 + Math.random() * 0.4,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      };
    }
  });
  requestAnimationFrame(animateCanvas);
}

const noBtn = document.getElementById('noBtn');
const noTeaser = document.getElementById('noTeaser');

const noMessages = [
  'yakin nih? 🥺',
  'masa iya no :( ',
  'pikir lagi deh...',
  'jangan gitu doong',
  'aku sedih tau 😢',
  'beneran nih?',
  'nyesel nanti lho 😅',
  'coba klik yang sebelah kiri',
];

let noClickCount = 0;
let isNoFixed = false;

function handleNoHover(event) {
  if (window.innerWidth <= 480) return; 
  escapeNoButton();
}

function handleNoClick(event) {
  event.preventDefault();
  noClickCount++;

  // Tampilkan pesan lucu
  const msg = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];
  noTeaser.textContent = msg;
  noTeaser.style.animation = 'none';
  void noTeaser.offsetWidth; // reflow
  noTeaser.style.animation = 'teaserPop 0.3s ease';

  if (window.innerWidth <= 480) {
    escapeNoButton();
  }
}

function escapeNoButton() {
  const margin = 80;
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const maxX = window.innerWidth - btnW - margin;
  const maxY = window.innerHeight - btnH - margin;

  const newX = margin + Math.random() * maxX;
  const newY = margin + Math.random() * maxY;

  if (!isNoFixed) {
    isNoFixed = true;
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '200';
    noBtn.style.transition = 'left 0.4s cubic-bezier(0.2,0.8,0.3,1), top 0.4s cubic-bezier(0.2,0.8,0.3,1)';
    noBtn.style.margin = '0';
  }

  noBtn.style.left = newX + 'px';
  noBtn.style.top  = newY + 'px';
}

function handleYes() {
  const bgMusic = document.getElementById('bg-music');
  let fade = setInterval(() => {
    if (bgMusic.volume > 0.05) {
      bgMusic.volume -= 0.05;
    } else {
      clearInterval(fade);
      bgMusic.pause();
      bgMusic.currentTime = 0;
      localStorage.removeItem('musicPlaying');
      goToSurprise();
    }
  }, 100);
}

function goToSurprise() {
  const overlay = document.getElementById('pageTransition');
  overlay.classList.add('active');
  setTimeout(() => {
    window.location.href = 'surprise.html';
  }, 520);
}

window.addEventListener('load', () => {
  animateCanvas();
  setTimeout(() => {
    document.getElementById('choiceContainer').classList.add('visible');
  }, 200);
});

window.handleNoHover = handleNoHover;
window.handleNoClick = handleNoClick;
window.handleYes = handleYes;

window.addEventListener('load', () => {
  const isPlaying = localStorage.getItem('musicPlaying');
  if (isPlaying === 'true' && bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {});
  }

});