// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Direct backend caller (no helpers, no dev console, no logger)
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
                // inline error if sign-in fails
                let errEl = document.getElementById('login-error');
                if (!errEl) {
                    errEl = document.createElement('div');
                    errEl.id = 'login-error';
                    errEl.style.cssText = 'color: #fff; background: #e74c3c; padding: 8px 12px; border-radius:6px; margin:8px 0; display:none;';
                    loginForm.parentNode.insertBefore(errEl, loginForm);
                }

                // clear any previous error
                errEl.style.display = 'none';

                showLoading();
                const payload = await callBackend('/auth/signin', {
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
                    window.location.href = '../HOME_PAGE/index.html';
                }, 800);
            } catch (err) {
                console.error('Signin error', err);
                const msg = (err && err.payload && err.payload.message) || err.message || 'Login failed';
                // show inline and toast
                const errEl = document.getElementById('login-error');
                if (errEl) {
                    errEl.textContent = msg;
                    errEl.style.display = 'block';
                }
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
    
    // Sign up link is already handled by the anchor tag in HTML
    // No need for additional JavaScript handling as it's a simple link
});