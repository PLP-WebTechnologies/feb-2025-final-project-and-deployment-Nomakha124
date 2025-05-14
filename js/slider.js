// Image slider functionality
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  
  if (!slider || slides.length === 0) return;
  
  let currentIndex = 0;
  let autoplayInterval;
  
  // Function to show a specific slide
  function showSlide(index) {
    // Update currentIndex with boundary checks
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    // Hide all slides and remove active class from dots
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }
  
  // Initialize slider
  showSlide(currentIndex);
  
  // Event listeners for navigation buttons
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      showSlide(currentIndex - 1);
      startAutoplay();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      showSlide(currentIndex + 1);
      startAutoplay();
    });
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      showSlide(index);
      startAutoplay();
    });
  });
  
  // Function to start autoplay
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }
  
  // Start autoplay
  startAutoplay();
  
  // Pause autoplay when hovering over slider
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  // Resume autoplay when moving away from slider
  slider.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // Handle swipe gestures for touch devices
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    clearInterval(autoplayInterval);
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      showSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      showSlide(currentIndex - 1);
    }
    
    startAutoplay();
  }
});