// src/dto/SachSimpleDTO.ts
// Interface này định nghĩa cấu trúc dữ liệu đơn giản cho sách
// mà API /api/yeu-thich trả về, tránh lỗi JSON lặp vô hạn.
export interface SachSimpleDTO {
    maSach: number;
    tenSach?: string; // Dùng ? nếu có thể null
    giaBan?: number;  // Dùng ? nếu có thể null
    hinhAnhDaiDien?: string; // Base64 hoặc URL ảnh
    // Thêm các trường khác nếu API trả về và bạn cần dùng
}
