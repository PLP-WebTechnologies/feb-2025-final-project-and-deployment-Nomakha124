document.addEventListener('DOMContentLoaded', () => {
  // Blog search functionality
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const categorySelect = document.getElementById('category-select');
  const blogPosts = document.querySelectorAll('.post-card');
  
  if (!searchInput || !searchButton || !categorySelect) return;
  
  // Search posts based on input text
  function searchPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();
    
    blogPosts.forEach(post => {
      const title = post.querySelector('h2').textContent.toLowerCase();
      const content = post.querySelector('p').textContent.toLowerCase();
      const category = post.querySelector('.category').textContent.toLowerCase();
      
      // Check if post matches both search term and category filter
      const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            content.includes(searchTerm);
      
      const matchesCategory = selectedCategory === 'all' || 
                              category.includes(selectedCategory);
      
      // Show or hide post based on matches
      if (matchesSearch && matchesCategory) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
    
    // Check if no results are found
    checkNoResults();
  }
  
  // Check if no results are found after filtering
  function checkNoResults() {
    let visiblePosts = 0;
    
    blogPosts.forEach(post => {
      if (post.style.display !== 'none') {
        visiblePosts++;
      }
    });
    
    const postsGrid = document.querySelector('.posts-grid');
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (visiblePosts === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
          <p>No posts found matching your search criteria.</p>
          <button class="btn btn-secondary reset-filters">Reset Filters</button>
        `;
        postsGrid.after(noResultsMsg);
        
        // Add event listener to reset button
        document.querySelector('.reset-filters').addEventListener('click', resetFilters);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  // Reset all filters
  function resetFilters() {
    searchInput.value = '';
    categorySelect.value = 'all';
    
    blogPosts.forEach(post => {
      post.style.display = '';
    });
    
    const noResultsMsg = document.querySelector('.no-results-message');
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  // Event listeners
  searchButton.addEventListener('click', searchPosts);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchPosts();
    }
  });
  
  categorySelect.addEventListener('change', searchPosts);
  
  // URL parameter handling for category filtering
  function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      // Set the category select to match the URL parameter
      const options = Array.from(categorySelect.options);
      const matchingOption = options.find(option => 
        option.value.toLowerCase() === categoryParam.toLowerCase()
      );
      
      if (matchingOption) {
        categorySelect.value = matchingOption.value;
        searchPosts();
      }
    }
  }
  
  // Handle URL parameters on page load
  handleUrlParameters();
  
  // Pagination functionality
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      paginationButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button (except for Next button)
      if (!button.classList.contains('pagination-next')) {
        button.classList.add('active');
      }
      
      // Smooth scroll to top of blog posts section
      const blogPostsSection = document.querySelector('.blog-posts');
      if (blogPostsSection) {
        const headerOffset = 80;
        const elementPosition = blogPostsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      // In a real implementation, this would load new posts
      // For now, we'll just show a simulated loading effect
      const postsGrid = document.querySelector('.posts-grid');
      if (postsGrid) {
        postsGrid.style.opacity = '0.5';
        
        setTimeout(() => {
          postsGrid.style.opacity = '1';
        }, 500);
      }
    });
  });
});