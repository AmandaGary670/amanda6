// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ===== SCROLL REVEAL ANIMATION =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    document.querySelectorAll('.faq-item').forEach(i => {
      if (i !== item) i.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

// ===== CONTACT FORM (FORMSPREE AJAX) =====
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMessage.textContent = "Thank you. Your message has been received — Amanda will personally respond within 1–2 business days.";
        formMessage.className = 'success';
        form.reset();
      } else {
        formMessage.textContent = "Something went wrong. Please try again or email hello@amandagary.com directly.";
        formMessage.className = 'error';
      }
    } catch (error) {
      formMessage.textContent = "Something went wrong. Please try again or email hello@amandagary.com directly.";
      formMessage.className = 'error';
    }

    submitBtn.textContent = 'SEND MESSAGE';
    submitBtn.disabled = false;
  });
}