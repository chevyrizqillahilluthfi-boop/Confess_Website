const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const heartColors = [
  'rgba(255,182,209,0.3)',
  'rgba(255,143,175,0.25)',
  'rgba(255,214,231,0.4)',
];

const particles = Array.from({ length: 15 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: 5 + Math.random() * 10,
  speedY: 0.3 + Math.random() * 0.5,
  speedX: (Math.random() - 0.5) * 0.3,
  opacity: 0.2 + Math.random() * 0.3,
  color: heartColors[Math.floor(Math.random() * heartColors.length)],
  wobble: Math.random() * Math.PI * 2,
  wobbleSpeed: 0.008 + Math.random() * 0.012,
}));

function drawHeart(cx, cy, size, color, alpha) {
  ctx.save();
  ctx.translate(cx, cy);
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
    p.x += Math.sin(p.wobble) * 0.4 + p.speedX;
    drawHeart(p.x, p.y, p.size, p.color, p.opacity);
    if (p.y < -20) {
      particles[i] = {
        ...particles[i],
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: 5 + Math.random() * 10,
        speedY: 0.3 + Math.random() * 0.5,
        opacity: 0.2 + Math.random() * 0.3,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      };
    }
  });
  requestAnimationFrame(animateCanvas);
}

function observeCards() {
  const cards = document.querySelectorAll('.question-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.index || 0) * 120;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

document.getElementById('qnaForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const sendBtn = document.getElementById('sendBtn');
  const sendStatus = document.getElementById('sendStatus');

  const answers = {
    q1: form.q1.value.trim(),
    q2: form.q2.value.trim(),
    q3: form.q3.value.trim(),
    q4: form.q4.value.trim(),
    q5: form.q5.value.trim(),
  };

  sendBtn.disabled = true;
  sendBtn.querySelector('.send-text').textContent = 'Sending...';

  try {
    await sendAnswersEmail(answers);

    sendStatus.style.display = 'block';
    sendStatus.className = 'send-status success';
    sendStatus.textContent = '✓ Terkirim! Makasih udah jawab jujur ya ♡';

    setTimeout(() => {
      goToChoice();
    }, 1800);

  } catch (err) {
    console.error('Email error:', err);

    // Error state
    sendBtn.disabled = false;
    sendBtn.querySelector('.send-text').textContent = 'Send Answer';

    sendStatus.style.display = 'block';
    sendStatus.className = 'send-status error';
    sendStatus.textContent = 'Waduh, gagal terkirim. Coba lagi ya?';

    setTimeout(() => {
      sendStatus.style.display = 'none';
    }, 3000);
  }
});

function goToChoice() {
  const overlay = document.getElementById('pageTransition');
  overlay.classList.add('active');
  setTimeout(() => {
    window.location.href = 'choice.html';
  }, 520);
}

window.addEventListener('load', () => {
  animateCanvas();

  setTimeout(() => {
    document.querySelector('.qna-container').classList.add('visible');
  }, 200);

  setTimeout(observeCards, 400);
});

// ===== MUSIC CONTINUE SYSTEM =====

const bgMusic = document.getElementById('bg-music');

window.addEventListener('load', () => {

  const isPlaying = localStorage.getItem('musicPlaying');

  if (isPlaying === 'true' && bgMusic) {

    bgMusic.volume = 0.5;

    bgMusic.play().catch((err) => {
      console.log('Music resume blocked:', err);
    });

  }

});