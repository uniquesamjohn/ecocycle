document.addEventListener('DOMContentLoaded', async function(){
    // Load api helper if missing
    if (!window.apiFetch){
        const s = document.createElement('script');
        s.src = '../shared/api.js';
        document.head.appendChild(s);
        await new Promise((r,rej)=>{s.onload=r;s.onerror=rej});
    }

    try{
        const res = await window.apiFetch('/auth/me');
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
