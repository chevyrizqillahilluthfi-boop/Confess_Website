const letterPages = [
  // Halaman 1
  `<p>Halo kamu,</p>
   <p>Aku tidak tahu harus mulai dari mana. Tapi setiap kali aku mencoba tidur dan pikiranku terlalu ramai, namamu selalu yang pertama muncul.</p>
   <p>Bukan karena aku kesepian. Tapi karena kamu terasa seperti tempat yang nyaman untuk pikiran-pikiranku pulang.</p>`,

  // Halaman 2
  `<p>Kamu mungkin tidak sadar, tapi ada momen-momen kecil yang diam-diam aku simpan.</p>
   <p>Cara kamu tertawa. Cara kamu cerita tentang hal-hal yang kamu suka. Cara kamu hadir — bahkan ketika kamu tidak berkata apa-apa pun.</p>
   <p>Hal-hal kecil itu, tanpa kamu minta, sudah jadi bagian dari hari-hariku.</p>`,

  // Halaman 3
  `<p>Aku pernah takut bilang ini.</p>
   <p>Takut salah. Takut berlebihan. Takut kamu lihat aku beda setelahnya.</p>
   <p>Tapi ada satu hal yang lebih aku takutkan: membiarkan waktu terus berjalan dan tidak pernah berani jujur.</p>
   <p>Jadi... ini aku. Dengan perasaan yang sudah terlalu lama aku simpan sendiri.</p>`,

  // Halaman 4
  `<p>Aku tidak bisa berjanji aku sempurna.</p>
   <p>Tapi aku bisa berjanji untuk hadir. Untuk dengerin. Untuk selalu usahakan senyumanmu ada di pagi-pagi kita.</p>
   <p>Kamu layak dapat seseorang yang sadar betapa berartinya kamu. Dan aku mau jadi orang itu — kalau kamu mau.</p>`,

  // Halaman 5
  `<p>Jadi inilah aku, membuka surat yang sudah lama ingin kutulis.</p>
   <p>Kamu tidak harus menjawab sekarang. Kamu tidak harus merasa terburu.</p>
   <p>Tapi kalau hatimu berkata iya — aku di sini. Sudah lama di sini.</p>
   <p>Dengan sepenuh hati,<br/><em>— seseorang yang peduli padamu ♡</em></p>`,
];

let currentPage = 0;
let isOpened = false;
let musicstarted = true;
localStorage.setItem('musicplaying', 'tur');

const letterScene     = document.querySelector('.letter-scene');
const envelope        = document.getElementById('envelope');
const envFlap         = document.getElementById('en vFlap');
const envSeal         = document.getElementById('envSeal');
const clickHint       = document.getElementById('clickHint');
const letterContainer = document.getElementById('letterContainer');
const letterContent   = document.getElementById('letterContent');
const nextBtn         = document.getElementById('nextBtn');
const pageIndicator   = document.getElementById('pageIndicator');
const musicIndicator  = document.getElementById('musicIndicator');
const bgMusic         = document.getElementById('bg-music');

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
  'rgba(255,214,231,0.5)',
  'rgba(255,120,160,0.3)',
];

const particles = Array.from({ length: 20 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: 6 + Math.random() * 12,
  speedY: 0.35 + Math.random() * 0.6,
  speedX: (Math.random() - 0.5) * 0.4,
  opacity: 0.25 + Math.random() * 0.4,
  color: heartColors[Math.floor(Math.random() * heartColors.length)],
  wobble: Math.random() * Math.PI * 2,
  wobbleSpeed: 0.01 + Math.random() * 0.015,
  rotation: (Math.random() - 0.5) * 0.3,
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
    p.x += Math.sin(p.wobble) * 0.5 + p.speedX;
    drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
    if (p.y < -30) {
      particles[i] = {
        ...particles[i],
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 6 + Math.random() * 12,
        speedY: 0.35 + Math.random() * 0.6,
        opacity: 0.25 + Math.random() * 0.4,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      };
    }
  });
  requestAnimationFrame(animateCanvas);
}

envelope.addEventListener('click', () => {
  if (isOpened) return;
  openEnvelope();
});

function openEnvelope() {
  isOpened = true;

  envelope.classList.add('no-click');

  envSeal.style.opacity = '0';
  clickHint.style.opacity = '0';

  setTimeout(() => {
    envFlap.classList.add('opened');
  }, 100);

  setTimeout(() => {
    document.body.classList.add('letter-open');

    letterScene.classList.add('opened');

    letterContainer.style.display = 'block';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        letterContainer.classList.add('animate-in');
        setTimeout(() => {
          letterContainer.classList.add('visible');
          letterContainer.classList.remove('animate-in');
        }, 700);
      });
    });

    showPage(0);

    setTimeout(() => {
      letterContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 900);

  }, 800);

  setTimeout(() => {
    playMusic();
  }, 900);
}

function showPage(index) {
  currentPage = index;
  pageIndicator.textContent = `${index + 1} / ${letterPages.length}`;

  if (index === letterPages.length - 1) {
    nextBtn.textContent = 'End ✦';
  } else {
    nextBtn.textContent = 'next page →';
  }

  letterContent.classList.add('fade-out');
  setTimeout(() => {
    letterContent.innerHTML = letterPages[index];
    letterContent.classList.remove('fade-out');
    letterContent.classList.add('fade-in');
    setTimeout(() => letterContent.classList.remove('fade-in'), 400);
  }, 310);
}

nextBtn.addEventListener('click', () => {
  if (currentPage < letterPages.length - 1) {
    showPage(currentPage + 1);
    // Scroll ke atas kertas saat ganti halaman
    letterContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    goToQna();
  }
});

function goToQna() {
  const overlay = document.getElementById('pageTransition');
  overlay.classList.add('active');
  if (bgMusic && !bgMusic.paused);
  setTimeout(() => {
    window.location.href = 'qna.html';
  }, 520);
}

function playMusic() {
  if (musicStarted) return;
  musicStarted = true;
  if (!bgMusic) return;
  bgMusic.volume = 0.5;
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      let vol = 0;
      const fade = setInterval(() => {
        vol = Math.min(vol + 0.05, 0.4);
        bgMusic.volume = vol;
        if (vol >= 0.4) {
          clearInterval(fade);
        }
      }, 100);
      musicIndicator.style.display = 'flex';
    }).catch((err) => {
      console.log('Music blocked:', err);
    });
  }
}

window.addEventListener('load', () => {
  animateCanvas();
});
