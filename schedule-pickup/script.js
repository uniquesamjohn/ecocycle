// Pickup Type Selection
let selectedPickupType = 'one-off';

function selectPickupType(type) {
    selectedPickupType = type;
    
    const oneOffBtn = document.getElementById('oneOffBtn');
    const recurringBtn = document.getElementById('recurringBtn');
    
    if (type === 'one-off') {
        oneOffBtn.classList.add('active');
        recurringBtn.classList.remove('active');
        
        oneOffBtn.querySelector('.radio-button').classList.add('selected');
        recurringBtn.querySelector('.radio-button').classList.remove('selected');
    } else {
        recurringBtn.classList.add('active');
        oneOffBtn.classList.remove('active');
        
        recurringBtn.querySelector('.radio-button').classList.add('selected');
        oneOffBtn.querySelector('.radio-button').classList.remove('selected');
    }
    
    console.log('Selected pickup type:', type);
}

// Date Picker
function openDatePicker() {
    // In a real application, this would open a native date picker or custom modal
    const dateInput = document.querySelector('.date-input');
    
    // For demonstration, we'll just show an alert
    // In production, you'd integrate with a date picker library or native input
    alert('Date picker would open here. Current date: ' + dateInput.value);
    
    // Example of how you might handle date selection:
    // const newDate = prompt('Enter new date (e.g., Sept 26, 2025):', dateInput.value);
    // if (newDate) {
    //     dateInput.value = newDate;
    // }
}

// Time Picker
function openTimePicker() {
    // In a real application, this would open a native time picker or custom modal
    const timeInput = document.querySelector('.time-input');
    
    // For demonstration, we'll just show an alert
    alert('Time picker would open here. Current time: ' + timeInput.value);
    
    // Example of how you might handle time selection:
    // const newTime = prompt('Enter new time (e.g., 10AM):', timeInput.value);
    // if (newTime) {
    //     timeInput.value = newTime;
    // }
}

// Location Button
document.addEventListener('DOMContentLoaded', function() {
    const locationButton = document.querySelector('.location-button');
    
    if (locationButton) {
        locationButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would request geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        console.log('Latitude:', position.coords.latitude);
                        console.log('Longitude:', position.coords.longitude);
                        
                        // Here you would reverse geocode the coordinates to get an address
                        alert('Location detected! In a real app, this would update the address field.');
                    },
                    function(error) {
                        console.error('Error getting location:', error);
                        alert('Unable to get your location. Please enter address manually.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });
    }
});

// Confirm Request
function confirmRequest() {
    // Gather all form data
    const pickupType = selectedPickupType;
    const pickupDate = document.querySelector('.date-input').value;
    const pickupTime = document.querySelector('.time-input').value;
    const address = document.querySelector('.address-input input').value;
    const note = document.querySelector('.note-textarea').value;
    const reminder = document.querySelector('.remind-dropdown').value;
    
    // Validate required fields
    if (!address.trim()) {
        alert('Please enter a pickup address.');
        return;
    }
    
    // Create request object
    const requestData = {
        pickupType: pickupType,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        address: address,
        note: note,
        reminderMinutes: reminder
    };
    
    console.log('Pickup Request:', requestData);
    
    // In a real application, you would send this data to your backend
    // For demonstration, we'll show a success message
    showSuccessMessage();
}

// Show Success Message
function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    const successBox = document.createElement('div');
    successBox.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        max-width: 300px;
        margin: 0 20px;
        animation: slideUp 0.3s ease;
    `;
    
    successBox.innerHTML = `
        <div style="width: 60px; height: 60px; background: #1B7B4F; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M6 15L12 21L24 9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <h2 style="font-size: 20px; font-weight: 600; color: #000; margin-bottom: 12px;">Request Confirmed!</h2>
        <p style="font-size: 14px; color: #6B7280; margin-bottom: 24px;">Your pickup has been scheduled successfully.</p>
        <button onclick="closeSuccessMessage()" style="width: 100%; padding: 14px; background: #1B7B4F; border: none; border-radius: 8px; color: white; font-size: 16px; font-weight: 600; cursor: pointer;">
            Done
        </button>
    `;
    
    overlay.appendChild(successBox);
    document.body.appendChild(overlay);
    
    // Store reference for closing
    window.currentOverlay = overlay;
}

// Close Success Message
function closeSuccessMessage() {
    if (window.currentOverlay) {
        window.currentOverlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (window.currentOverlay && window.currentOverlay.parentNode) {
                window.currentOverlay.parentNode.removeChild(window.currentOverlay);
            }
            window.currentOverlay = null;
        }, 300);
    }
}

// Back Button
function goBack() {
    // In a real application, this would navigate to the previous page
    if (confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
        // window.history.back();
        console.log('Going back...');
        alert('In a real app, this would navigate to the previous screen.');
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Handle textarea auto-resize
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('.note-textarea');
    
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});

// Prevent form submission on Enter key (except in textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Add touch feedback for mobile
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
});

// Initialize
console.log('Schedule Pickup App Initialized');
console.log('Selected pickup type:', selectedPickupType);