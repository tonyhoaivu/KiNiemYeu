# Hoài Vũ & Hải Yến - Trang Lưu Trữ Đếm Ngày Yêu & Kỷ Niệm

Trang web đếm ngày yêu đẹp lung linh, lưu giữ nhật ký, hình ảnh và âm nhạc lãng mạn của Hoài Vũ & Hải Yến khởi đầu từ ngày **13/09/2026**.

## Hướng dẫn triển khai lên Vercel (Deploy to Vercel)

Dự án đã được cấu hình sẵn tệp `vercel.json` tối ưu cho Vite + React SPA.

### Cách 1: Triển khai qua GitHub (Khuyên dùng)
1. Đẩy mã nguồn dự án lên GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <URL-kho-chua-cua-ban>
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Nhấn **"Add New..."** > **"Project"** và chọn repository vừa đẩy lên.
4. Vercel sẽ tự động phát hiện cấu hình:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Nhấn **"Deploy"**. Trong vòng ~1 phút, trang web của bạn sẽ được xuất bản trực tuyến với tên miền miễn phí dạng `ten-du-an.vercel.app` (hoặc gắn tên miền riêng tuỳ thích).

### Cách 2: Triển khai trực tiếp bằng Vercel CLI
1. Cài đặt Vercel CLI (nếu chưa có):
   ```bash
   npm i -g vercel
   ```
2. Đăng nhập và deploy:
   ```bash
   vercel
   ```
3. Khi triển khai lên môi trường chính thức (Production):
   ```bash
   vercel --prod
   ```
