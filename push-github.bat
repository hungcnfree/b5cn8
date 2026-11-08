@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ==================================================
echo    ĐẨY BÀI GIẢNG LÊN GITHUB  (GitHub Pages)
echo ==================================================
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo [LỖI] Máy chưa cài Git.
  echo Tải tại: https://git-scm.com/download/win
  pause
  exit /b 1
)

echo Thư mục hiện tại: %cd%
echo.

if not exist ".git" (
  echo [1/5] Khởi tạo git...
  git init
  git branch -M main
) else (
  echo [1/5] Đã có .git, dùng lại.
)

echo.
set "REPO="
set /p REPO=Nhập link repo GitHub (vd: https://github.com/ten/repo.git): 
if "%REPO%"=="" (
  echo [LỖI] Bạn chưa nhập link repo.
  pause
  exit /b 1
)

echo.
echo [2/5] Gắn remote origin...
git remote remove origin >nul 2>nul
git remote add origin "%REPO%"
if errorlevel 1 (
  echo [LỖI] Không gắn được remote. Kiểm tra lại link.
  pause
  exit /b 1
)

echo.
echo [3/5] Thêm tệp...
git add -A
if errorlevel 1 goto :fail

echo.
echo [4/5] Commit...
set "MSG="
set /p MSG=Mô tả thay đổi (Enter để dùng mặc định): 
if "%MSG%"=="" set "MSG=Cập nhật bài giảng Công nghệ 8 - Bài 5 Bản vẽ nhà"
git commit -m "%MSG%"
if errorlevel 1 echo   (Không có thay đổi mới, bỏ qua commit)

echo.
echo [5/5] Đẩy lên GitHub...
git branch -M main
git push -u origin main
if errorlevel 1 goto :pushfail

echo.
echo ==================================================
echo   THÀNH CÔNG! Đã đẩy lên: %REPO%
echo ==================================================
echo Bước cuối trên GitHub:
echo   Settings -^> Pages -^> Branch: main / (root) -^> Save
echo Sau ~1 phút, link dạng: https://<tài-khoản>.github.io/<repo>/
echo.
pause
exit /b 0

:pushfail
echo.
echo [LỖI] Push thất bại.
echo Kiểm tra: đã đăng nhập GitHub? repo tồn tại và bạn có quyền ghi?
echo Thử chạy tay:  git push -u origin main
pause
exit /b 1

:fail
echo.
echo [LỖI] Lệnh git thất bại.
pause
exit /b 1
