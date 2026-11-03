document.documentElement.classList.remove('no-js');
(function () {
  var work = document.getElementById('work');
  function lock(on) { document.body.classList.toggle('modal-open', on); if (work) work.style.zIndex = on ? 6 : 1; }

  // Category accordion: one open at a time
  var cats = document.querySelectorAll('[data-toggle]');
  function setCat(id, open) {
    var art = document.querySelector('[data-cat="' + id + '"]');
    var btn = document.querySelector('[data-toggle="' + id + '"]');
    var panel = document.getElementById('work-' + id);
    if (!art || !btn || !panel) return;
    art.setAttribute('data-open', open ? 'true' : 'false');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
  }
  cats.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-toggle');
      var opening = btn.getAttribute('aria-expanded') !== 'true';
      cats.forEach(function (b) { setCat(b.getAttribute('data-toggle'), false); });
      if (opening) {
        setCat(id, true);
        var art = btn.closest('article');
        requestAnimationFrame(function () {
          if (art && art.getBoundingClientRect().top < 0) art.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    });
  });

  // Project galleries
  var lastFocus = null;
  function openGal(id) {
    var d = document.querySelector('[data-gal="' + id + '"]');
    if (!d) return;
    lastFocus = document.activeElement;
    d.hidden = false; lock(true);
    var c = d.querySelector('[data-close]:not([aria-hidden])') || d.querySelector('[data-close]');
    if (c) c.focus();
  }
  function closeAll() {
    document.querySelectorAll('[data-gal]').forEach(function (d) { d.hidden = true; });
    var z = document.getElementById('zoom'); if (z) z.hidden = true;
    lock(false);
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
  }
  document.querySelectorAll('[data-open-gal]').forEach(function (b) {
    b.addEventListener('click', function () { openGal(b.getAttribute('data-open-gal')); });
  });
  document.querySelectorAll('[data-close],[data-zoom-close]').forEach(function (b) { b.addEventListener('click', closeAll); });

  // Full-size viewer
  var zoom = document.getElementById('zoom'), zimg = document.getElementById('zoom-img');
  document.querySelectorAll('[data-zoom]').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = b.querySelector('img'); if (!img || !zoom) return;
      lastFocus = b;
      zimg.src = img.currentSrc || img.src;
      var label = (b.getAttribute('aria-label') || '').replace(/^View full size: /, '');
      zimg.alt = label; zoom.setAttribute('aria-label', label || 'Full-size view');
      zoom.hidden = false; lock(true);
      var c = zoom.querySelector('[data-zoom-close]:last-of-type'); if (c) c.focus();
    });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  // Production-speed chart: animate only once it is actually on screen
  var stat = document.querySelector('.rkb-stat');
  if (stat) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { stat.classList.add('is-visible'); io.disconnect(); }
        });
      }, { threshold: 0.6 });
      io.observe(stat);
    } else { stat.classList.add('is-visible'); }
  }
})();
