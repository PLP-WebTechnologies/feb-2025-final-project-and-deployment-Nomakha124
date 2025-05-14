document.addEventListener('DOMContentLoaded', () => {
  // Comment form handling
  const commentForm = document.getElementById('comment-form');
  
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('comment-name').value.trim();
      const email = document.getElementById('comment-email').value.trim();
      const content = document.getElementById('comment-content').value.trim();
      
      // Basic validation
      if (name === '' || email === '' || content === '') {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Simulate adding a new comment
      const commentsList = document.querySelector('.comments-list');
      
      if (commentsList) {
        // Create new comment element
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `
          <div class="comment-avatar">
            <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="${name}">
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <h4 class="comment-author">${name}</h4>
              <span class="comment-date">Just now</span>
            </div>
            <p>${content}</p>
            <button class="reply-button">Reply</button>
          </div>
        `;
        
        // Add the new comment to the top of the list
        commentsList.insertBefore(newComment, commentsList.firstChild);
        
        // Reset the form
        commentForm.reset();
        
        // Scroll to the new comment
        newComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  
  // Reply button functionality
  document.querySelectorAll('.reply-button').forEach(button => {
    button.addEventListener('click', function() {
      // Get the comment content
      const commentEl = this.closest('.comment');
      const authorName = commentEl.querySelector('.comment-author').textContent.trim();
      
      // Focus on comment form and modify content
      const commentInput = document.getElementById('comment-content');
      if (commentInput) {
        commentInput.focus();
        commentInput.value = `@${authorName} `;
        
        // Scroll to the form
        const formContainer = document.querySelector('.comment-form-container');
        if (formContainer) {
          formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
  
  // Code highlighting functionality
  document.querySelectorAll('.code-block').forEach(block => {
    // Add copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.textContent = 'Copy';
    copyButton.style.position = 'absolute';
    copyButton.style.top = '10px';
    copyButton.style.right = '10px';
    copyButton.style.padding = '4px 8px';
    copyButton.style.fontSize = '12px';
    copyButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    
    // Position the code block relatively
    block.style.position = 'relative';
    
    block.appendChild(copyButton);
    
    // Add click event to copy code
    copyButton.addEventListener('click', () => {
      const code = block.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });
  });
  
  // Table of Contents functionality
  function generateTableOfContents() {
    const mainContent = document.querySelector('.main-content');
    const headings = mainContent ? mainContent.querySelectorAll('h2, h3') : [];
    
    if (headings.length > 0 && mainContent) {
      // Create Table of Contents container
      const tocContainer = document.createElement('div');
      tocContainer.className = 'table-of-contents';
      tocContainer.innerHTML = '<h3>Contents</h3><ul></ul>';
      
      const tocList = tocContainer.querySelector('ul');
      
      // Generate ID for each heading if not present
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        
        // Create list item for each heading
        const listItem = document.createElement('li');
        listItem.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
      
      // Insert TOC after the intro paragraph
      const introParagraph = mainContent.querySelector('.article-intro');
      if (introParagraph) {
        introParagraph.after(tocContainer);
      } else {
        mainContent.prepend(tocContainer);
      }
      
      // Add some basic styling
      tocContainer.style.backgroundColor = 'var(--color-neutral-50)';
      tocContainer.style.padding = '20px';
      tocContainer.style.borderRadius = '8px';
      tocContainer.style.marginBottom = '30px';
      
      const tocItems = tocContainer.querySelectorAll('li');
      tocItems.forEach(item => {
        item.style.marginBottom = '8px';
      });
      
      const tocH3Items = tocContainer.querySelectorAll('.toc-h3');
      tocH3Items.forEach(item => {
        item.style.paddingLeft = '20px';
      });
    }
  }
  
  // Generate Table of Contents
  generateTableOfContents();
  
  // Estimated reading time calculation
  function calculateReadingTime() {
    const mainContent = document.querySelector('.main-content');
    const readTimeElement = document.querySelector('.read-time');
    
    if (mainContent && readTimeElement) {
      const text = mainContent.textContent || '';
      const wordCount = text.split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 250)); // Average reading speed: 250 words per minute
      
      readTimeElement.textContent = `${readingTime} min read`;
    }
  }
  
  // Calculate reading time
  calculateReadingTime();
});