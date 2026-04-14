/* ═══════════════════════════════════════════
   GETBETTER.GAMES — JavaScript
   ═══════════════════════════════════════════ */

// ─── Nav: Scroll-based glass effect ───
const navBar = document.getElementById('nav-bar');
const onScroll = () => {
  navBar.classList.toggle('scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', onScroll, { passive: true });

// ─── Mobile hamburger menu ───
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ─── Intersection Observer: fade-in-up animations ───
const animateTargets = document.querySelectorAll(
  '.approach-card, .service-card, .portfolio-card, .about-text, .about-visual, .contact-form'
);

animateTargets.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animateTargets.forEach(el => observer.observe(el));

// ─── Contact Form: Submission handler ───
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();

  if (!name || !email) {
    shakeElement(submitBtn);
    return;
  }

  // Simulate send (replace with real endpoint)
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'שולח...';

  await new Promise(r => setTimeout(r, 1200));

  submitBtn.querySelector('span').textContent = '✓ נשלח! אחזור אליכם בקרוב';
  submitBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
  contactForm.reset();

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'שלחו לי את האתגר שלכם';
    submitBtn.style.background = '';
  }, 5000);
});

function shakeElement(el) {
  el.style.animation = 'shake 0.4s ease';
  el.addEventListener('animationend', () => {
    el.style.animation = '';
  }, { once: true });
}

// Add shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-5px); }
    80%      { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

// ─── Smooth active nav link tracking ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Add active nav style
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `.nav-links a.active { color: var(--text-primary); position: relative; }
.nav-links a.active::after { content: ''; position: absolute; bottom: -4px; right: 0; left: 0; height: 2px; background: var(--accent-1); border-radius: 1px; }`;
document.head.appendChild(activeNavStyle);

// ─── Hero CTA: subtle parallax on orbs ───
document.addEventListener('mousemove', (e) => {
  const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
  const orbs = document.querySelectorAll('.hero-orb');
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
  });
});
