/* ============================================================
   GTEXT — THANK YOU PAGE — SCRIPT
   ============================================================ */

(function () {
  'use strict';

  // ── Set footer year ──────────────────────────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Badge entrance animation ─────────────────────────────────
  const badge = document.getElementById('badge-icon');
  if (badge) {
    badge.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  }

  // ── Intersection Observer: animate elements on scroll ────────
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.cta-card, .stats-row').forEach((el) => {
    observer.observe(el);
  });

  // ── CTA Button: ripple effect ────────────────────────────────
  const ctaBtn = document.getElementById('whatsapp-cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function (e) {
      // Create ripple
      const ripple = document.createElement('span');
      const rect   = ctaBtn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.15);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.5s ease-out forwards;
        pointer-events: none;
      `;

      ctaBtn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 550);
    });

    // Inject ripple keyframes into document
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes rippleAnim {
          to { transform: scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ── Live social proof: rotate random names ───────────────────
  const names = [
    'Chidi', 'Amara', 'Emeka', 'Ngozi', 'Tunde', 'Fatima', 'David',
    'Kemi', 'Bisi', 'Seun', 'Tobi', 'Adaeze', 'Ifeanyi', 'Yemi',
    'Chisom', 'Hassan', 'Nneka', 'Olumide', 'Aisha', 'Gbenga'
  ];

  const actions = [
    'just joined the group',
    'joined from Facebook',
    'is now a member',
    'just connected',
    'joined moments ago',
    'welcomed to the group'
  ];

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Occasionally swap a ticker item text (cosmetic social proof)
  const tickerItems = document.querySelectorAll('.ticker-item');
  if (tickerItems.length > 0) {
    setInterval(() => {
      const half  = Math.floor(tickerItems.length / 2); // only update first half (clones auto update visually)
      const idx   = Math.floor(Math.random() * half);
      const name  = randomFrom(names);
      const action = randomFrom(actions);
      tickerItems[idx].textContent = `✅ ${name} ${action}`;
      // Keep clone in sync
      if (tickerItems[idx + half]) {
        tickerItems[idx + half].textContent = tickerItems[idx].textContent;
      }
    }, 3500);
  }

  // ── Member count pulse ───────────────────────────────────────
  const statMembers = document.getElementById('stat-members');
  if (statMembers) {
    let base = 5000;
    setInterval(() => {
      base += Math.floor(Math.random() * 3);
      statMembers.textContent = base.toLocaleString() + '+';
    }, 8000);
  }

})();
