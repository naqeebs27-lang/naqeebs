/* Loads components/header.html and components/footer.html into every page.
   Pages declare their depth with <html data-root="../"> (empty for the site root, "/" for 404.html). */
(function () {
  const root = document.documentElement.dataset.root || '';

  async function load(id, file) {
    const el = document.getElementById(id);
    if (!el) return null;
    try {
      const res = await fetch(root + 'components/' + file);
      if (!res.ok) throw new Error(res.status);
      el.innerHTML = (await res.text()).replaceAll('{{root}}', root);
      return el;
    } catch (err) {
      console.error('Could not load ' + file + ' (open the site through a web server, not file://)', err);
      return null;
    }
  }

  function markActive(header) {
    const here = location.pathname.replace(/index\.html$/, '');
    header.querySelectorAll('.site-nav a[href]').forEach(a => {
      if (a.target === '_blank') return;
      const path = new URL(a.getAttribute('href'), document.baseURI).pathname.replace(/index\.html$/, '');
      if (path === here) {
        a.setAttribute('aria-current', 'page');
        const sub = a.closest('.has-sub');
        if (sub) sub.querySelector('.sub-toggle').style.color = 'var(--primary-color)';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const [header, footer] = await Promise.all([load('site-header', 'header.html'), load('site-footer', 'footer.html')]);
    if (header) { markActive(header); NMS.initNav(header); }
    if (footer) footer.querySelectorAll('[data-year]').forEach(n => n.textContent = new Date().getFullYear());
  });
})();
