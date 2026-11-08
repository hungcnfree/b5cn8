# -*- coding: utf-8 -*-
"""Crop các hình/bảng từ ảnh chụp SGK (ước lượng toạ độ, thầy/cô xem lại và chỉnh nếu lệch)."""
from PIL import Image
import os

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(HERE, 'assets', 'img')
OUT = IMG

# (file nguồn, tên ra, x0, y0, x1, y1) theo tỉ lệ 0..1
JOBS = [
    ('sgk-1.jpg', 'fig54.jpg', 0.03, 0.03, 0.97, 0.68),   # Hình 5.4 - nhà mái bằng (tr.31)
    ('sgk-2.jpg', 'fig53.jpg', 0.03, 0.03, 0.97, 0.78),   # Hình 5.3 - nhà một tầng (tr.30)
    ('sgk-2.jpg', 'bang52.jpg', 0.03, 0.52, 0.97, 0.90),  # Bảng 5.2 - trình tự đọc
    ('sgk-3.jpg', 'fig52.jpg', 0.03, 0.03, 0.97, 0.62),   # Hình 5.2 - ba hình biểu diễn (tr.29)
    ('sgk-3.jpg', 'bang51.jpg', 0.03, 0.50, 0.97, 0.88),  # Bảng 5.1 - kí hiệu quy ước
    ('sgk-4.jpg', 'fig51.jpg', 0.05, 0.20, 0.95, 0.85),   # Hình 5.1 - bốn kí hiệu (tr.28, ước lượng)
]
for src, name, x0, y0, x1, y1 in JOBS:
    p = os.path.join(IMG, src)
    if not os.path.exists(p):
        print('MISS', src); continue
    im = Image.open(p)
    w, h = im.size
    box = (int(x0*w), int(y0*h), int(x1*w), int(y1*h))
    c = im.crop(box)
    c.save(os.path.join(OUT, name), quality=85)
    print(name, c.size)
print('done')
