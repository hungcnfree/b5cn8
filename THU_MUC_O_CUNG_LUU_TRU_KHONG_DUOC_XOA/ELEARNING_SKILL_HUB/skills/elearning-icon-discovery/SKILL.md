---
name: elearning-icon-discovery
description: Tự tìm kiếm, lựa chọn, tải và tái sử dụng icon phù hợp nội dung bài giảng.
---
# Quy tắc
Ưu tiên kho icon nội bộ, sau đó Iconify https://icon-sets.iconify.design/ và API https://api.iconify.design. Tìm theo nghĩa chức năng bằng từ khóa tiếng Anh, ví dụ notebook, memo, pencil, notepad edit, lightbulb, trophy, rotate, zoom, speaker. API tìm: GET /search?query=notebook&limit=32; có thể giới hạn prefix theo tài liệu https://iconify.design/docs/api/search.html. Lấy SVG GET /{prefix}/{icon}.svg sau khi xác nhận ID tồn tại. Không tự đặt ID hoặc tuyên bố đã tải nếu chưa kiểm tra HTTP và nội dung.
# Chọn phong cách
Điều khiển: Lucide (đã duyệt) hoặc Phosphor duotone khi phù hợp; hoạt động học tập: Microsoft Fluent Emoji 3D hoặc flat. Giữ nhất quán trong từng nhóm, không trộn tùy tiện. Tham khảo https://github.com/microsoft/fluentui-emoji và https://phosphoricons.com/. Iconify là cổng tìm kiếm không phải giấy phép chung; kiểm tra giấy phép từng bộ, lưu copyright/license theo yêu cầu.
# Ghi vở
Ứng viên tìm kiếm: fluent-emoji:memo, fluent-emoji:spiral-notepad, ph:notebook-duotone, lucide:notebook-pen. Xác minh ID và hình ảnh trước khi chọn. Ưu tiên cuốn sổ+bút có màu sắc, nút gọn, không khối cam lớn. Nhãn nhỏ Ghi vở hoặc tooltip, aria-label và focus rõ; vùng nhấn tối thiểu 44 CSS px; phím Enter/Space mở popup, Escape đóng, trả focus. Không tự mở hoặc nhấp nháy liên tục. Có ở slide 4,5,6,7,9,11; slide 15 sổ tay tổng hợp (đề xuất chờ duyệt nội dung). Tạm dừng âm thanh khi mở.
# Tự động hóa
1. Kiểm tra manifest/cache theo semantic key.
2. Tìm 3-5 ứng viên theo chức năng và bộ đã chọn.
3. Xem hình thực, kiểm tra tính dễ hiểu, tương phản, kích thước và license.
4. Tải SVG/PNG vào assets/icons/ theo tên chức năng; kiểm tra SVG an toàn, loại script, external references, event handlers; không thực thi nội dung tải về.
5. Ghi manifest gồm semantic key, icon ID, nguồn, giấy phép, phiên bản, đường dẫn, ngày tải, thay đổi.
6. Nhúng asset cục bộ, không phụ thuộc API/CDN lúc học; không gửi dữ liệu học sinh vào API. Giữ dự phòng nhãn văn bản.
7. Kiểm thử hiển thị 16:9, cảm ứng, bàn phím, mạng mất, popup. Ghi kinh nghiệm sau khi xác minh.
# Trạng thái
Tiêu chuẩn mới ngày 2026-11-25; chưa tải icon hoặc triển khai trình tìm kiếm tự động trong bài giảng.
