/* ===== Trò chơi: Xếp đúng trình tự đọc bản vẽ ===== */
(function () {
  var STEPS = ['Khung tên', 'Hình biểu diễn', 'Kích thước', 'Các bộ phận'];
  var box = document.getElementById('gameOrder');
  var chips = document.getElementById('gchips');
  var msg = document.getElementById('gmsg');
  var next = 1, done = false;

  function shuffle(a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; } return b; }

  function build() {
    chips.innerHTML = '';
    next = 1; done = false;
    msg.textContent = 'Bấm các bước theo đúng thứ tự: 1 → 2 → 3 → 4';
    shuffle(STEPS).forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = s;
      b.addEventListener('click', function () {
        if (done || b.classList.contains('ok')) return;
        if (s === STEPS[next - 1]) {
          b.classList.add('ok'); b.setAttribute('data-n', next); next++;
          if (next > 4) { done = true; msg.textContent = '🎉 Hoàn thành! Đúng trình tự: Khung tên → Hình biểu diễn → Kích thước → Các bộ phận.'; if (window.FX) FX.ok(); }
          else msg.textContent = 'Đúng! Còn lại ' + (5 - next) + ' bước.';
        } else {
          b.classList.add('no');
          if (window.FX) FX.bad();
          msg.textContent = 'Chưa đúng thứ tự, thử lại nhé.';
          setTimeout(function () { b.classList.remove('no'); }, 500);
        }
      });
      chips.appendChild(b);
    });
  }
  function open() { build(); box.classList.add('open'); }
  function close() { box.classList.remove('open'); }

  var gopen = document.getElementById('gopen');
  if (gopen) gopen.addEventListener('click', open);
  var gc = document.getElementById('gclose');
  if (gc) gc.addEventListener('click', close);
  if (box) box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
