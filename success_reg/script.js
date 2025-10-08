// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Go back to the sign-in page
            window.location.href = '/sign-in/index.html';
        });
    }
    
    // Connect button functionality
    const connectButton = document.querySelector('.connect-button');
    if (connectButton) {
        connectButton.addEventListener('click', function() {
            // In a real app, this would navigate to the driver connection page
            console.log('Connect with driver clicked');
            alert('This would navigate to the driver connection page in a real application.');
        });
    }
    
    // Animation for success icon
    const successIcon = document.querySelector('.success-icon');
    if (successIcon) {
        // Add a simple fade-in animation
        successIcon.style.opacity = '0';
        successIcon.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            successIcon.style.opacity = '1';
        }, 300);
    }
    
    // Animation for success message
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        // Add a simple fade-in animation with delay
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            successMessage.style.opacity = '1';
        }, 800);
    }
    
    // Animation for connect button
    const connectButtonAnim = document.querySelector('.connect-button');
    if (connectButtonAnim) {
        // Add a simple fade-in animation with delay
        connectButtonAnim.style.opacity = '0';
        connectButtonAnim.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            connectButtonAnim.style.opacity = '1';
        }, 1300);
    }
});