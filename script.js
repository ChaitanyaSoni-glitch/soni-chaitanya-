/* ==========================================================================
   Chaitanya Soni - Personal Portfolio Interactive Scripts
   Features:
   - Dynamic HTML5 Particle Canvas (Floating, Connected Nodes)
   - Dynamic Typewriter Effect for Hero
   - IntersectionObserver Scroll Animations
   - Interactive 3D Tilt Effect on Project Cards
   - Dark/Light Theme Switcher with Storage Persistence
   - Mobile Navigation & Smooth Scrollspy
   - Contact Form with Instant Feedback & Mailto
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Dark / Light Theme Toggle
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  // Premium dark theme is default unless user explicitly chose light
  const savedTheme = localStorage.getItem('cs-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('cs-theme', newTheme);
      updateThemeIcon(newTheme);
      if (typeof updateParticleTheme === 'function') {
        updateParticleTheme(newTheme);
      }
    });
  }


  // ==========================================================================
  // 2. Interactive Floating Particles Canvas Background
  // ==========================================================================
  const canvas = document.getElementById('particles-canvas');
  let updateParticleTheme = null;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 26), 55);

    let particleColor = htmlRoot.getAttribute('data-theme') === 'dark' 
      ? 'rgba(56, 189, 248, 0.5)' 
      : 'rgba(37, 99, 235, 0.45)';
    let lineColor = htmlRoot.getAttribute('data-theme') === 'dark' 
      ? 'rgba(56, 189, 248, 0.08)' 
      : 'rgba(37, 99, 235, 0.08)';

    updateParticleTheme = function(theme) {
      if (theme === 'dark') {
        particleColor = 'rgba(56, 189, 248, 0.5)';
        lineColor = 'rgba(56, 189, 248, 0.08)';
      } else {
        particleColor = 'rgba(37, 99, 235, 0.45)';
        lineColor = 'rgba(37, 99, 235, 0.08)';
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;

        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDistance = 120;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - dist / maxDistance;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId;
    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });
  }


  // ==========================================================================
  // 3. Typewriter Effect for Hero Subtitle
  // ==========================================================================
  const typewriterTarget = document.getElementById('typewriter-text');
  if (typewriterTarget) {
    const phrases = [
      'B.Tech IT Undergraduate',
      'AI & Local LLM Explorer (Ollama)',
      'Full Stack Web Builder',
      'Tech Enthusiast & Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseDelay = 1800;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeoutDuration = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        timeoutDuration = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeoutDuration = 400;
      }

      setTimeout(typeLoop, timeoutDuration);
    }

    typeLoop();
  }


  // ==========================================================================
  // 4. Scroll Animations (IntersectionObserver)
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('in-view'));
  }


  // ==========================================================================
  // 5. Interactive 3D Tilt Effect on Project Cards
  // ==========================================================================
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });


  // ==========================================================================
  // 6. Mobile Menu Toggle & Navbar Scroll Shadow
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navbar = document.querySelector('.navbar');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // Active Nav Link on Scroll (Scrollspy) & Navbar Glass Tint
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;

    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (backToTopBtn) {
      if (scrollPos > 320) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ==========================================================================
  // 7. Contact Form Handler (Direct Mailto with Instant Feedback)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.style.color = '#ef4444';
          formStatus.textContent = 'Please fill out all required fields.';
        }
        return;
      }

      const mailtoUrl = `mailto:sonichaitanya45@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.style.color = '#10b981';
        formStatus.textContent = 'Opening your email client to send your message...';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
    });
  }

});
