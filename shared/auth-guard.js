// Simple auth guard: call /api/auth/me to confirm logged-in user. If unauthorized, redirect to sign-in.
(function(){
  async function ensureAuth(){
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

    try{
      const res = await callBackend('/auth/me');
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
