// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    // Add event listener for form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            
            // Basic validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Store email in sessionStorage for use in other pages
            sessionStorage.setItem('resetEmail', email);
            
            // Simulate sending OTP
            console.log('Sending OTP to:', email);
            
            // Show success message
            alert('Verification code has been sent to your email!');
            
            // Redirect to verification code page
            setTimeout(() => {
                window.location.href = '../verification_code/index.html';
            }, 1000);
        });
    }
    
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Go back to the sign-in page
            window.location.href = '../sign-in/index.html';
        });
    }
});