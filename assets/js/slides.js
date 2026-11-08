/* ===== slide deck: điều hướng, mục lục, âm thanh ===== */
(function () {
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var n = slides.length, i = 0, hideT;
  var nav = document.getElementById('nav'), dots = document.getElementById('dots'),
      count = document.getElementById('count'), prev = document.getElementById('prev'),
      next = document.getElementById('next'), bar = document.getElementById('pbar'),
      menu = document.getElementById('menu'), list = document.getElementById('mlist'),
      snd = document.getElementById('sound');
  var muted = (function () { try { return localStorage.getItem('cn8b5_mute') === '1'; } catch (e) { return false; } })();
  var audio = null;

  slides.forEach(function (s, k) {
    var d = document.createElement('i');
    dots.appendChild(d);
    var b = document.createElement('button');
    b.innerHTML = '<i>' + (k + 1) + '</i><span>' + (s.dataset.menu || ('Slide ' + (k + 1))) + '</span>';
    b.addEventListener('click', function () { go(k); menu.classList.remove('open'); });
    list.appendChild(b);
  });

  function paint() {
    slides.forEach(function (s, k) {
      s.classList.toggle('active', k === i);
      s.classList.toggle('prev', k < i);
    });
    [].forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === i); });
    [].forEach.call(list.children, function (b, k) { b.classList.toggle('now', k === i); });
    prev.disabled = i === 0; next.disabled = i === n - 1;
    count.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    bar.style.width = ((i + 1) / n * 100) + '%';
    try {
      var key = 'cn8b5_slides', o = JSON.parse(localStorage.getItem(key) || '{}');
      o.max = Math.max(o.max || 0, i + 1);
      o.last = i + 1;
      localStorage.setItem(key, JSON.stringify(o));
      if (i === n - 1) localStorage.setItem('cn8b5', JSON.stringify({ visited: { 4: 1, 5: 1 }, done: { 4: 1, 5: 1 } }));
    } catch (e) {}
    history.replaceState(null, '', '#s' + (i + 1));
  }
  function go(k) {
    if (k < 0 || k >= n) return;
    i = k; paint(); showNav();
  }
  function showNav() { nav.classList.remove('hide'); clearTimeout(hideT); hideT = setTimeout(function () { nav.classList.add('hide'); }, 3200); }

  function setMuted(m) {
    muted = !!m;
    try { localStorage.setItem('cn8b5_mute', muted ? '1' : '0'); } catch (e) {}
    snd.innerHTML = muted ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5 6 9H2v6h4l5 4z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>'
                        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
    snd.setAttribute('aria-label', muted ? 'Bật âm thanh' : 'Tắt âm thanh');
    if (muted && audio) { audio.pause(); audio = null; }
    document.querySelectorAll('audio,video').forEach(function (x) { try { x.muted = muted; } catch (e) {} });
  }
  function say(key) {
    if (muted) return;
    if (audio) { audio.pause(); audio = null; }
    audio = new Audio('assets/audio/' + key + '.mp3');
    audio.play().catch(function () {});
  }

  prev.addEventListener('click', function () { go(i - 1); });
  next.addEventListener('click', function () { go(i + 1); });
  document.getElementById('home').addEventListener('click', function () { menu.classList.add('open'); });
  document.getElementById('mclose').addEventListener('click', function () { menu.classList.remove('open'); });
  menu.addEventListener('click', function (e) { if (e.target === menu) menu.classList.remove('open'); });
  snd.addEventListener('click', function () { setMuted(!muted); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(i - 1); }
    if (e.key === 'Home') go(0);
    if (e.key === 'End') go(n - 1);
    if (e.key === 'Escape') menu.classList.remove('open');
  });
  document.addEventListener('mousemove', showNav);
  document.addEventListener('touchstart', function (e) { showNav(); var x = e.touches[0].clientX, y = e.touches[0].clientY;
    document.addEventListener('touchend', function (ev) {
      var dx = ev.changedTouches[0].clientX - x, dy = ev.changedTouches[0].clientY - y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1));
    }, { once: true });
  }, { passive: true });

  document.querySelectorAll('[data-say]').forEach(function (b) {
    b.addEventListener('click', function () { say(b.dataset.say); });
  });
  document.querySelectorAll('[data-go]').forEach(function (b) {
    b.addEventListener('click', function () { go(+b.dataset.go - 1); });
  });
  document.querySelectorAll('[data-menu-go]').forEach(function (b) {
    b.addEventListener('click', function () { go(+b.dataset.menuGo - 1); });
  });

  var start = 0;
  var m = (location.hash || '').match(/s(\d+)/);
  if (m) start = Math.min(n - 1, Math.max(0, +m[1] - 1));
  setMuted(muted);
  go(start);
  window.SL = { go: go, say: say, get index() { return i; }, setMuted: setMuted };
})();
