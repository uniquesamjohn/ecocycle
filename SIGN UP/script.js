document.addEventListener('DOMContentLoaded', function() {
	async function loadApiHelper(){
		if (window.apiFetch) return Promise.resolve();
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = '../shared/api.js';
			script.onload = () => resolve();
			script.onerror = (e) => reject(e);
			document.head.appendChild(script);
		});
	}

	const form = document.querySelector('form');
	if (!form) return;

	form.addEventListener('submit', async function(e){
		e.preventDefault();
		await loadApiHelper();

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
			const res = await window.apiFetch('/auth/signup', {
				method: 'POST',
				body
			});

			if (res && res.token) localStorage.setItem('ecocycle_token', res.token);
			if (res && res.user) localStorage.setItem('ecocycle_user', JSON.stringify(res.user));

			showMessage('Account created. Check your email for verification.');
			setTimeout(()=>{
				// Redirect to a verification or success page if available
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
