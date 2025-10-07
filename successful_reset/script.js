// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sign in button functionality
    const signinButton = document.querySelector('.signin-button');
    if (signinButton) {
        signinButton.addEventListener('click', function() {
            // Redirect to sign-in page
            window.location.href = '../sign-in/index.html';
        });
    }
    
    // Clear any stored session data
    sessionStorage.clear();
    
    // Optional: Add confetti or celebration effect
    // This could be enhanced with a library like canvas-confetti
    console.log('Password reset completed successfully!');
});