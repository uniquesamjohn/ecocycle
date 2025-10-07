// Ecocycle App - Shared JavaScript Functions

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

// Navigation functions
function goToScreen(screenNumber) {
    const screenFiles = {
        1: 'screen1.html',
        2: 'screen2.html', 
        3: 'screen3.html'
    };
    
    if (screenFiles[screenNumber]) {
        window.location.href = screenFiles[screenNumber];
    }
}

function nextScreen() {
    const currentScreen = getCurrentScreenNumber();
    if (currentScreen < 3) {
        goToScreen(currentScreen + 1);
    }
}

function previousScreen() {
    const currentScreen = getCurrentScreenNumber();
    if (currentScreen > 1) {
        goToScreen(currentScreen - 1);
    }
}

function skipToEnd() {
    goToScreen(3);
}

// Get current screen number from filename
function getCurrentScreenNumber() {
    const path = window.location.pathname;
    if (path.includes('screen1') || path.includes('index')) return 1;
    if (path.includes('screen2')) return 2;
    if (path.includes('screen3')) return 3;
    return 1; // default
}

// Update dots indicator based on current screen
function updateDots() {
    const currentScreen = getCurrentScreenNumber();
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
    showMessage('Registration feature coming soon!');
    // For demo purposes, you could redirect to a registration form
    // window.location.href = 'register.html';
}

function signIn() {
    showMessage('Sign in feature coming soon!');
    // For demo purposes, you could redirect to a sign in form
    // window.location.href = 'signin.html';
}

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

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    updateDots();
    
    // Add keyboard navigation support
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
                goToScreen(3);
                break;
            case '1':
            case '2':
            case '3':
                e.preventDefault();
                goToScreen(parseInt(e.key));
                break;
        }
    });
    
    // Add error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            this.style.display = 'none';
        });
    });
});

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