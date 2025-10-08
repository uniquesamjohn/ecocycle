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

    const form = document.querySelector('form');
    if (!form) return;

    // Toggle driver-specific fields
    const roleSelect = document.getElementById('role');
    const licenseField = document.getElementById('license-field');
    if (roleSelect) {
        roleSelect.addEventListener('change', function(){
            if (this.value === 'driver') {
                licenseField.style.display = '';
                document.getElementById('licenseNumber').required = true;
            } else {
                licenseField.style.display = 'none';
                document.getElementById('licenseNumber').required = false;
            }
        });
        // initial state
        if (roleSelect.value === 'driver') {
            licenseField.style.display = '';
            document.getElementById('licenseNumber').required = true;
        }
    }

    form.addEventListener('submit', async function(e){
        e.preventDefault();

        const name = (document.getElementById('name') || {}).value || '';
        const email = (document.getElementById('email') || {}).value || '';
        const password = (document.getElementById('password') || {}).value || '';
        const roleEl = document.querySelector('select[name="role"]') || document.getElementById('role');
        const role = roleEl ? roleEl.value : 'household';

        if (!name || !email || !password) {
            showMessage('Please fill name, email and password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters');
            return;
        }

        const body = { name, email, password, role };

        // Collect optional driver fields if present
        const license = document.getElementById('licenseNumber');
        if (license && license.value) body.licenseNumber = license.value;

        try {
            showLoading();
                // POST directly to backend route that saves user to DB
                const res = await callBackend('/auth/signup', {
                    method: 'POST',
                    body
                });

            if (res && res.token) localStorage.setItem('ecocycle_token', res.token);
            if (res && res.user) localStorage.setItem('ecocycle_user', JSON.stringify(res.user));

            showMessage('Account created. Check your email for verification.');
            setTimeout(()=>{
                window.location.href = '../success_reg/index.html';
            }, 900);
        } catch (err) {
            console.error('Signup error', err);
            const msg = (err && err.payload && err.payload.message) || err.message || 'Signup failed';
            showMessage(msg);
        } finally {
            hideLoading();
        }
    });
});
