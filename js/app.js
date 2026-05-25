/* ===========================
   OUR STORY - Anniversary App
   Password: 8/21
   =========================== */

const CORRECT_PASSWORD = '8/21';

const MONTHS = [
  {
    month: 1,
    image: 'images/month-1.jpg',
    badge: 'Month 1',
    title: 'Our First Month',
    subtitle: 'August 21, 2025',
    message: `Every love story has a beginning, and ours started here.\n\nThis was the month everything changed — the butterflies, the late-night texts, the smiles that wouldn't quit. I didn't know then how special this would become, but I felt it.\n\nThank you for making day one unforgettable. ♥`
  },
  {
    month: 2,
    image: 'images/month-2.jpg',
    badge: 'Month 2',
    title: 'Two Months In',
    subtitle: 'October 21, 2025',
    message: `Two months felt like a lifetime and a moment all at once.\n\nWe were still figuring each other out — your quirks, my habits, the little things that make you, you. And I loved every discovery.\n\nBy now I knew this was something real. ♥`
  },
  {
    month: 4,
    image: 'images/month-4.jpg',
    badge: 'Month 4',
    title: 'Four Months Together',
    subtitle: 'December 21, 2025',
    message: `Four months in and you already felt like home.\n\nWe'd gotten through busy weeks, lazy weekends, and everything in between. The comfort we found in each other — that's rare.\n\nI wouldn't trade a single moment. ♥`
  },
  {
    month: 6,
    image: 'images/month-6.jpg',
    badge: 'Month 6',
    title: 'Six Months Strong',
    subtitle: 'February 21, 2026',
    message: `Half a year. Can you believe it?\n\nSix months of laughing at our own inside jokes, of growing side by side, of choosing each other every single day. That's what love is — a choice made over and over.\n\nI'd choose you a thousand times more. ♥`
  },
  {
    month: 12,
    image: 'images/month-12.jpg',
    badge: '1 Year ♥',
    title: 'One Full Year',
    subtitle: 'August 21, 2026',
    message: `A whole year. 365 days. And somehow it still doesn't feel like enough.\n\nThis year you showed me what it means to be loved — really loved. Through everything we've been through, you've been my constant, my favorite person, my home.\n\nHappy anniversary, baby. Here's to forever. ♥`
  }
];

let currentMonthIndex = 0;

/* ===========================
   NAVIGATION
   =========================== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = document.getElementById(pageId);
  target.classList.remove('hidden');
  // small delay so animation fires correctly
  requestAnimationFrame(() => target.classList.add('active'));
}

/* ===========================
   LOGIN
   =========================== */
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const password = document.getElementById('login-password').value.trim();
  const errorEl = document.getElementById('login-error');

  // Accept "8/21", "8-21", "821", "08/21", "08-21", "0821"
  const normalized = password.replace(/[-\/\s]/g, '');
  const valid = normalized === '821' || normalized === '0821';

  if (valid) {
    errorEl.classList.add('hidden');
    showPage('page-profiles');
  } else {
    errorEl.classList.remove('hidden');
    const passwordInput = document.getElementById('login-password');
    passwordInput.value = '';
    passwordInput.focus();
  }
});

/* ===========================
   PROFILE SELECTION
   =========================== */
document.getElementById('profiles-grid').addEventListener('click', function (e) {
  const card = e.target.closest('.profile-card');
  if (!card) return;

  const month = parseInt(card.dataset.month);
  currentMonthIndex = MONTHS.findIndex(m => m.month === month);
  renderMemoryPage(currentMonthIndex);
  showPage('page-memory');
});

/* ===========================
   MEMORY PAGE
   =========================== */
function renderMemoryPage(index) {
  const data = MONTHS[index];
  currentMonthIndex = index;

  const heroImg = document.getElementById('memory-hero-img');
  heroImg.src = data.image;
  heroImg.alt = data.badge;

  // Show gradient bg if image fails
  heroImg.onerror = function () {
    this.style.display = 'none';
    this.parentElement.style.background = `linear-gradient(135deg, #3a0a0a 0%, #8b1a1a 40%, #3a0a0a 100%)`;
  };
  heroImg.onload = function () {
    this.style.display = 'block';
    this.parentElement.style.background = '';
  };

  document.getElementById('memory-badge').textContent = data.badge;
  document.getElementById('memory-title').textContent = data.title;
  document.getElementById('memory-subtitle').textContent = data.subtitle;
  document.getElementById('memory-message').textContent = data.message;

  document.getElementById('btn-prev-month').disabled = index === 0;
  document.getElementById('btn-next-month').disabled = index === MONTHS.length - 1;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('btn-back').addEventListener('click', () => {
  showPage('page-profiles');
});

document.getElementById('btn-prev-month').addEventListener('click', () => {
  if (currentMonthIndex > 0) renderMemoryPage(currentMonthIndex - 1);
});

document.getElementById('btn-next-month').addEventListener('click', () => {
  if (currentMonthIndex < MONTHS.length - 1) renderMemoryPage(currentMonthIndex + 1);
});
