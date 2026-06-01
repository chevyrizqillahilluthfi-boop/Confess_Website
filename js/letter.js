const letterPages = [
  // Halaman 1
  `<p>21/05/26</p>
   <p>Hari di mana kita pertama kali bertemu. Mungkin bagi sebagian orang, itu hanyalah hari biasa. Tidak ada yang terlihat istimewa atau berbeda dari hari-hari lainnya.</p>
   <p>Namun bagiku, hari itu adalah awal dari banyak hal yang tak pernah kuduga sebelumnya. Awal dari rasa nyaman, rasa kagum, dan perasaan yang pada akhirnya membawaku untuk membuat sebuah website ini.</p>
   <p>Sebuah website yang mungkin suatu hari nanti akan menjadi kenangan. Tempat untuk menyimpan cerita kecil tentang bagaimana semuanya bermula, tepat pada hari ketika aku pertama kali mengenalmu.</p>`,

  // Halaman 2
  `<p>Mungkin kamu tidak sadar, kalau ada banyak momen-momen kecil yang sengaja diam-diam kusimpan.</p>
   <p>Mulai dari cara kamu tertawa, cara kamu bercerita, cara kamu bahagia saat sesuatu berjalan sesuai yang kamu harapkan, sampai cara kamu marah ketika ada hal yang membuatmu kesal. Cara kamu selalu berusaha mendukungku, cara kamu memberitahuku banyak hal yang sebelumnya tidak pernah aku tau, bahkan cara kamu mengeluh tentang hari-harimu yang melelahkan.</p>
   <p>Dan yang paling aku suka, cara kamu hadir.</p>
   <p>Entah kenapa, hal-hal yang terlihat sederhana itu justru menjadi hal yang paling sering kuingat. Tanpa kamu minta, tanpa kamu sadari, semuanya perlahan sudah menjadi bagian dari hari-hariku.</p>
   <p>Mungkin karena dari hal-hal kecil itulah, perlahan aku mulai menemukan yang namanya cinta.</p>`,

  // Halaman 3
  `<p>Selama mengenalmu, ada banyak hal yang berubah tanpa kusadari.</p>
   <p>Jujur saja, sebelum mengenalmu, aku pernah berada di titik di mana aku tidak terlalu percaya lagi pada yang namanya cinta. Aku berpikir bahwa mungkin beberapa hal memang lebih baik dibiarkan berjalan apa adanya tanpa perlu melibatkan perasaan yang terlalu dalam.</p>
   <p>Bahkan saat itu aku sempat berjanji pada diriku sendiri untuk tidak lagi berlebihan soal cinta. Tidak lagi menaruh harapan terlalu tinggi, tidak lagi membiarkan perasaan mengambil terlalu banyak ruang dalam hidupku. Aku hanya ingin menjalani hari-hariku dengan tenang, tanpa perlu memikirkan hal-hal yang bisa membuatku kecewa lagi.</p>
   <p>Karena itu, aku tidak pernah benar-benar berniat untuk membuka hati lagi. Aku menikmati hariku seperti biasa, tanpa berharap akan ada seseorang yang mampu mengubah cara pandangku tentang perasaan.</p>`,

  // Halaman 4
  `<p>Namun, semua itu perlahan berubah sejak aku mengenalmu.</p>
   <p>Tanpa kusadari, aku mulai menantikan pesan darimu. Aku mulai memperhatikan hal-hal kecil tentangmu. Bahkan percakapan sederhana yang mungkin terlihat biasa saja, sering kali berhasil membuat hariku terasa lebih baik.</p>
   <p>Perasaan itu tumbuh perlahan. Tidak datang secara tiba-tiba, tidak pula karena paksaan. Ia hadir sedikit demi sedikit, hingga akhirnya aku menyadari bahwa kamu telah menjadi seseorang yang sangat berarti dalam hari-hariku.</p>
   <p>Dan untuk pertama kalinya setelah sekian lama, aku kembali percaya bahwa mungkin cinta itu masih ada. Mungkin, selama ini aku hanya belum bertemu dengan orang yang tepat untuk membuatku mempercayainya lagi.</p>`,

  // Halaman 5
  `<p>Sampai di bagian ini, mungkin kamu sudah tahu alasan kenapa aku membuat semua ini.</p>
   <p>Aku tidak membuat website ini hanya untuk menceritakan apa yang kurasakan. Aku membuatnya karena ada sesuatu yang sudah lama ingin kusampaikan kepadamu, sesuatu yang selama ini kusimpan dalam hati.</p>
   <p>Aku menyayangimu.</p>
   <p>Dan semakin hari, perasaan itu tidak pernah berkurang. Justru semakin membuatku yakin bahwa aku ingin mengenalmu lebih jauh, bukan hanya sebagai seseorang yang hadir dalam hari-hariku, tetapi sebagai seseorang yang ingin berjalan bersamaku.</p>
   <p>Aku tidak akan berjanji bahwa aku adalah orang yang sempurna. Aku punya banyak kekurangan, banyak hal yang masih perlu aku pelajari, dan mungkin akan ada saat-saat di mana aku melakukan kesalahan.</p>
   <p>Tapi jika ada satu hal yang bisa kujanjikan, itu adalah aku akan selalu berusaha semaksimal mungkin.</p>
   <p>Berusaha untuk membuatmu merasa dihargai. Berusaha untuk mendengarkan setiap ceritamu. Berusaha untuk ada ketika kamu membutuhkan seseorang. Dan berusaha menjadi alasan di balik senyumanmu, meskipun hanya sedikit.</p>
   <p>Aku tidak bisa menjanjikan hubungan yang sempurna.</p>
   <p>Namun aku bisa menjanjikan kesungguhan, kejujuran, dan usaha untuk terus memilihmu setiap hari,<br/><em>— seseorang yang peduli padamu ♡</em></p>`,
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
