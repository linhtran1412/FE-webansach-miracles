import React, { FormEvent, useState } from "react";
import { themDonHang, capNhatDonHang } from "../../API/DonHangAPI"; // Đảm bảo file import đúng
import DonHangModel from "../../models/DonHangModel";

const DonHangForm: React.FC = () => {
    const [donHang, setDonHang] = useState<DonHangModel>({
        maDonHang: 0,
        ngayTao: "",
        diaChiMuaHang: "",
        diaChiNhanHang: "",
        tongTienSanPham: 0,
        chiPhiGiaoHang: 0,
        chiPhiThanhToan: 0,
        tongTien: 0,
        nguoiDung: {
            maNguoiDung: parseInt(localStorage.getItem("userId") || "1"), // Lấy ID từ localStorage
        },
        danhSachChiTietDonHang: [],
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log("🟢 Dữ liệu gửi:", donHang); // Debug

        try {
            let response;
            if (donHang.maDonHang === 0) {
                response = await themDonHang(donHang);
                console.log("✅ Đã thêm đơn hàng:", response);
                alert("Đã thêm đơn hàng thành công!");
            } else {
                response = await capNhatDonHang(donHang);
                console.log("✅ Đã cập nhật đơn hàng:", response);
                alert("Cập nhật đơn hàng thành công!");
            }
        } catch (error) {
            console.error("❌ Lỗi khi gửi đơn hàng:", error);
            alert("Lỗi khi gửi đơn hàng. Vui lòng kiểm tra console.");
        }
    };

    return (
        <div className="container">
            <h1>{donHang.maDonHang === 0 ? "Thêm Đơn Hàng" : "Cập Nhật Đơn Hàng"}</h1>
            <form onSubmit={handleSubmit}>
                <label>Ngày tạo:</label>
                <input
                    type="date"
                    value={donHang.ngayTao}
                    onChange={(e) => setDonHang({ ...donHang, ngayTao: e.target.value })}
                    required
                />

                <label>Địa chỉ mua hàng:</label>
                <input
                    type="text"
                    value={donHang.diaChiMuaHang}
                    onChange={(e) => setDonHang({ ...donHang, diaChiMuaHang: e.target.value })}
                    required
                />

                <label>Địa chỉ nhận hàng:</label>
                <input
                    type="text"
                    value={donHang.diaChiNhanHang}
                    onChange={(e) => setDonHang({ ...donHang, diaChiNhanHang: e.target.value })}
                    required
                />

                <label>Tổng tiền sản phẩm:</label>
                <input
                    type="number"
                    value={donHang.tongTienSanPham}
                    onChange={(e) => setDonHang({ ...donHang, tongTienSanPham: parseFloat(e.target.value) })}
                    required
                />
                <button type="submit">Lưu</button>
            </form>
        </div>
    );
};

export default DonHangForm;