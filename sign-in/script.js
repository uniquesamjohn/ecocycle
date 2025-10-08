// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Import the shared api helper via global (we added shared/api.js as a module; but to keep compatibility
    // with simple <script> tags we'll dynamically load it if needed)
    function loadApiHelper(){
        if (window.apiFetch) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '../shared/api.js';
            script.onload = () => resolve();
            script.onerror = (e) => {
                console.warn('Failed to load shared/api.js', e);
                reject(e);
            };
            document.head.appendChild(script);
        });
    }

    // Get form element
    const loginForm = document.getElementById('loginForm');

    // Add event listener for form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            // Prevent the default form submission
            event.preventDefault();
            await loadApiHelper();

            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Basic validation
            if (!email || !password) {
                showMessage('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address');
                return;
            }

            try {
                showLoading();
                const payload = await window.apiFetch('/auth/signin', {
                    method: 'POST',
                    body: { email, password }
                });

                // Save token and user
                if (payload && payload.token) {
                    localStorage.setItem('ecocycle_token', payload.token);
                }
                if (payload && payload.user) {
                    localStorage.setItem('ecocycle_user', JSON.stringify(payload.user));
                }

                showMessage('Login successful');
                // redirect to home page or appropriate dashboard
                setTimeout(() => {
                    window.location.href = '../HOME PAGE/index.html';
                }, 800);
            } catch (err) {
                console.error('Signin error', err);
                const msg = (err && err.payload && err.payload.message) || err.message || 'Login failed';
                showMessage(msg);
            } finally {
                hideLoading();
            }
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