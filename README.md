# Bài 5 – Bản vẽ nhà · E-learning (Công nghệ 8, KNTT)

Bài giảng tĩnh, không build, đưa lên GitHub Pages là chạy. **15 slide, không cuộn trang**, có tiếng nói, 2 video ngắn ở phần Mở rộng và 3 hoạt động tương tác.

## Cấu trúc

```
site/
├─ index.html            Trang nhiệm vụ (vào bài, 3 hoạt động)
├─ bai-hoc.html          Bài học 15 slide (trang chính)
├─ chang-1.html          Hoạt động: Thợ nhện công trường
├─ chang-2.html          Hoạt động: Khám phá 3D ba hình biểu diễn
├─ chang-3.html          Hoạt động: Đại chiến Tơ Nhện (kí hiệu)
├─ chang-4.html          Chuyển hướng → bai-hoc.html#s9
├─ chang-5.html          Chuyển hướng → bai-hoc.html#s10
├─ assets/css/lesson.css Giao diện trang hub
├─ assets/css/slides.css Giao diện slide + thanh điều hướng
├─ assets/css/extra.css  Lightbox, kẻ viền, thẻ tim, nhấp nháy
├─ assets/js/lesson.js   Tiến độ, nút loa (trang hub)
├─ assets/js/slides.js   Điều hướng slide, mục lục, phím, vuốt
├─ assets/js/extra.js    Popup ảnh, vùng kẻ viền, tim, confetti/kòi
├─ assets/js/narration.js Thoại tự động mỗi slide, nút nghe lại
├─ KICH-BAN-THOAI.md     Kịch bản thoại 15 slide + ghi chú chuyển slide
├─ assets/audio/*.mp3    27 clip thoại (15 slide + 8 hướng dẫn + 4 nhận xét đáp án), giọng nữ Trúc Ly
├─ assets/img/sgk-1..4.jpg  Ảnh trang SGK
├─ assets/img/h51.jpg, h52.jpg, b52.jpg  Ảnh sạch do giáo viên cung cấp
├─ .nojekyll
└─ README.md
```

## 15 slide

1. Bìa · 2. Mục tiêu · 3. Khởi động (Hình 5.1) · 4. I. Nội dung bản vẽ nhà · 5. Ba hình biểu diễn (Hình 5.2) · 6. II. Kí hiệu quy ước (Bảng 5.1) · 7. Nhận diện nhanh · 8. III. Trình tự đọc (Bảng 5.2) · 9. Ví dụ Hình 5.3 (bấm chấm trên hình) · 10. Thực hành Hình 5.4 (điền 8 ô) · 11. Kéo thả 3 cột · 12. Luyện tập 7 câu · 13. Vận dụng · 14. Mở rộng (2 video) · 15. Tổng kết.

Ảnh hình/bảng đã cắt riêng trong `assets/img/fig51..54.jpg`, `bang51.jpg`, `bang52.jpg`. Nếu thấy cắt lệch, mở crop.py, sửa toạ độ rồi chạy lại python crop.py.

Điều hướng: `←` `→` hoặc phím mũi tên, nút 🏠 mở mục lục, vuốt ngang trên điện thoại, nhảy trực tiếp bằng `#s1`…`#s15`.

## Xem thử

```powershell
cd site
python -m http.server 8765     # http://127.0.0.1:8765
```

## Đưa lên GitHub Pages

```powershell
cd site
git init
git add .
git commit -m "Bài 5 Bản vẽ nhà - e-learning"
git branch -M main
git remote add origin https://github.com/<tài-khoản>/<ten-repo>.git
git push -u origin main
```

Settings → Pages → Branch `main` / `/ (root)` → Save.

## Sửa nội dung

| Muốn đổi | Sửa ở đâu |
|---|---|
| Chữ trên slide | `bai-hoc.html` – tìm đúng slide (mỗi slide là một `<section class="slide">`) |
| Thứ tự / thêm slide | Copy một `<section>`, đặt `data-menu="Tên trong mục lục"`; số slide tự tính |
| Video mở rộng | `bai-hoc.html` slide 14: đổi mã sau `embed/` và ghi lại thời lượng |
| Đáp án bài thực hành | Thuộc tính `data-a="..."` trong `#fill` |
| Ảnh SGK | Thay `assets/img/sgk-1..4.jpg` |
| Màu, cỡ chữ | `assets/css/slides.css` – biến `--acc`, `--navy`, `--bg` ở đầu tệp |
| Lời thoại | Sửa `_tts.py` rồi chạy `python _tts.py` (cần CIT Voice Studio đang mở) |

## Ghi chú

- Tiến độ lưu ở `localStorage`: `cn8b5` (hub) và `cn8b5_slides`.
- Ảnh SGK: **Hình 5.3 – 15 660 × 4 500 × 6 350** (1:100); **Hình 5.4 – 14 400 × 7 000 × 4 200, tỉ lệ 1:120**. Đã đối chiếu ảnh chụp SGK, không dùng số liệu từ nguồn web.
- Thoại: mỗi slide tự phát `assets/audio/n01..n15.mp3`; trình duyệt chặn tự phát đến khi có thao tác đầu tiên, nên thoại mồi sau cú bấm đầu tiên. Nút 🔁 phát lại.
- Video dùng `youtube-nocookie.com`, không lưu bản sao; cần Internet.
- Trên điện thoại, slide có bảng dài cho phép cuộn trong khung nội dung (không cuộn toàn trang).
