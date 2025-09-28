// Screen 3 Specific JavaScript

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
                if (diffX < 0) {
                    // Swipe right - previous screen
                    goToScreen(2);
                }
                // No next screen from screen 3
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
            this.style.transform = 'translateY(30px) scale(0.8)';
            this.style.transition = 'all 1s ease-out';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'translateY(0) scale(1)';
            }, 400);
        });
        
        // Trigger if image is already loaded
        if (illustration.complete) {
            illustration.dispatchEvent(new Event('load'));
        }
    }
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Add loading state
            this.classList.add('loading');
            
            // Log action
            const action = this.textContent.trim();
            console.log(`Screen 3 Action: ${action}`);
            
            // Simulate processing time
            setTimeout(() => {
                this.classList.remove('loading');
                this.classList.add('success');
                
                setTimeout(() => {
                    this.classList.remove('success');
                }, 600);
            }, 1500);
        });
        
        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add benefits showcase animation
    setTimeout(() => {
        showcaseBenefits();
    }, 2500);
    
    console.log('Benefits screen loaded successfully');
});

// Screen 3 specific functions
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation CSS if not already added
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showcaseBenefits() {
    const benefits = [
        "🏠 Cleaner homes",
        "🛡️ Safer communities", 
        "🎁 Recycling rewards"
    ];
    
    let currentBenefit = 0;
    const description = document.querySelector('.description');
    const originalText = description.textContent;
    
    const showcaseInterval = setInterval(() => {
        if (currentBenefit < benefits.length) {
            // Highlight current benefit
            description.style.color = '#27ae60';
            description.style.fontWeight = '600';
            description.style.transform = 'scale(1.05)';
            description.textContent = benefits[currentBenefit];
            
            setTimeout(() => {
                description.style.color = '#34495e';
                description.style.fontWeight = '400';
                description.style.transform = 'scale(1)';
            }, 1500);
            
            currentBenefit++;
        } else {
            // Return to original text
            setTimeout(() => {
                description.textContent = originalText;
            }, 1500);
            clearInterval(showcaseInterval);
        }
    }, 2000);
}

function animateTitle() {
    const title = document.querySelector('.title');
    if (title) {
        title.style.transform = 'scale(1.1) rotate(2deg)';
        title.style.filter = 'drop-shadow(0 4px 8px rgba(39, 174, 96, 0.3))';
        
        setTimeout(() => {
            title.style.transform = 'scale(1) rotate(0deg)';
            title.style.filter = 'none';
        }, 500);
    }
}

// Enhanced register and sign in functions for screen 3
function register() {
    const registerBtn = document.querySelector('.btn-primary');
    
    // Show enhanced feedback
    showMessage('🌱 Welcome to the Ecocycle community! Registration coming soon.');
    
    // Add celebration effect
    createCelebrationEffect();
    
    // Log analytics
    console.log('User initiated registration from benefits screen');
    
    // Future: Redirect to registration form
    // window.location.href = 'register.html';
}

function signIn() {
    const signInBtn = document.querySelector('.btn-secondary');
    
    // Show enhanced feedback
    showMessage('👋 Welcome back! Sign in feature coming soon.');
    
    // Add subtle animation
    animateTitle();
    
    // Log analytics
    console.log('User initiated sign in from benefits screen');
    
    // Future: Redirect to sign in form
    // window.location.href = 'signin.html';
}

function createCelebrationEffect() {
    // Create floating particles
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createFloatingParticle();
        }, i * 100);
    }
}

function createFloatingParticle() {
    const particle = document.createElement('div');
    const emojis = ['🌱', '♻️', '🌍', '✨', '🎉'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    particle.textContent = randomEmoji;
    particle.style.cssText = `
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: floatUp 3s ease-out forwards;
    `;
    
    // Add float animation if not already added
    if (!document.getElementById('float-styles')) {
        const style = document.createElement('style');
        style.id = 'float-styles';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Add interactive illustration click
document.addEventListener('DOMContentLoaded', function() {
    const illustration = document.querySelector('.illustration');
    if (illustration) {
        illustration.addEventListener('click', function() {
            createCelebrationEffect();
            showMessage('🌍 Together we can make a difference!');
        });
        
        illustration.style.cursor = 'pointer';
        illustration.title = 'Click for a surprise!';
    }
    
    // Add keyboard shortcuts for final screen
    document.addEventListener('keydown', function(e) {
        if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            register();
        } else if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            signIn();
        }
    });
});

// Add scroll-triggered animations for larger screens
if (window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
        const illustration = document.querySelector('.illustration');
        if (illustration) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.1;
            illustration.style.transform = `translateY(${parallax}px) scale(1)`;
        }
    });
}