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

// Contact form — AJAX submit to Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending… <i class="bi bi-hourglass-split"></i>';

    const data = new FormData(contactForm);

    try {
      const response = await fetch('https://formspree.io/f/xanonnqe', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Try Again <i class="bi bi-arrow-clockwise"></i>';
        alert('Something went wrong. Please email eng.odaiqadree@gmail.com directly.');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Try Again <i class="bi bi-arrow-clockwise"></i>';
      alert('Network error. Please email eng.odaiqadree@gmail.com directly.');
    }
  });
}
