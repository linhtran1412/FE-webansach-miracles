// import React, { FormEvent, useState } from "react";
// import { themDonHang, capNhatDonHang } from "../../API/DonHangAPI"; // Đảm bảo file import đúng
// import DonHangModel from "../../models/DonHangModel";
//
// const DonHangForm: React.FC = () => {
//     const [donHang, setDonHang] = useState<DonHangModel>({
//         maDonHang: 0,
//         ngayTao: "",
//         diaChiMuaHang: "",
//         diaChiNhanHang: "",
//         tongTienSanPham: 0,
//         chiPhiGiaoHang: 0,
//         chiPhiThanhToan: 0,
//         tongTien: 0,
//         nguoiDung: {
//             maNguoiDung: parseInt(localStorage.getItem("userId") || "1"), // Lấy ID từ localStorage
//         },
//         danhSachChiTietDonHang: [],
//     });
//
//     const handleSubmit = async (event: FormEvent) => {
//         event.preventDefault();
//         console.log("🟢 Dữ liệu gửi:", donHang); // Debug
//
//         try {
//             let response;
//             if (donHang.maDonHang === 0) {
//                 response = await themDonHang(donHang);
//                 console.log("✅ Đã thêm đơn hàng:", response);
//                 alert("Đã thêm đơn hàng thành công!");
//             } else {
//                 response = await capNhatDonHang(donHang);
//                 console.log("✅ Đã cập nhật đơn hàng:", response);
//                 alert("Cập nhật đơn hàng thành công!");
//             }
//         } catch (error) {
//             console.error("❌ Lỗi khi gửi đơn hàng:", error);
//             alert("Lỗi khi gửi đơn hàng. Vui lòng kiểm tra console.");
//         }
//     };
//
//     return (
//         <div className="container">
//             <h1>{donHang.maDonHang === 0 ? "Thêm Đơn Hàng" : "Cập Nhật Đơn Hàng"}</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>Ngày tạo:</label>
//                 <input
//                     type="date"
//                     value={donHang.ngayTao}
//                     onChange={(e) => setDonHang({ ...donHang, ngayTao: e.target.value })}
//                     required
//                 />
//
//                 <label>Địa chỉ mua hàng:</label>
//                 <input
//                     type="text"
//                     value={donHang.diaChiMuaHang}
//                     onChange={(e) => setDonHang({ ...donHang, diaChiMuaHang: e.target.value })}
//                     required
//                 />
//
//                 <label>Địa chỉ nhận hàng:</label>
//                 <input
//                     type="text"
//                     value={donHang.diaChiNhanHang}
//                     onChange={(e) => setDonHang({ ...donHang, diaChiNhanHang: e.target.value })}
//                     required
//                 />
//
//                 <label>Tổng tiền sản phẩm:</label>
//                 <input
//                     type="number"
//                     value={donHang.tongTienSanPham}
//                     onChange={(e) => setDonHang({ ...donHang, tongTienSanPham: parseFloat(e.target.value) })}
//                     required
//                 />
//                 <button type="submit">Lưu</button>
//             </form>
//         </div>
//     );
// };
//
// export default DonHangForm;



import React, { FormEvent, useState, useEffect } from "react";
// === XÓA IMPORT CŨ GÂY LỖI ===
// import { themDonHang, capNhatDonHang } from "../../API/DonHangAPI";
import DonHangModel from "../../models/DonHangModel"; // <<< Kiểm tra đường dẫn model
import { useParams, useNavigate ,Link} from "react-router-dom"; // <<< Import thêm hook
// Import hàm API cập nhật trạng thái (ví dụ) - Sửa lại nếu tên hàm khác
import { capNhatTrangThaiDonHangAdmin } from "../../API/DonHangAPI"; // <<< Import hàm đúng (ví dụ)
// Import hàm lấy chi tiết đơn hàng nếu cần load dữ liệu cũ
// import { layChiTietDonHangAdmin } from "../../API/DonHangAPI";

const DonHangForm: React.FC = () => {
    // Lấy mã đơn hàng từ URL nếu đây là trang sửa
    const { maDonHang } = useParams<{ maDonHang?: string }>();
    const isUpdating = !!maDonHang; // Kiểm tra xem có mã đơn hàng không (để biết là sửa hay thêm)
    const navigate = useNavigate();

    // State cho form - Giờ chỉ cần trạng thái nếu là form sửa trạng thái
    const [trangThai, setTrangThai] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // TODO: Nếu là form sửa, cần useEffect để fetch dữ liệu đơn hàng hiện tại
    // useEffect(() => {
    //     if (isUpdating && maDonHang) {
    //         // Gọi API lấy chi tiết đơn hàng theo maDonHang
    //         // layChiTietDonHangAdmin(parseInt(maDonHang))
    //         // .then(data => setTrangThai(data.trangThai || ''))
    //         // .catch(err => setError("Lỗi tải dữ liệu đơn hàng"));
    //     }
    // }, [isUpdating, maDonHang]);


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);

        if (isUpdating && maDonHang) {
            // === LOGIC CẬP NHẬT TRẠNG THÁI (VÍ DỤ) ===
            if (!trangThai) {
                setError("Vui lòng chọn trạng thái mới.");
                return;
            }
            setIsLoading(true);
            try {
                await capNhatTrangThaiDonHangAdmin(parseInt(maDonHang), trangThai);
                alert("Cập nhật trạng thái đơn hàng thành công!");
                navigate('/admin/don-hang'); // Quay về danh sách đơn hàng admin (sửa lại route nếu cần)
            } catch (err: any) {
                setError(err.message || "Lỗi khi cập nhật trạng thái.");
                console.error("Lỗi cập nhật trạng thái:", err);
            } finally {
                setIsLoading(false);
            }
            // === KẾT THÚC LOGIC CẬP NHẬT ===

        } else {
            // === LOGIC THÊM MỚI (NẾU CÓ) ===
            alert("Chức năng thêm mới đơn hàng thủ công chưa được cài đặt API.");
            // Nếu bạn muốn thêm mới:
            // 1. Cần có API Backend (POST /api/admin/don-hang)
            // 2. Tạo hàm API Frontend (themDonHangAdmin)
            // 3. Gọi hàm đó ở đây với dữ liệu từ form (cần thêm các input khác)
            // === KẾT THÚC LOGIC THÊM MỚI ===
        }
    };

    return (
        <div className="container mt-4 mb-5">
            {/* Sửa lại tiêu đề cho phù hợp */}
            <h1>{isUpdating ? `Cập nhật trạng thái Đơn hàng #${maDonHang}` : "Thêm Đơn Hàng Mới (Chưa hoạt động)"}</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* Form sửa trạng thái (ví dụ) */}
            {isUpdating && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="trangThaiSelect" className="form-label">Trạng thái mới</label>
                        <select
                            id="trangThaiSelect"
                            className="form-select"
                            value={trangThai}
                            onChange={(e) => setTrangThai(e.target.value)}
                            disabled={isLoading}
                            required
                        >
                            <option value="" disabled>-- Chọn trạng thái --</option>
                            <option value="Đang xử lý">Đang xử lý</option>
                            <option value="Đang giao hàng">Đang giao hàng</option>
                            <option value="Đã giao hàng">Đã giao hàng</option>
                            <option value="Đã hủy">Đã hủy</option>
                            {/* Thêm các trạng thái khác nếu có */}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                    <Link to="/admin/don-hang" className="btn btn-secondary ms-2">Hủy</Link> {/* Nút hủy */}
                </form>
            )}

            {/* Thông báo nếu là form thêm mới */}
            {!isUpdating && (
                <div className="alert alert-warning">Chức năng thêm mới đơn hàng thủ công chưa được hỗ trợ. Đơn hàng thường được tạo qua quy trình thanh toán của khách hàng.</div>
            )}
        </div>
    );
};

export default DonHangForm;