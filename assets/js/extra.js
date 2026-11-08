/* ===== Bổ sung: popup ảnh, nhấp nháy, kẻ viền, tim, hiệu ứng ===== */
(function () {
  function q(s, r) { return (r || document).querySelector(s); }
  function qa(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }

  /* ---------- popup ảnh với dấu X lớn ---------- */
  var lb = document.createElement('div');
  lb.id = 'lb';
  lb.innerHTML = '<button class="x" aria-label="Đóng">✕</button><img alt="Hình phóng to">';
  document.body.appendChild(lb);
  var lbImg = q('img', lb);
  function openLB(src) { lbImg.src = src; lb.classList.add('open'); }
  function closeLB() { lb.classList.remove('open'); lbImg.src = ''; }
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('x')) closeLB(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLB(); });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.region') || e.target.closest('.mark') || e.target.closest('a,button')) return;
    var img = e.target.closest('.figbox img, [data-zoom]');
    if (img) { e.preventDefault(); openLB(img.getAttribute('src') || img.dataset.zoom); }
  });
  qa('.figbox img').forEach(function (i) { i.classList.add('zoomable'); });

  /* ---------- hiệu ứng ---------- */
  /* nhận xét ngắn khi trả lời */
  var lastSp = null;
  function speak(k) {
    try { if (localStorage.getItem('cn8b5_mute') === '1') return; } catch (e) {}
    try {
      if (lastSp) { try { lastSp.pause(); } catch (e) {} }
      lastSp = new Audio('assets/audio/' + k + '.mp3'); lastSp.volume = .9;
      var p = lastSp.play(); if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  var cv = document.createElement('canvas'); cv.id = 'fx'; document.body.appendChild(cv);
  var ctx = cv.getContext('2d'), parts = [], raf = null;
  function size() { cv.width = innerWidth; cv.height = innerHeight; }
  addEventListener('resize', size); size();
  var COLORS = ['#ff8a00', '#ff5d3b', '#2e75b6', '#1f9d55', '#ffd166', '#e85d75'];
  function ok() {
    speak(pick(['ok1', 'ok2']));
    for (var i = 0; i < 70; i++) parts.push({
      x: innerWidth / 2 + (Math.random() - .5) * 240, y: innerHeight * .28,
      vx: (Math.random() - .5) * 7, vy: Math.random() * -9 - 2,
      s: 5 + Math.random() * 7, c: COLORS[i % COLORS.length], r: Math.random() * 6, life: 90
    });
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(function (p) { return p.life > 0 && p.y < cv.height + 40; });
    parts.forEach(function (p) {
      p.vy += .28; p.x += p.vx; p.y += p.vy; p.r += .12; p.life--;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); ctx.restore();
    });
    if (parts.length) raf = requestAnimationFrame(tick); else { raf = null; ctx.clearRect(0, 0, cv.width, cv.height); }
  }
  var ac = null;
  function bad() {
    speak(pick(['bad1', 'bad2']));
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sawtooth'; o.frequency.value = 150;
      g.gain.value = .12; o.connect(g); g.connect(ac.destination);
      o.start(); o.frequency.setValueAtTime(120, ac.currentTime + .12);
      o.stop(ac.currentTime + .26);
    } catch (e) {}
  }
  window.FX = { ok: ok, bad: bad };

  /* quẹt đáp án -> hiệu ứng */
  document.addEventListener('click', function (e) {
    var o = e.target.closest('.opt'); if (!o) return;
    setTimeout(function () {
      if (o.classList.contains('ok')) ok();
      else if (o.classList.contains('bad')) bad();
    }, 10);
  });

  /* ---------- chỉ nhấp nháy nút Tiến khi đã xong nhiệm vụ ---------- */
  function armNext(slide) {
    if (!slide || !slide.classList.contains('active')) return;
    var nx = document.getElementById('next');
    if (!nx) return;
    nx.classList.remove('blink');
    void nx.offsetWidth;
    nx.classList.add('blink');
    clearTimeout(nx._bt);
    nx._bt = setTimeout(function () { nx.classList.remove('blink'); }, 4200);
  }

  /* ---------- chạy theo từng slide ---------- */
  function visible(slide) {
    // nhấp nháy nút tiến
    var nx = document.getElementById('next');
    if (nx) nx.classList.remove('blink');
    // chuỗi nhấn mạnh
    var seq = slide.getAttribute('data-seq');
    if (seq) {
      var els = qa(seq, slide);
      els.forEach(function (el) { el.classList.remove('pulse'); });
      els.forEach(function (el, k) { setTimeout(function () { el.classList.add('pulse'); }, 350 * k); });
    }
  }
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      if (m.target.classList && m.target.classList.contains('active')) visible(m.target);
    });
  });
  qa('.slide').forEach(function (s) { mo.observe(s, { attributes: true, attributeFilter: ['class'] }); });

  /* ---------- vùng kẻ viền: bấm -> câu hỏi ---------- */
  document.addEventListener('click', function (e) {
    var r = e.target.closest('.region'); if (!r) return;
    var slide = r.closest('.slide');
    qa('.region', slide).forEach(function (x) { x.classList.remove('on'); });
    r.classList.add('on');
    r.dataset.v = '1';
    var regions = qa('.region', slide);
    if (regions.length && regions.every(function (x) { return x.dataset.v === '1'; })) armNext(slide);
    var bar = q('.qask', slide);
    if (!bar) {
      var fb = q('.figbox', slide);
      if (!fb) return;
      bar = document.createElement('div'); bar.className = 'qask';
      bar.innerHTML = '<b class="qt"></b><div class="opts"></div>';
      fb.parentNode.insertBefore(bar, fb.nextSibling);
    }
    q('.qt', bar).textContent = r.dataset.q || 'Vùng này là gì?';
    var box = q('.opts', bar); box.innerHTML = '';
    if (!r.dataset.opts) return;
    var ans = +(r.dataset.a || 1);
    (r.dataset.opts || '').split('|').forEach(function (t, i) {
      var b = document.createElement('button'); b.className = 'opt'; b.textContent = t;
      b.addEventListener('click', function () {
        qa('.opt', box).forEach(function (x) { x.classList.remove('ok', 'bad'); });
        b.classList.add(i + 1 === ans ? 'ok' : 'bad');
      });
      box.appendChild(b);
    });
  });

  /* ---------- trả lời hết câu hỏi thì mời chuyển slide ---------- */
  document.addEventListener('click', function (e) {
    var o = e.target.closest('.opt'); if (!o) return;
    setTimeout(function () {
      var slide = o.closest('.slide'); if (!slide) return;
      var qs = qa('.q', slide);
      if (qs.length && qs.every(function (q) { return q.dataset.done === '1'; })) armNext(slide);
    }, 40);
  });

  /* ---------- chấm bài / kéo thả đạt thì mời chuyển slide ---------- */
  ['check', 'dndcheck'].forEach(function (id) {
    var b = document.getElementById(id);
    if (!b) return;
    b.addEventListener('click', function () {
      setTimeout(function () {
        var sc = document.getElementById(id === 'check' ? 'score' : 'dndscore');
        if (!sc) return;
        var t = sc.textContent || '';
        if (/Đạt|Hoàn thành|6\/6/.test(t)) armNext(b.closest('.slide'));
      }, 80);
    });
  });

  /* ---------- thẻ thả tim (slide 4) ---------- */
  document.addEventListener('click', function (e) {
    var c = e.target.closest('.hcard'); if (!c || c.classList.contains('got')) return;
    c.classList.add('got');
    var slide = c.closest('.slide');
    var all = qa('.hcard', slide);
    if (all.every(function (x) { return x.classList.contains('got'); })) {
      var bar = q('.saydone', slide); if (bar) bar.hidden = false;
      armNext(slide);
    }
  });
  /* ---------- tự đánh giá (slide 15) ---------- */
  document.addEventListener('click', function (e) {
    var l = e.target.closest('.lv'); if (!l) return;
    var rb = l.closest('.rb'); if (!rb) return;
    rb.querySelectorAll('.lv').forEach(function (x) { x.classList.remove('on'); });
    l.classList.add('on'); rb.dataset.v = l.dataset.v;
    var rows = qa('.rb');
    var done = rows.filter(function (r) { return r.dataset.v; }).length;
    var n3 = rows.filter(function (r) { return r.dataset.v === '3'; }).length;
    var el = document.getElementById('rbsum');
    if (el) {
      if (done < rows.length) el.textContent = 'Đã chọn ' + done + '/' + rows.length + ' tiêu chí.';
      else if (n3 >= 4) el.textContent = 'Em đã sẵn sàng cho bài tiếp theo. (Tự tin ' + n3 + '/5)';
      else if (n3 >= 2) el.textContent = 'Em xem lại phần còn chưa chắc rồi tự đánh giá lại nhé. (Tự tin ' + n3 + '/5)';
      else el.textContent = 'Em nên học lại các chặng 1–5 rồi tự đánh giá lại. (Tự tin ' + n3 + '/5)';
    }
    if (done === rows.length) armNext(document.querySelector('.slide.active'));
  });
})();

/* ===== fit-text: tự thu nhỏ chữ cho vừa khung, không khuất ===== */
(function () {
  function fit(el) {
    if (!el) return;
    el.style.fontSize = '';
    var body = el.closest('.body'); if (!body) return;
    var max = parseFloat(getComputedStyle(el).fontSize) || 15;
    var fs = max, bottom = body.getBoundingClientRect().bottom;
    while (fs > 10 && el.getBoundingClientRect().bottom > bottom - 2) {
      fs -= 1; el.style.fontSize = fs + 'px';
    }
  }
  function fitAll() {
    document.querySelectorAll('.qask .qt, .lead, .legend li span, .hcard span').forEach(fit);
  }
  window.addEventListener('resize', fitAll);
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      if (m.target.classList && m.target.classList.contains('active')) setTimeout(fitAll, 80);
    });
  });
  document.querySelectorAll('.slide').forEach(function (s) { mo.observe(s, { attributes: true, attributeFilter: ['class'] }); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(fitAll, 120); });
  else setTimeout(fitAll, 120);
})();

/* ===== Kéo thả thật cho slide phân loại ===== */
setTimeout(function () {
  var chips = document.querySelectorAll('#chips .chip');
  chips.forEach(function (ch) {
    ch.setAttribute('draggable', 'true');
    ch.addEventListener('dragstart', function () { window.__dragChip = ch; });
    ch.addEventListener('dragend', function () { window.__dragChip = null; });
  });
  document.querySelectorAll('#cols .col').forEach(function (col) {
    col.addEventListener('dragover', function (e) { e.preventDefault(); col.classList.add('over'); });
    col.addEventListener('dragleave', function () { col.classList.remove('over'); });
    col.addEventListener('drop', function (e) {
      e.preventDefault(); col.classList.remove('over');
      var ch = window.__dragChip;
      if (ch) { ch.click(); col.click(); }
      window.__dragChip = null;
    });
  });
  var r = document.getElementById('dndreset');
  if (r) r.addEventListener('click', function () {
    document.querySelectorAll('#cols .drop').forEach(function (d) { d.remove(); });
    document.querySelectorAll('#chips .chip').forEach(function (c) { c.classList.remove('done', 'sel'); });
    var sc = document.getElementById('dndscore');
    if (sc) { sc.textContent = '0/6 đúng'; sc.style.color = '#1c3a5e'; }
  });
}, 250);
