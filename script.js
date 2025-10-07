// Ecocycle App JavaScript
let currentScreen = 1;
const totalScreens = 3;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateDots();
    
    // Add touch/swipe support for mobile
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
                    nextScreen();
                } else {
                    // Swipe right - previous screen
                    previousScreen();
                }
            }
        }
        
        startX = 0;
        startY = 0;
    });
});

// Navigation functions
function nextScreen() {
    if (currentScreen < totalScreens) {
        goToScreen(currentScreen + 1);
    }
}

function previousScreen() {
    if (currentScreen > 1) {
        goToScreen(currentScreen - 1);
    }
}

function goToScreen(screenNumber) {
    if (screenNumber < 1 || screenNumber > totalScreens) return;
    
    // Hide current screen
    const currentScreenElement = document.getElementById(`screen-${currentScreen}`);
    const newScreenElement = document.getElementById(`screen-${screenNumber}`);
    
    if (currentScreenElement && newScreenElement) {
        // Add animation class based on direction
        const isForward = screenNumber > currentScreen;
        
        currentScreenElement.classList.remove('active');
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
            newScreenElement.classList.add('active');
            
            if (isForward) {
                newScreenElement.classList.add('slide-in-right');
            } else {
                newScreenElement.classList.add('slide-in-left');
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                newScreenElement.classList.remove('slide-in-right', 'slide-in-left');
            }, 500);
        }, 50);
        
        currentScreen = screenNumber;
        updateDots();
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentScreen) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Action button functions
function register() {
    // Add registration logic here
    showMessage('Registration feature coming soon!');
    
    // For demo purposes, you could redirect to a registration form
    // window.location.href = 'register.html';
}

function signIn() {
    // Add sign in logic here
    showMessage('Sign in feature coming soon!');
    
    // For demo purposes, you could redirect to a sign in form
    // window.location.href = 'signin.html';
}

// Utility function to show messages
function showMessage(message) {
    // Create a simple toast message
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2c3e50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            nextScreen();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            previousScreen();
            break;
        case 'Home':
            e.preventDefault();
            goToScreen(1);
            break;
        case 'End':
            e.preventDefault();
            goToScreen(totalScreens);
            break;
        case '1':
        case '2':
        case '3':
            e.preventDefault();
            goToScreen(parseInt(e.key));
            break;
    }
});

// Add smooth scrolling behavior
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Performance optimization - preload images
function preloadImages() {
    const images = [
        'undraw_augmented-reality_3ie0 1.png',
        'undraw_take-out-boxes_n094 (1) 1.png',
        'undraw_among-nature_2f9e 1.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Add loading state management
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(248, 249, 250, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 40px;
            height: 40px;
            border: 4px solid #e3e3e3;
            border-top: 4px solid #27ae60;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // You could add a placeholder or fallback image here
            this.style.display = 'none';
        });
    });
});