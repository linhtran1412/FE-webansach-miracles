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
    maHinhThucThanhToan: number;   // ✅ ĐÚNG
    tenHinhThucThanhToan: string;  // ✅ ĐÚNG
    moTa: string;
    chiPhiThanhToan: number;       // ✅ ĐÚNG
}