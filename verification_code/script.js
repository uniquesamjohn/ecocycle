// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Direct backend caller
    const API_BASE = window.ECO_API_BASE || 'https://ecocycle-techyjaunt.onrender.com/api';

    async function callBackend(path, opts = {}){
        const url = path.startsWith('http') ? path : (API_BASE + path);
        const method = (opts.method || 'GET').toUpperCase();
        const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
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
    const otpInputs = document.querySelectorAll('.otp-input');
    const verificationForm = document.getElementById('verificationForm');
    const resendButton = document.querySelector('.resend-button');
    const submitButton = document.querySelector('.submit-button');
    
    // OTP Input Handling
    otpInputs.forEach((input, index) => {
        // Handle input
        input.addEventListener('input', function(e) {
            const value = e.target.value;
            
            // Only allow numbers
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Move to next input if current is filled
            if (value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
            
            // Check if all inputs are filled
            checkOTPComplete();
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text');
            const digits = pastedData.match(/\d/g);
            
            if (digits) {
                digits.forEach((digit, i) => {
                    if (index + i < otpInputs.length) {
                        otpInputs[index + i].value = digit;
                    }
                });
                
                // Focus on the last filled input or the next empty one
                const lastFilledIndex = Math.min(index + digits.length - 1, otpInputs.length - 1);
                otpInputs[lastFilledIndex].focus();
                
                checkOTPComplete();
            }
        });
    });
    
    // Check if OTP is complete
    function checkOTPComplete() {
        const allFilled = Array.from(otpInputs).every(input => input.value.length === 1);
        submitButton.disabled = !allFilled;
    }
    
    // Form submission
    if (verificationForm) {
        verificationForm.addEventListener('submit', async function(event) {
            event.preventDefault();


            // Get OTP value
            const otp = Array.from(otpInputs).map(input => input.value).join('');

            if (otp.length !== 6 && otp.length !== 4) {
                showMessage('Please enter the complete verification code');
                return;
            }

            const email = sessionStorage.getItem('resetEmail');
            if (!email) {
                showMessage('Missing email address. Please re-enter your email');
                setTimeout(()=> window.location.href = '../forgot_password/index.html', 800);
                return;
            }

            try {
                showLoading();
                await callBackend('/auth/verify-otp', {
                    method: 'POST',
                    body: { email, otp }
                });

                // Store OTP in sessionStorage to allow reset page to proceed
                sessionStorage.setItem('verificationCode', otp);
                showMessage('OTP verified. Proceed to reset password');
                setTimeout(() => {
                    window.location.href = '../reset_password/index.html';
                }, 900);
            } catch (err) {
                console.error('verifyOtp error', err);
                const msg = (err && err.payload && err.payload.message) || err.message || 'OTP verification failed';
                showMessage(msg);
            } finally {
                hideLoading();
            }
        });
    }
    
    // Resend code functionality
    if (resendButton) {
        resendButton.addEventListener('click', function() {
            // Clear all inputs
            otpInputs.forEach(input => input.value = '');
            otpInputs[0].focus();
            
            // Simulate resending code
            console.log('Resending verification code');
            alert('A new verification code has been sent to your email!');
            
            checkOTPComplete();
        });
    }
    
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = '../forgot_password/index.html';
        });
    }
    
    // Initialize button state
    checkOTPComplete();
});