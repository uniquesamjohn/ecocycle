// Lightweight fetch wrapper for Ecocycle frontend
;(function(){
  const API_BASE = (function(){
    if (window.ECO_API_BASE) return window.ECO_API_BASE;
    // Default to hosted backend on Render
    return 'https://ecocycle-techyjaunt.onrender.com/api';
  })();

  async function apiFetch(path, opts = {}){
    const url = API_BASE + path;
    const headers = opts.headers || {};
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    const token = localStorage.getItem('ecocycle_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const fetchOpts = Object.assign({
      method: 'GET',
      credentials: 'same-origin',
      headers
    }, opts);

    if (fetchOpts.body && typeof fetchOpts.body !== 'string' && headers['Content-Type'].includes('application/json')){
      fetchOpts.body = JSON.stringify(fetchOpts.body);
    }

    const res = await fetch(url, fetchOpts);
    let payload = null;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) payload = await res.json();
    else payload = await res.text();

    if (!res.ok) {
      const message = (payload && payload.message) || payload || `HTTP ${res.status}`;
      const err = new Error(message);
      err.status = res.status;
      err.payload = payload;
      throw err;
    }

    return payload;
  }

  // expose on window for simple script usage
  window.apiFetch = apiFetch;
  window.API_BASE = API_BASE;
})();
