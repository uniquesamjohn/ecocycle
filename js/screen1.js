// Screen 1 Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add touch/swipe support for mobile navigation
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
        
        let diffX = startX - endX;
        let diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    // Swipe left - next screen
                    goToScreen(2);
                }
                // No previous screen from screen 1
            }
        }
        
        startX = 0;
        startY = 0;
    });
    
    // Add entrance animation to illustration
    const illustration = document.querySelector('.illustration');
    if (illustration) {
        illustration.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0.8)';
            this.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Trigger if image is already loaded
        if (illustration.complete) {
            illustration.dispatchEvent(new Event('load'));
        }
    }
    
    // Add click tracking for analytics (placeholder)
    document.querySelectorAll('.nav-button, .dot').forEach(element => {
        element.addEventListener('click', function(e) {
            const action = this.textContent || 'dot-navigation';
            console.log(`Screen 1 Navigation: ${action}`);
            
            // Add loading state for navigation
            if (this.classList.contains('next') || this.classList.contains('skip')) {
                showLoading();
                
                // Hide loading after a short delay (simulating page load)
                setTimeout(() => {
                    hideLoading();
                }, 300);
            }
        });
    });
    
    // Add parallax effect to illustration on scroll (for larger screens)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const illustration = document.querySelector('.illustration');
            if (illustration) {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.2;
                illustration.style.transform = `translateY(${parallax}px) scale(1)`;
            }
        });
    }
    
    // Add welcome message after page load
    setTimeout(() => {
        console.log('Welcome to Ecocycle - Screen 1 loaded successfully');
    }, 1000);
});

// Screen 1 specific functions
function handleWelcomeInteraction() {
    const title = document.querySelector('.title');
    if (title) {
        title.style.transform = 'scale(1.05)';
        setTimeout(() => {
            title.style.transform = 'scale(1)';
        }, 200);
    }
}

// Add click effect to title
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.title');
    if (title) {
        title.addEventListener('click', handleWelcomeInteraction);
        title.style.cursor = 'pointer';
        title.style.transition = 'transform 0.2s ease';
    }
});