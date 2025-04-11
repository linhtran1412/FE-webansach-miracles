interface ChiTietGioHangModel {
    maChiTietGioHang: number;
    soLuong: number;
    maSach: number;
    tenSach: string;
    giaBan: number;
    hinhAnh: string | null; // Đường dẫn hoặc base64
}
export default ChiTietGioHangModel;
