// Ecocycle Launch Screen JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeLaunchScreen();
});

function initializeLaunchScreen() {
    // Add loading progression
    simulateLoading();
    
    // Add interactive elements
    addInteractiveEffects();
    
    // Auto-redirect after loading
    setTimeout(() => {
        redirectToOnboarding();
    }, 4000);
    
    console.log('Ecocycle Launch Screen initialized');
}

function simulateLoading() {
    const loadingProgress = document.querySelector('.loading-progress');
    const logoWrapper = document.querySelector('.logo-wrapper');
    
    if (!loadingProgress) return;
    
    // Reset progress
    loadingProgress.style.width = '0%';
    
    // Simulate loading stages
    const loadingStages = [
        { progress: 20, delay: 500, message: 'Initializing...' },
        { progress: 45, delay: 1000, message: 'Loading resources...' },
        { progress: 70, delay: 1500, message: 'Preparing interface...' },
        { progress: 90, delay: 2500, message: 'Almost ready...' },
        { progress: 100, delay: 3000, message: 'Complete!' }
    ];
    
    loadingStages.forEach(stage => {
        setTimeout(() => {
            loadingProgress.style.width = stage.progress + '%';
            
            if (stage.progress === 100) {
                // Mark loading as complete
                document.body.classList.add('loading-complete');
                
                // Add success animation to logo
                if (logoWrapper) {
                    logoWrapper.classList.add('success');
                }
                
                // Change loading bar color
                loadingProgress.style.background = '#4AE54A';
            }
            
            console.log(`Loading: ${stage.progress}% - ${stage.message}`);
        }, stage.delay);
    });
}

function addInteractiveEffects() {
    const logoWrapper = document.querySelector('.logo-wrapper');
    const ecocycleText = document.querySelector('.ecocycle-text');
    
    // Logo click interaction
    if (logoWrapper) {
        logoWrapper.addEventListener('click', function() {
            createSparkleEffect(this);
            showMessage('🌱 Welcome to Ecocycle!');
        });
        
        logoWrapper.style.cursor = 'pointer';
        logoWrapper.title = 'Click for a surprise!';
    }
    
    // Text click interaction
    if (ecocycleText) {
        ecocycleText.addEventListener('click', function() {
            this.style.color = '#4AE54A';
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                this.style.color = '#2c3e50';
                this.style.transform = 'scale(1)';
            }, 300);
        });
        
        ecocycleText.style.cursor = 'pointer';
        ecocycleText.style.transition = 'all 0.3s ease';
    }
    
    // Add touch feedback for mobile
    addTouchFeedback();
}

function createSparkleEffect(element) {
    const sparkles = ['✨', '🌟', '💫', '⭐'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
            
            sparkle.textContent = randomSparkle;
            sparkle.style.cssText = `
                position: absolute;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: sparkleFloat 2s ease-out forwards;
            `;
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 100);
    }
    
    // Add sparkle animation CSS if not already added
    if (!document.getElementById('sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-30px) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-60px) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addTouchFeedback() {
    // Add touch feedback for mobile devices
    const interactiveElements = document.querySelectorAll('.logo-wrapper, .ecocycle-text');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function redirectToOnboarding() {
    // Add fade out effect
    const launchScreen = document.querySelector('.ecocycle');
    if (launchScreen) {
        launchScreen.style.opacity = '0';
        launchScreen.style.transform = 'scale(0.95)';
        launchScreen.style.transition = 'all 0.5s ease-out';
    }
    
    // Redirect after fade out
    setTimeout(() => {
        window.location.href = '../screen1.html';
    }, 500);
}

function showMessage(message) {
    // Create a toast message
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(44, 62, 80, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: 600;
        z-index: 2000;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        animation: toastSlideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    
    // Add toast animation CSS if not already added
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes toastSlideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 2 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'Enter':
        case ' ':
            e.preventDefault();
            redirectToOnboarding();
            break;
        case 'Escape':
            e.preventDefault();
            // Skip loading and go directly
            document.body.classList.add('loading-complete');
            setTimeout(redirectToOnboarding, 500);
            break;
    }
});

// Add visibility change handling
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Performance optimization
window.addEventListener('load', function() {
    // Preload next screen resources
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'screen1.html';
    document.head.appendChild(link);
    
    console.log('Launch screen resources loaded, prefetching onboarding screen');
});

// Add error handling
window.addEventListener('error', function(e) {
    console.error('Launch screen error:', e.error);
    // Fallback: redirect to onboarding even if there's an error
    setTimeout(redirectToOnboarding, 1000);
});

// Add resize handling for responsive behavior
window.addEventListener('resize', function() {
    // Adjust logo size based on screen size
    const logo = document.querySelector('.ecocycle-logo');
    if (logo && window.innerWidth < 375) {
        logo.style.transform = 'scale(0.9)';
    } else if (logo) {
        logo.style.transform = 'scale(1)';
    }
});

// Initialize resize handling
window.dispatchEvent(new Event('resize'));