// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    // Add event listener for form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async function(event) {
            // Prevent the default form submission
            event.preventDefault();
            // lazy-load api helper by injecting script if needed
            if (!window.apiFetch) {
                await new Promise((resolve, reject) => {
                    const s = document.createElement('script');
                    s.src = '../shared/api.js';
                    s.onload = () => resolve();
                    s.onerror = (e) => reject(e);
                    document.head.appendChild(s);
                }).catch(e => console.warn('Could not load api helper', e));
            }

            // Get form values
            const email = document.getElementById('email').value.trim();
            
            // Basic validation
            if (!email) {
                showMessage('Please enter your email address');
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
                await window.apiFetch('/auth/forgot-password', {
                    method: 'POST',
                    body: { email }
                });

                // Store email in sessionStorage for use in verification/reset pages
                sessionStorage.setItem('resetEmail', email);
                showMessage('Verification code sent to your email');
                setTimeout(() => {
                    window.location.href = '../verification_code/index.html';
                }, 900);
            } catch (err) {
                console.error('forgotPassword error', err);
                const msg = (err && err.payload && err.payload.message) || err.message || 'Failed to send OTP';
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
            // Go back to the sign-in page
            window.location.href = '../sign-in/index.html';
        });
    }
});