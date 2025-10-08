// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
                await window.apiFetch('/auth/verify-otp', {
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