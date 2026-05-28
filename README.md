# 💌 Interactive Love Letter Website
### A romantic confession website — built with vanilla HTML, CSS, and JavaScript

---

## 📁 Project Structure

```
/project
├── index.html          ← Halaman 1: Opening / Intro
├── letter.html         ← Halaman 2: Amplop & Surat Cinta
├── qna.html            ← Halaman 3: Pertanyaan Romantis
├── choice.html         ← Halaman 4: YES / NO
├── surprise.html       ← Halaman 5: Celebration!
│
├── /css
│     ├── index.css
│     ├── letter.css
│     ├── qna.css
│     ├── choice.css
│     └── surprise.css
│
├── /js
│     ├── index.js      ← Typing animation & floating hearts
│     ├── letter.js     ← Envelope animation & letter pages
│     ├── qna.js        ← Form & scroll animations
│     ├── choice.js     ← YES/NO behavior (tombol NO menghindar!)
│     ├── surprise.js   ← Heart fireworks & confetti
│     └── email.js      ← EmailJS handler
│
└── /assets
      ├── /music        ← Taruh file MP3 di sini
      ├── /images
      └── /icons
```

---

## ✏️ Cara Edit Isi Surat

Buka file `js/letter.js` dan edit array `letterPages`:

```js
const letterPages = [
  // Halaman 1
  `<p>Halo kamu,</p>
   <p>Tulis surat kamu di sini...</p>`,

  // Halaman 2
  `<p>Lanjutan surat...</p>`,

  // ... dst
];
```

Setiap item dalam array = 1 halaman surat. Gunakan tag `<p>` untuk paragraf.

---

## 📧 Setup EmailJS (untuk kirim jawaban ke Gmail)

1. Daftar gratis di [emailjs.com](https://www.emailjs.com)
2. Buat **Email Service** → pilih Gmail → connect akun kamu
3. Buat **Email Template** dengan variabel:
   - `{{q1}}` `{{q2}}` `{{q3}}` `{{q4}}` `{{q5}}`
   - `{{sent_at}}`
4. Salin `Service ID`, `Template ID`, dan `Public Key`
5. Edit file `js/email.js`:

```js
const EMAILJS_SERVICE_ID  = 'service_abc123';   // ← ganti ini
const EMAILJS_TEMPLATE_ID = 'template_xyz789';  // ← ganti ini
const EMAILJS_PUBLIC_KEY  = 'AbCdEfGhIj1234';   // ← ganti ini
```

---

## 🎵 Cara Tambah Musik

1. Taruh file `.mp3` di folder `assets/music/`
2. Di `letter.html`, uncomment dan edit baris ini:
   ```html
   <source src="assets/music/romantic.mp3" type="audio/mpeg" />
   ```
3. Di `surprise.html`, lakukan hal yang sama untuk musik celebration:
   ```html
   <source src="assets/music/celebration.mp3" type="audio/mpeg" />
   ```

> 💡 Gunakan musik instrumental bebas copyright.
> Sumber gratis: [pixabay.com/music](https://pixabay.com/music), [freemusicarchive.org](https://freemusicarchive.org)

---

## 🚀 Deploy ke Vercel / Netlify

### Vercel (recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Di folder project: `vercel`
3. Ikuti instruksinya → done!

### Netlify
1. Buka [netlify.com](https://netlify.com)
2. Drag & drop folder `project` ke dashboard
3. Dapat URL langsung!

---

## 🥚 Easter Eggs Tersembunyi (2 · 6 · 26)
- **2 hati** dekoratif di halaman pembuka
- **6 bunga** di sekitar amplop surat
- **26 partikel** floating hearts di halaman pembuka
- Tanggal **2 · 6 · 26** muncul subtle di halaman pertama dan terakhir

---

## ✨ Features
- 🎭 Typing animation di halaman pembuka
- ✉️ Envelope animation realistis (flap terbuka, kertas keluar)
- 📄 5 halaman surat dengan transisi smooth
- 🎵 Musik otomatis saat surat dibuka
- 💬 Form QnA romantis dengan EmailJS
- 😂 Tombol NO yang menghindar saat didekati
- 🎆 Heart fireworks di halaman akhir
- 📱 Fully responsive & mobile friendly
- 🌸 Floating hearts di semua halaman

---

*Made with love ♡*
