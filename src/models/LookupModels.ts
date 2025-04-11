// export interface HinhThucGiaoHangModel {
//     maHinhThucGiaoHang: number;
//     tenHinhThucGiaoHang: string;
//     moTa: string;
//     chiPhiGiaoHang: number;
// }
//
// export interface HinhThucThanhToanModel {
//     maHinhThucThanhToan: number; // Sửa tên key nếu BE khác
//     tenHinhThucThanhToan: string; // Sửa tên key nếu BE khác
//     moTa: string;
//     chiPhiThanhToan: number; // Sửa tên key nếu BE khác
// }

// src/models/LookupModels.ts
export interface HinhThucGiaoHangModel {
    maHinhThucGiaoHang: number;
    tenHinhThucGiaoHang: string;
    moTa: string;
    chiPhiGiaoHang: number;
}

export interface HinhThucThanhToanModel {
    // === SỬA CÁC KEY Ở ĐÂY cho khớp với JSON API ===
    maHinhThucGiaoHang: number; // ID đang trả về với key này
    tenHinhThucGiaoHang: string; // Tên đang trả về với key này
    moTa: string;                // Key này đúng rồi
    chiPhiGiaoHang: number;    // Phí đang trả về với key này
    // === KẾT THÚC SỬA ===

    // Bạn có thể thêm các trường khác nếu API trả về, ví dụ:
    // danhSachDonHang?: any[]; // Nếu không dùng thì có thể bỏ qua
}