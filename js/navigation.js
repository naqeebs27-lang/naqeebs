/* Mobile menu + dropdowns. Called by main.js once header.html has been injected. */
window.NMS = window.NMS || {};
NMS.initNav = function (header) {
  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('.site-nav');
  const subs = header.querySelectorAll('.has-sub');
  const closeSubs = () => subs.forEach(s => { s.classList.remove('open'); s.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false'); });
  const closeAll = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); closeSubs(); };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  subs.forEach(s => {
    const btn = s.querySelector('.sub-toggle');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const wasOpen = s.classList.contains('open');
      closeSubs();
      s.classList.toggle('open', !wasOpen);
      btn.setAttribute('aria-expanded', String(!wasOpen));
    });
  });
  document.addEventListener('click', e => { if (!header.contains(e.target)) closeAll(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeAll(); toggle.focus(); } });
  window.matchMedia('(min-width: 993px)').addEventListener('change', closeAll);
};
