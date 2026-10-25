// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      history.pushState(null, '', targetId);
    }
  });
});

// Background
const heroBg = document.getElementById('heroBg');
const header = document.querySelector('.header');

if (heroBg && header) {
  // Set background image (using one of the project images)
  heroBg.style.setProperty('--bg-image', 'url("/assets/Background.gif")');

  header.addEventListener('mousemove', (e) => {
    const rect = header.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroBg.style.setProperty('--mouse-x', `${x}px`);
    heroBg.style.setProperty('--mouse-y', `${y}px`);
  });

  // Reset position when mouse leaves
  header.addEventListener('mouseleave', () => {
    heroBg.style.setProperty('--mouse-x', '50%');
    heroBg.style.setProperty('--mouse-y', '50%');
  });
}

// Nav hide/show on scroll
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;
let ticking = false;

function updateNav() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down - hide nav
    nav.classList.add('nav--hidden');
    nav.classList.remove('nav--visible');
  } else {
    // Scrolling up - show nav
    nav.classList.add('nav--visible');
    nav.classList.remove('nav--hidden');
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNav);
    ticking = true;
  }
}, { passive: true });

// Ensure nav is visible at top of page
window.addEventListener('load', () => {
  if (window.scrollY <= 100) {
    nav.classList.add('nav--visible');
    nav.classList.remove('nav--hidden');
  }
});

// Scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements with animation
document.querySelectorAll('.section-title, .about-text, .skills, .project-card, .contact-form').forEach(el => {
  observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        submitBtn.textContent = 'Sent!';
        submitBtn.style.backgroundColor = 'var(--color-success)';
        contactForm.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      submitBtn.textContent = 'Error, please try again';
      submitBtn.style.backgroundColor = 'var(--color-error)';
    } finally {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
      }, 3000);
    }
  });
}

// Highlight active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
});

sections.forEach(section => navObserver.observe(section));

// Current year in footer
const yearEl = document.querySelector('.footer p');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace('2025', new Date().getFullYear());
}

console.log('Portfolio loaded');