// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Direct backend caller
    const API_BASE = window.ECO_API_BASE || 'https://ecocycle-techyjaunt.onrender.com/api';

    async function callBackend(path, opts = {}){
        const url = path.startsWith('http') ? path : (API_BASE + path);
        const method = (opts.method || 'GET').toUpperCase();
        const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
        const token = localStorage.getItem('ecocycle_token');
        if (token) headers['Authorization'] = 'Bearer ' + token;
        const fetchOpts = { method, headers };
        if (opts.body && method !== 'GET' && method !== 'HEAD') fetchOpts.body = JSON.stringify(opts.body);

        const res = await fetch(url, fetchOpts);
        const text = await res.text();
        let json;
        try { json = text ? JSON.parse(text) : {}; } catch (err) { json = text; }
        if (!res.ok) {
            const err = new Error((json && json.message) || res.statusText || 'Request failed');
            err.payload = json;
            throw err;
        }
        return json;
    }

    // Get form element
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    // Add event listener for form submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async function(event) {
            // Prevent the default form submission
            event.preventDefault();

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
                await callBackend('/auth/forgot-password', {
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