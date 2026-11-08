/* ===== Bài 5 – Bản vẽ nhà · tiện ích dùng chung ===== */
(function () {
  var MKEY = 'cn8b5_mute';
  var BACK = { 'chang-1.html': 'bai-hoc.html#s3', 'chang-2.html': 'bai-hoc.html#s5', 'chang-3.html': 'bai-hoc.html#s7' };
  function read(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v || d; } catch (e) { return d; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var muted = (function () { try { return localStorage.getItem(MKEY) === '1'; } catch (e) { return false; } })();
  var audio = null;

  var LN = {
    get muted() { return muted; },
    setMuted: function (m) {
      muted = !!m;
      try { localStorage.setItem(MKEY, muted ? '1' : '0'); } catch (e) {}
      var b = document.getElementById('ln-sound');
      if (b) { b.textContent = muted ? '🔇' : '🔊'; b.setAttribute('aria-label', muted ? 'Bật âm thanh' : 'Tắt âm thanh'); }
      if (muted) { LN.stop(); }
    },
    toggle: function () { LN.setMuted(!muted); },
    say: function (key) {
      if (!key || muted) return;
      if (audio) { try { audio.pause(); } catch (e) {} }
      audio = new Audio('assets/audio/' + key + '.mp3');
      audio.play().catch(function () {});
    },
    stop: function () { if (audio) { try { audio.pause(); } catch (e) {} audio = null; } },
    sayButton: function (el, key) { el.addEventListener('click', function () { LN.say(key); }); },
    done5: function () {
      write('cn8b5', { visited: { 4: 1, 5: 1 }, done: { 4: 1, 5: 1 } });
      try { localStorage.setItem('cn8b5_slides', JSON.stringify({ max: 15, last: 15 })); } catch (e) {}
    }
  };
  window.LN = LN;

  function bar() {
    var path = location.pathname.split('/').pop() || 'index.html';
    var legacy = !document.body.classList.contains('ln-page');

    if (legacy) {
      var back = BACK[path] || 'bai-hoc.html';
      var el = document.createElement('div');
      el.id = 'ln-back';
      el.innerHTML =
        '<a href="' + back + '" class="bk">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>' +
        'Quay lại bài học</a>' +
        '<a href="index.html" class="hm" title="Về trang chủ">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/></svg>' +
        '</a>';
      document.body.appendChild(el);
      return;
    }

    var bar = document.createElement('div');
    bar.id = 'ln-bar';
    var home = document.createElement('a');
    home.href = 'index.html';
    home.innerHTML = '🕷️ <span class="label">Bản vẽ nhà</span>';
    home.title = 'Về trang nhiệm vụ';
    bar.appendChild(home);
    var s = document.createElement('button');
    s.id = 'ln-sound'; s.type = 'button';
    s.addEventListener('click', function () { LN.toggle(); });
    bar.appendChild(s);
    document.body.appendChild(bar);
    LN.setMuted(muted);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bar);
  else bar();
})();
