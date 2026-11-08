/* ===== Thoại thuyết trình tự động cho từng slide ===== */
(function () {
  var all = [].slice.call(document.querySelectorAll('.slide'));
  var cur = null, lastIdx = 0;

  function muted() {
    try { return localStorage.getItem('cn8b5_mute') === '1'; } catch (e) { return false; }
  }
  function narrate(slide) {
    if (!slide || muted()) return;
    var i = all.indexOf(slide) + 1;
    if (i < 1) return;
    if (i === lastIdx && cur && !cur.paused) return;
    lastIdx = i;
    var src = 'assets/audio/n' + ('0' + i).slice(-2) + '.mp3';
    if (cur) { try { cur.pause(); } catch (e) {} }
    cur = new Audio(src);
    cur.volume = 0.96;
    var p = cur.play();
    if (p && p.catch) p.catch(function () {});
  }

  // phát thoại khi slide được kích hoạt
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      if (m.target.classList && m.target.classList.contains('active')) narrate(m.target);
    });
  });
  all.forEach(function (s) { mo.observe(s, { attributes: true, attributeFilter: ['class'] }); });

  // mồi thoại bằng thao tác đầu tiên (trình duyệt chặn tự phát)
  var primed = false;
  document.addEventListener('click', function () {
    if (primed) return; primed = true;
    narrate(document.querySelector('.slide.active'));
  }, { once: true });

  // nút nghe lại
  var ctrl = document.querySelector('.ctrl');
  if (ctrl) {
    var b = document.createElement('button');
    b.id = 'replay'; b.type = 'button'; b.title = 'Nghe lại thoại slide này';
    b.setAttribute('aria-label', 'Nghe lại thoại');
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>';
    b.addEventListener('click', function () { narrate(document.querySelector('.slide.active')); });
    var cnt = ctrl.querySelector('.count');
    ctrl.insertBefore(b, cnt || null);
  }

  // tắt tiếng thì dừng thoại
  var snd = document.getElementById('sound');
  if (snd) snd.addEventListener('click', function () {
    if (muted() && cur) { try { cur.pause(); } catch (e) {} }
  });
})();
