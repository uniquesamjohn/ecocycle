// Card number formatting
const cardNumberInput = document.getElementById('cardNumber');
const expiryInput = document.getElementById('expiry');
const cvvInput = document.getElementById('cvv');
const paymentForm = document.querySelector('.payment-form');

// Format card number with spaces (XXXX XXXX XXXX XXXX)
cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Only allow numbers in card number
cardNumberInput.addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
    }
});

// Format expiry date (MM / YY)
expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/\//g, '');
    
    if (value.length >= 2) {
        value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
    }
    
    e.target.value = value;
});

// Only allow numbers in expiry
expiryInput.addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
    }
});

// Only allow numbers in CVV
cvvInput.addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
    }
});

// Form submission
paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const cardNumber = cardNumberInput.value;
    const expiry = expiryInput.value;
    const cvv = cvvInput.value;
    
    // Basic validation
    if (!name || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all fields');
        return;
    }
    
    if (cardNumber.replace(/\s/g, '').length < 12) {
        alert('Please enter a valid card number');
        return;
    }
    
    if (cvv.length < 3) {
        alert('Please enter a valid CVV');
        return;
    }
    
    // Simulate payment processing
    const payButton = document.querySelector('.pay-button');
    payButton.textContent = 'Processing...';
    payButton.disabled = true;
    
    setTimeout(() => {
        alert('Payment Successful!');
        payButton.textContent = 'Pay';
        payButton.disabled = false;
        
        // Reset form (except card number for demo purposes)
        document.getElementById('name').value = '';
        expiryInput.value = '';
        cvvInput.value = '';
    }, 2000);
});

// Back button functionality
document.querySelector('.back-button').addEventListener('click', function() {
    // In a real app, this would navigate back
    if (confirm('Go back? Any unsaved changes will be lost.')) {
        window.history.back();
    }
});

// Add focus effects
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.2s';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Prevent form submission on Enter key (except on Pay button)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
    }
});