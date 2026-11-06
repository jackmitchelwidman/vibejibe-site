/* Visit statistics for vibejibe.me and the public pages of app.vibejibe.me, through Google Analytics.
   In Europe nothing is loaded and nothing is sent until the visitor clicks Allow. A visitor whose
   browser sends the Global Privacy Control signal is never counted. Pages queue events with
   (window.vjq = window.vjq || []).push(['event', 'sign_up']). */
(function () {
  var ID = 'G-4VHVZFN849';
  if (!/(^|\.)vibejibe\.me$/.test(location.hostname)) return;  // previews and local copies are not counted
  var q = window.vjq = window.vjq || [];

  function choice(v) {
    if (v === undefined) { var m = document.cookie.match(/(?:^|; )vj_analytics=(yes|no)/); return m ? m[1] : null; }
    document.cookie = 'vj_analytics=' + v + '; max-age=31536000; path=/; domain=.vibejibe.me; SameSite=Lax; Secure';
  }

  function start() {
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('js', new Date());
    gtag('config', ID);
    function send(e) {
      if (!e || e[0] !== 'event') return;
      try {  // a reload of the same page does not count the same sign-up twice
        if (sessionStorage.getItem('vj_ev_' + e[1])) return;
        sessionStorage.setItem('vj_ev_' + e[1], '1');
      } catch (x) {}
      gtag('event', e[1], e[2] || {});
    }
    for (var i = 0; i < q.length; i++) send(q[i]);
    q.push = function (e) { send(e); return 0; };
  }

  function ask() {
    var b = document.createElement('div');
    b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Visit statistics');
    b.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:50;max-width:560px;margin:0 auto;padding:16px 18px;' +
      'background:#141826;border:1px solid #2a3047;border-radius:14px;color:#c9d1e6;font:14px/1.5 "Helvetica Neue",Helvetica,Arial,sans-serif;' +
      'box-shadow:0 18px 40px rgba(0,0,0,.55)';
    var p = document.createElement('p'); p.style.cssText = 'margin:0 0 12px;color:#c9d1e6;font-size:14px;letter-spacing:0;text-transform:none';
    p.appendChild(document.createTextNode('May VibeJibe count your visit with Google Analytics? It sets cookies and tells us which pages people read. '));
    var a = document.createElement('a'); a.href = location.hostname === 'app.vibejibe.me' ? 'https://app.vibejibe.me/privacy' : 'https://vibejibe.me/privacy/'; a.textContent = 'Privacy policy'; a.style.color = '#8f9cf5';
    p.appendChild(a);
    function btn(label, primary, fn) {
      var x = document.createElement('button'); x.type = 'button'; x.textContent = label;
      x.style.cssText = 'margin:0 10px 0 0;width:auto;padding:8px 18px;border-radius:999px;font:inherit;font-size:13px;letter-spacing:.06em;cursor:pointer;' +
        (primary ? 'background:#e6eaf5;color:#0b0d12;border:1px solid #e6eaf5' : 'background:transparent;color:#c9d1e6;border:1px solid #2a3047');
      x.onclick = function () { b.remove(); fn(); }; return x;
    }
    b.appendChild(p);
    b.appendChild(btn('Allow', true, function () { choice('yes'); start(); }));
    b.appendChild(btn('No thanks', false, function () { choice('no'); }));
    (document.body || document.documentElement).appendChild(b);
  }

  if (navigator.globalPrivacyControl || choice() === 'no') return;
  var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  var europe = /^(Europe\/|Arctic\/|Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe))/.test(tz);
  if (!europe || choice() === 'yes') return start();
  if (document.body) ask(); else document.addEventListener('DOMContentLoaded', ask);
})();
