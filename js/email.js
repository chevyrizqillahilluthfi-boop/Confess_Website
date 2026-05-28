const EMAILJS_SERVICE_ID  = 'service_8qmt95e';   
const EMAILJS_TEMPLATE_ID = 'template_qwpa0xv';  
const EMAILJS_PUBLIC_KEY  = 'JfL-OLLS3XXx7ufv2';   
// ==========================================

function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
}

/**
 * Kirim jawaban QnA ke email
 * @param {Object} answers - 
 * @returns {Promise}
 */
async function sendAnswersEmail(answers) {
  if (
    EMAILJS_SERVICE_ID === 'YOUR_SERVICES_ID' ||
    EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
    EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
  ) {
    console.warn('[email.js] EmailJS belum dikonfigurasi. Simulasi berhasil.');
    return Promise.resolve({ status: 200, text: 'OK (simulated)' });
  }

  if (typeof emailjs === 'undefined') {
    return Promise.reject(new Error('EmailJS SDK tidak termuat.'));
  }

  const templateParams = {
    name: answers.name || '-',
    answer1: answers.q1 || '-',
    answer2: answers.q2 || '-',
    answer3: answers.q3 || '-',
    answer4: answers.q4 || '-',
    answer5: answers.q5 || '-',
    sent_at: new Date().toLocaleString('id-ID', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long',
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }),
  };

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}

// Auto-init
initEmailJS();
