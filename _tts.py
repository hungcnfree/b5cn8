# -*- coding: utf-8 -*-
import json, os, urllib.request

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'audio')
os.makedirs(OUT, exist_ok=True)
API = 'http://127.0.0.1:8001/api/tts/generate'
VOICE = 'Trúc Ly'

CLIPS = {
 'nhiem-vu': "Chào các em! Cô là kỹ sư của công trường. Hôm nay, Thợ nhện nhận một nhiệm vụ đặc biệt: đọc hiểu bản vẽ nhà. Có năm chặng, mỗi chặng mở ra một mảnh ghép. Đi hết năm chặng, em sẽ tự đọc được một bản vẽ nhà đơn giản.",
 'chang4': "Chặng bốn. Muốn đọc bản vẽ, phải đi đúng thứ tự: khung tên, hình biểu diễn, kích thước, rồi các bộ phận. Trước khi vào bốn bước, em hãy xem một ngôi nhà truyền thống Việt Nam: nhà ba gian, mái ngói, hiên rộng. Người xưa không có bản vẽ, nhưng vẫn dựng nhà theo những khuôn mẫu rất chặt chẽ.",
 'buoc-1': "Bước một: khung tên. Đọc tên ngôi nhà và tỉ lệ. Tỉ lệ một chia một trăm nghĩa là mọi kích thước trên bản vẽ đều nhỏ hơn thực tế một trăm lần.",
 'buoc-2': "Bước hai: hình biểu diễn. Xem trên bản vẽ có những hình nào. Mặt đứng cho biết vẻ ngoài, mặt bằng cho biết bố cục, mặt cắt cho biết chiều cao.",
 'buoc-3': "Bước ba: kích thước. Đọc kích thước chung trước, gồm dài, rộng, cao. Rồi mới đọc kích thước từng phòng, từng bộ phận. Đừng quên đơn vị là mi-li-mét.",
 'buoc-4': "Bước bốn: các bộ phận. Đếm số phòng, số cửa đi, số cửa sổ, và các bộ phận khác như hiên, cầu thang, lan can.",
 'chang5': "Chặng năm. Đây là bản vẽ nhà mái bằng. Em hãy tự đọc theo đúng bốn bước vừa học, rồi điền kết quả vào bảng. Đúng bảy mươi phần trăm trở lên là em đã nắm bài.",
 'ket-bai': "Chúc mừng em đã hoàn thành nhiệm vụ! Nhớ năm điều: một là khái niệm bản vẽ nhà; hai là ba hình biểu diễn; ba là sáu kí hiệu quy ước; bốn là bốn bước đọc; năm là luôn đọc đúng thứ tự và đúng đơn vị.",
}

for key, text in CLIPS.items():
    body = json.dumps({'text': text, 'voice_id': VOICE, 'speed': 1.0,
                       'temperature': 0.7, 'format': 'mp3'}, ensure_ascii=False).encode('utf-8')
    req = urllib.request.Request(API, data=body, headers={'Content-Type': 'application/json; charset=utf-8'})
    with urllib.request.urlopen(req, timeout=180) as r:
        data = r.read()
        dur = r.headers.get('X-Duration-Seconds')
    path = os.path.join(OUT, key + '.mp3')
    open(path, 'wb').write(data)
    print(f'{key}.mp3  {len(data)//1024} KB  {dur}s')
print('done')
