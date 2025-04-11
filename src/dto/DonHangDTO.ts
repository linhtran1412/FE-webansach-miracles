// src/dto/DonHangDTO.ts
import { ChiTietDonHangDTO } from "./ChiTietDonHangDTO"; // Import đúng file vừa tạo

export interface DonHangDTO {
    maDonHang: number;
    ngayTao: string; // Hoặc Date
    tongTien: number;
    trangThai: string;
    danhSachChiTietDonHang: ChiTietDonHangDTO[];
}