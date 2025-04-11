interface DonHangModel {
    maDonHang: number;
    ngayTao: string;
    diaChiMuaHang: string;
    diaChiNhanHang: string;
    tongTienSanPham: number;
    chiPhiGiaoHang: number;
    chiPhiThanhToan: number;
    tongTien: number;
    nguoiDung: {
        maNguoiDung: number;
        tenDangNhap?: string; // Tùy chọn
    };
    hinhThucThanhToan?: {
        maHinhThucThanhToan: number;
        tenHinhThucThanhToan?: string;
    };
    hinhThucGiaoHang?: {
        maHinhThucGiaoHang: number;
        tenHinhThucGiaoHang?: string;
    };
    danhSachChiTietDonHang: ChiTietDonHangModel[];
}

interface ChiTietDonHangModel {
    chiTietDonHang: number;
    soLuong: number;
    giaBan: number;
    sach: {
        maSach: number;
        tenSach?: string;
    };
}

export default DonHangModel;