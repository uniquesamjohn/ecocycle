// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const loginForm = document.getElementById('loginForm');
    
    // Add event listener for form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send the data to a server
            // For this example, we'll simulate a successful login
            console.log('Login attempt:', { email, password });
            
            // Simulate successful login (in a real app, this would be after server validation)
            // Redirect to success page after successful login
            setTimeout(() => {
                window.location.href = '../success_reg/index.html';
            }, 1000);
        });
    }
    
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Redirect to screen3.html when back button is clicked
            window.location.href = '../screen3.html';
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('apple') ? 'Apple' : 'Google';
            console.log(`${provider} login clicked`);
            // In a real app, this would trigger OAuth authentication
            
            // Simulate successful social login
            setTimeout(() => {
                window.location.href = '../success_reg/index.html';
            }, 1000);
        });
    });
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot_password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = '../forgot_password/index.html';
        });
    }
    
    // Sign up link
    const signupLink = document.querySelector('SIGN UP/index.html');
    if (signupLink) {
        signupLink.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Sign up clicked');
            // In a real app, this would redirect to the sign-up page
            alert('Sign up functionality would be implemented here');
        });
    }
});