// ═══════════════════════════════════════
// SIMPLE PORTFOLIO - CLEAN & PROFESSIONAL
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ══ LOADING SCREEN ══
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.style.overflow = 'auto';
      initParticles();
    }, 1200);
  });
  document.body.style.overflow = 'hidden';

  // ══ THEME TOGGLE ══
  const themeBtn = document.getElementById('themeBtn');
  let dark = true;
  themeBtn.addEventListener('click', () => {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeBtn.textContent = dark ? '☀️' : '🌙';
    if (window.pJSDom && window.pJSDom[0]) {
      const color = dark ? '#6c5ce7' : '#6c5ce7';
      window.pJSDom[0].pJS.particles.color.value = color;
      window.pJSDom[0].pJS.particles.line_linked.color = color;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  });

  // ══ PARTICLES JS ══
  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 40, density: { enable: true, value_area: 900 } },
          color: { value: '#6c5ce7' },
          shape: { type: 'circle' },
          opacity: { value: 0.25, random: true },
          size: { value: 2.5, random: true },
          line_linked: {
            enable: true, distance: 140, color: '#6c5ce7', opacity: 0.08, width: 1
          },
          move: { enable: true, speed: 0.8, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' }
          }
        },
        retina_detect: true
      });
    }
  }

  // ══ SCROLL REVEAL ══
  const revEls = document.querySelectorAll('.rev');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revEls.forEach(el => ro.observe(el));

  // ══ SKILL BAR ANIMATION ══
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-fill').forEach(bar => {
          const width = bar.getAttribute('data-w');
          bar.style.transform = `scaleX(${width})`;
          bar.classList.add('animate');
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-card').forEach(s => skillObs.observe(s));

  // ══ COUNTER ANIMATION ══
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 1500;
    const start = performance.now();
    const startVal = 0;

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * easeOut);
      el.textContent = current + (el.parentElement.querySelector('.stat-lbl')?.textContent.includes('Exp') ? '+' : '');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const counters = e.target.querySelectorAll('[data-count]');
        counters.forEach((counter, i) => {
          setTimeout(() => animateCounter(counter), i * 200);
        });
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hero-stats').forEach(el => counterObs.observe(el));

  // ══ ACTIVE NAV & SCROLL EFFECTS ══
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  const nav = document.getElementById('nav');

  function updateNav() {
    const scrollY = window.scrollY;
    let cur = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 200) cur = s.id;
    });
    navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    nav.classList.toggle('scrolled', scrollY > 60);
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // ══ MOBILE MENU ══
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    menuToggle.classList.toggle('toggle-active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      menuToggle.classList.remove('toggle-active');
    });
  });

  // ══ CONTACT FORM ══
  const sendBtn = document.getElementById('sendBtn');
  const charCount = document.querySelector('.char-count');
  const textarea = document.querySelector('textarea[name="message"]');
  const contactForm = document.getElementById('contactForm');

  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = len + '/500';
      charCount.style.color = len > 450 ? 'var(--acc2)' : 'var(--muted)';
      if (len > 500) textarea.value = textarea.value.substring(0, 500);
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', function(e) {
      if (!contactForm) return;
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = 'var(--acc2)';
          setTimeout(() => input.style.borderColor = '', 2000);
        }
      });
      if (valid) {
        this.innerHTML = '<span>✅ Message Sent!</span>';
        this.classList.add('success');
        setTimeout(() => {
          this.innerHTML = '<span>Send Message →</span>';
          this.classList.remove('success');
          if (contactForm) contactForm.reset();
          if (charCount) charCount.textContent = '0/500';
        }, 3000);
      } else {
        this.innerHTML = '<span>❌ Please fill all fields</span>';
        this.classList.add('error');
        setTimeout(() => {
          this.innerHTML = '<span>Send Message →</span>';
          this.classList.remove('error');
        }, 2500);
      }
    });
  }

  // ══ SMOOTH SCROLL ══
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
