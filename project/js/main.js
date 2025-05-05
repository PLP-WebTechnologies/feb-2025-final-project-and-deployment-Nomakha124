// Global JavaScript functionality

// Function to handle mobile menu toggle
function setupMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
      menuButton.classList.toggle('active');
      navList.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.main-nav') && navList.classList.contains('active')) {
        menuButton.classList.remove('active');
        navList.classList.remove('active');
      }
    });
  }
}

// Function to handle smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Function to handle newsletter form submission
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  const formMessage = document.getElementById('form-message');
  
  if (newsletterForm && formMessage) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-error';
        return;
      }
      
      // Simulate successful form submission
      newsletterForm.reset();
      formMessage.textContent = 'Thank you for subscribing!';
      formMessage.className = 'form-success';
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = '';
      }, 3000);
    });
  }
}

// Function to handle scroll animations
function setupScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length > 0) {
    const checkVisibility = () => {
      animateElements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight - 100 && position.bottom >= 0) {
          element.classList.add('fade-in');
        }
      });
    };
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupSmoothScrolling();
  setupNewsletterForm();
  setupScrollAnimations();
});