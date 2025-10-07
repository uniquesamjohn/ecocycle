// Screen 2 Specific JavaScript

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
                    goToScreen(3);
                } else {
                    // Swipe right - previous screen
                    goToScreen(1);
                }
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
            this.style.transform = 'translateX(30px) scale(0.9)';
            this.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'translateX(0) scale(1)';
            }, 300);
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
            console.log(`Screen 2 Navigation: ${action}`);
            
            // Add loading state for navigation
            if (this.classList.contains('next') || this.classList.contains('skip')) {
                showLoading();
                
                setTimeout(() => {
                    hideLoading();
                }, 300);
            }
        });
    });
    
    // Add interactive arrow animation
    const title = document.querySelector('.title');
    if (title) {
        title.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('::before');
            this.style.transform = 'scale(1.02)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        title.style.transition = 'transform 0.2s ease';
        title.style.cursor = 'pointer';
    }
    
    // Add problem-solution demonstration
    setTimeout(() => {
        demonstrateProblemSolution();
    }, 2000);
    
    console.log('Problem → Solution screen loaded successfully');
});

// Screen 2 specific functions
function demonstrateProblemSolution() {
    const illustration = document.querySelector('.illustration');
    if (!illustration) return;
    
    // Create a subtle pulsing effect to draw attention
    illustration.style.animation = 'solutionPulse 2s ease-in-out infinite';
    
    // Add CSS for the pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes solutionPulse {
            0%, 100% { 
                filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
            }
            50% { 
                filter: drop-shadow(0 8px 16px rgba(39, 174, 96, 0.3));
            }
        }
    `;
    document.head.appendChild(style);
    
    // Stop the animation after a few cycles
    setTimeout(() => {
        illustration.style.animation = '';
    }, 8000);
}

function highlightSolution() {
    const description = document.querySelector('.description');
    if (description) {
        description.style.color = '#27ae60';
        description.style.fontWeight = '600';
        description.style.transform = 'scale(1.05)';
        description.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            description.style.color = '#7f8c8d';
            description.style.fontWeight = '400';
            description.style.transform = 'scale(1)';
        }, 2000);
    }
}

// Add interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const illustrationContainer = document.querySelector('.illustration-container');
    if (illustrationContainer) {
        illustrationContainer.addEventListener('click', function() {
            highlightSolution();
            showMessage('Real-time tracking keeps you informed!');
        });
        
        illustrationContainer.style.cursor = 'pointer';
    }
    
    // Add hover effect to navigation dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.3)';
                this.style.backgroundColor = '#27ae60';
                this.style.opacity = '0.7';
            }
        });
        
        dot.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#bdc3c7';
                this.style.opacity = '1';
            }
        });
    });
});

// Add scroll-triggered animations for larger screens
if (window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
        const illustration = document.querySelector('.illustration');
        if (illustration) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * -0.1;
            illustration.style.transform = `translateY(${parallax}px)`;
        }
    });
}