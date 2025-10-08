// Simple auth guard: call /api/auth/me to confirm logged-in user. If unauthorized, redirect to sign-in.
(function(){
  async function ensureAuth(){
    // Ensure apiFetch helper is available
    if (!window.apiFetch){
      try{
        var s = document.createElement('script');
        s.src = './api.js';
        document.head.appendChild(s);
        await new Promise((r,rej)=>{s.onload=r;s.onerror=rej});
      }catch(e){
        console.warn('Could not load api helper for auth-guard', e);
      }
    }

    try{
      const res = await window.apiFetch('/auth/me');
      // if user returned, we are authenticated
      if (res && res.user){
        // optionally store/refresh local user
        localStorage.setItem('ecocycle_user', JSON.stringify(res.user));
        return true;
      }
    }catch(err){
      console.warn('Auth guard: not authenticated', err && err.payload ? err.payload : err);
    }
    // not authenticated, redirect
    window.location.href = '../sign-in/index.html';
    return false;
  }

  // Run on DOMContentLoaded to avoid interfering with page load
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensureAuth);
  } else {
    ensureAuth();
  }
})();
