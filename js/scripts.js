// Nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    if (navMobile.classList.contains('open')) {
      icon.className = 'bi bi-x';
    } else {
      icon.className = 'bi bi-list';
    }
  });
}

// Scroll-triggered reveal
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…';

    const formData = new FormData(contactForm);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        contactForm.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      } else {
        throw new Error(data.message || 'Failed');
      }
    } catch (err) {
      document.getElementById('form-error').style.display = 'block';
      btn.disabled = false;
      btn.innerHTML = 'Send Message &nbsp;<i class="bi bi-send"></i>';
    }
  });
}
