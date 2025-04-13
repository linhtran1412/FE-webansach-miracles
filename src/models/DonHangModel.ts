// interface DonHangModel {
//     maDonHang: number;
//     ngayTao: string;
//     diaChiMuaHang: string;
//     diaChiNhanHang: string;
//     tongTienSanPham: number;
//     chiPhiGiaoHang: number;
//     chiPhiThanhToan: number;
//     tongTien: number;
//     nguoiDung: {
//         maNguoiDung: number;
//         tenDangNhap?: string; // Tùy chọn
//     };
//     hinhThucThanhToan?: {
//         maHinhThucThanhToan: number;
//         tenHinhThucThanhToan?: string;
//     };
//     hinhThucGiaoHang?: {
//         maHinhThucGiaoHang: number;
//         tenHinhThucGiaoHang?: string;
//     };
//     danhSachChiTietDonHang: ChiTietDonHangModel[];
// }
//
// interface ChiTietDonHangModel {
//     chiTietDonHang: number;
//     soLuong: number;
//     giaBan: number;
//     sach: {
//         maSach: number;
//         tenSach?: string;
//     };
// }
//
// export default DonHangModel;



// src/models/DonHangModel.ts

// Interface cho chi tiết đơn hàng (giữ nguyên hoặc sửa nếu cần)
interface ChiTietDonHangModel {
    chiTietDonHang: number; // Hoặc long nếu backend là long
    soLuong: number;
    giaBan: number;
    sach: {
        maSach: number;
        tenSach?: string;
    };
    // Thêm các trường khác của chi tiết nếu backend trả về và bạn cần dùng
}

// Interface chính cho đơn hàng
interface DonHangModel {
    maDonHang: number;
    ngayTao: string; // Hoặc Date nếu bạn muốn parse
    diaChiMuaHang?: string; // Có thể optional nếu API không luôn trả về
    diaChiNhanHang?: string; // Có thể optional
    tongTienSanPham?: number; // Có thể optional
    chiPhiGiaoHang?: number; // Có thể optional
    chiPhiThanhToan?: number; // Có thể optional
    tongTien: number;

    // === THÊM TRƯỜNG trangThai VÀO ĐÂY ===
    trangThai?: string; // Thêm dấu ? để là optional, phòng trường hợp API đôi khi không trả về
    // === KẾT THÚC THÊM ===

    // Giữ nguyên các đối tượng lồng nhau nếu API trả về
    nguoiDung?: { // Có thể optional
        maNguoiDung: number;
        tenDangNhap?: string;
    };
    hinhThucThanhToan?: {
        maHinhThucThanhToan: number; // Kiểm tra lại tên key nếu API trả về khác
        tenHinhThucThanhToan?: string;
    };
    hinhThucGiaoHang?: {
        maHinhThucGiaoHang: number;
        tenHinhThucGiaoHang?: string;
    };
    // Đảm bảo danh sách chi tiết được trả về từ API /my-orders
    danhSachChiTietDonHang?: ChiTietDonHangModel[]; // Có thể optional nếu API không trả về chi tiết ở list view
}


export default DonHangModel;
// Xuất cả ChiTietDonHangModel nếu cần dùng ở nơi khác
export type { ChiTietDonHangModel };