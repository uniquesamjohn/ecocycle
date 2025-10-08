document.addEventListener('DOMContentLoaded', async function(){
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

    try{
        const res = await callBackend('/auth/me');
        if (!res || !res.user) return;
        const user = res.user;
        // Populate profile fields
        const nameEl = document.querySelector('.profile-name');
        if (nameEl) nameEl.textContent = user.name || '';
        const emailEls = document.querySelectorAll('.profile-value.email');
        emailEls.forEach(el => el.textContent = user.email || '');
        const telEls = document.querySelectorAll('.profile-value.tel');
        if (telEls.length) telEls.forEach(el => el.textContent = user.phone || '');
        const sexEls = document.querySelectorAll('.profile-value.sex');
        if (sexEls.length) sexEls.forEach(el => el.textContent = (user.gender || ''));
    }catch(err){
        console.warn('Could not load profile', err);
    }
});
