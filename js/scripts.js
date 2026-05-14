// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
}

// Subtle scroll fade-in for cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.proj-card, .proj-full-card, .exp-card, .stat-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Contact form — sends email via Web3Forms (no account needed, just access key)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending… <i class="bi bi-hourglass-split"></i>';

    const formData = new FormData(contactForm);
    const object = {};
    formData.forEach((val, key) => { object[key] = val; });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(object)
      });
      const result = await response.json();

      if (result.success) {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="bi bi-send"></i>';
      alert('Could not send message. Please email eng.odaiqadree@gmail.com directly.');
    }
  });
}
