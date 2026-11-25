---
name: elearning-smart-mc
description: Điều phối nhân vật MC trong bài giảng 3D, không che đối tượng học tập, không bị che hoặc cắt.
---
# Nguyên tắc bắt buộc
Giữ nguyên ngôi nhà, cảnh quan, số liệu, nhiệm vụ và kịch bản gốc. Đồng nhất nhân vật, giọng nói và bộ sprite giữa hoạt động 1 và 2.
# Điều phối
Tách trạng thái GUIDE, EXPLORE, REACT, RETURN, CUT_SAFE. Mỗi góc camera có vị trí dẫn giảng chính và dự phòng ngoài vùng chiếu của đối tượng, bản vẽ, nhãn kích thước và vùng điều khiển. Tính bounding box chiếu ra màn hình; kiểm tra toàn bộ sprite nằm trong viewport, không giao vùng nội dung và không bị vật thể che bằng raycast nhiều điểm. Kiểm tra lại khi camera đổi, resize, zoom, hoặc mô hình chuyển trạng thái. Dùng hysteresis để tránh đổi vị trí liên tục. Nếu không có vị trí hợp lệ, chuyển MC sang vùng HUD riêng không chồng nội dung; không dùng depthTest=false để vẽ xuyên nhà.
# Hoạt động
MC đi theo lối đi hợp lệ trong nhiệm vụ; tránh xuyên tường. Sau khi hoàn thành, dùng đường đi an toàn về điểm dẫn giảng, không teleport khi đang thấy rõ; chuyển sang idle hướng về người học, rồi thuyết trình/giải thích. Phản hồi đúng/sai kịp thời, biểu cảm vui/suy nghĩ/động viên; không cản thao tác. TTS không chồng tiếng.
# Mặt cắt
Trước khi dao/mặt phẳng cắt di chuyển, khóa bước cắt đến khi MC ra khỏi vùng quét và về điểm an toàn. Không dùng vật liệu clipping chung cho MC; loại MC khỏi nhóm hình học bị cắt, kiểm tra cả sprite, bóng và hiệu ứng tơ. Không đứng tại x=.3 hoặc trong vùng quét của mặt phẳng cắt gốc khi diễn hoạt cảnh. Giữ nguyên kịch bản dao cắt; MC có thể bắn tơ từ vị trí an toàn. Khi chuyển mặt bằng/mặt đứng, kiểm tra lại vị trí.
# Nghiệm thu
Kiểm tra góc tự do, mặt đứng, mặt bằng, mặt cắt, zoom, resize, màn hình 16:9, nhiệm vụ đi vào phòng và quay lại, đúng/sai, cửa sổ ghi vở. Đạt khi MC dẫn giảng thấy trọn vẹn, không che nhà/bản vẽ/nhãn, không bị cắt hoặc xuyên vật thể; trong khám phá có thể khuất tự nhiên ngắn nếu cần, nhưng phải có chỉ báo hoặc HUD và trở về điểm dẫn giảng. Không tuyên bố đã kiểm thử khi mới viết đặc tả.
