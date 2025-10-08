// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;
        
        return strength;
    }
    
    // Add password strength indicator
    if (newPasswordInput) {
        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        newPasswordInput.parentElement.appendChild(strengthIndicator);
        
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            if (password.length === 0) {
                strengthIndicator.textContent = '';
                strengthIndicator.className = 'password-strength';
            } else if (strength <= 2) {
                strengthIndicator.textContent = 'Weak password';
                strengthIndicator.className = 'password-strength weak';
            } else if (strength <= 4) {
                strengthIndicator.textContent = 'Medium password';
                strengthIndicator.className = 'password-strength medium';
            } else {
                strengthIndicator.textContent = 'Strong password';
                strengthIndicator.className = 'password-strength strong';
            }
        });
    }
    
    // Form submission
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault();

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

            const newPassword = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // Validation
            if (!newPassword || !confirmPassword) {
                showMessage('Please fill in all fields');
                return;
            }

            if (newPassword.length < 6) {
                showMessage('Password must be at least 6 characters long');
                return;
            }

            if (newPassword !== confirmPassword) {
                showMessage('Passwords do not match');
                return;
            }

            // Check password strength
            const strength = checkPasswordStrength(newPassword);
            if (strength < 3) {
                const proceed = confirm('Your password is weak. Do you want to continue?');
                if (!proceed) return;
            }

            const email = sessionStorage.getItem('resetEmail');
            const otp = sessionStorage.getItem('verificationCode');

            if (!email || !otp) {
                showMessage('Missing reset context. Please re-run forgot password flow');
                setTimeout(()=> window.location.href = '../forgot_password/index.html', 800);
                return;
            }

            try {
                showLoading();
                // Backend expects a userId param; provide a placeholder 'reset' so controller can run
                const res = await callBackend('/auth/reset-password/reset', {
                    method: 'POST',
                    body: { email, newPassword, confirmPassword }
                });

                // Clear sessionStorage
                sessionStorage.removeItem('resetEmail');
                sessionStorage.removeItem('verificationCode');

                showMessage('Password reset successfully');
                setTimeout(() => {
                    window.location.href = '../successful_reset/index.html';
                }, 900);
            } catch (err) {
                console.error('resetPassword error', err);
                const msg = (err && err.payload && err.payload.message) || err.message || 'Reset failed';
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
            window.location.href = '../verification_code/index.html';
        });
    }
});