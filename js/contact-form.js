// Contact form validation and submission handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (!contactForm || !formStatus) return;
  
  // Error message elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  
  // Form validation function
  function validateForm() {
    let isValid = true;
    
    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset error messages
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';
    
    // Validate name
    if (name === '') {
      nameError.textContent = 'Please enter your name';
      nameError.style.display = 'block';
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      emailError.textContent = 'Please enter your email address';
      emailError.style.display = 'block';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address';
      emailError.style.display = 'block';
      isValid = false;
    }
    
    // Validate message
    if (message === '') {
      messageError.textContent = 'Please enter your message';
      messageError.style.display = 'block';
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent = 'Your message is too short (minimum 10 characters)';
      messageError.style.display = 'block';
      isValid = false;
    }
    
    return isValid;
  }
  
  // Form submission event
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Reset form
      contactForm.reset();
      
      // Show success message
      formStatus.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      formStatus.style.display = 'block';
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }, 1500);
  });
  
  // FAQ section toggle functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Toggle active class on the question
      question.classList.toggle('active');
      
      // Toggle active class on the parent faq-item
      const faqItem = question.parentElement;
      faqItem.classList.toggle('active');
    });
  });
});