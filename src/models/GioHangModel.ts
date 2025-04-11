import ChiTietGioHangModel from "./ChiTietGioHangModel";

interface GioHangModel {
    maGioHang: number;
    maNguoiDung: number;
    danhSachChiTietGioHang: ChiTietGioHangModel[];
    tongTien: number;
}
export default GioHangModel;