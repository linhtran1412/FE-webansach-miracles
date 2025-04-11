import React, { useEffect, useState } from "react";
import { layToanBoDonHang, layDonHangTheoNguoiDung, xoaDonHang } from "../../API/DonHangAPI";
import DonHangModel from "../../models/DonHangModel";

interface DonHangListProps {
    isAdmin: boolean;
}

const DonHangList: React.FC<DonHangListProps> = ({ isAdmin }) => {
    const [donHangs, setDonHangs] = useState<DonHangModel[]>([]);

    useEffect(() => {
        if (isAdmin) {
            layToanBoDonHang().then((data: DonHangModel[]) => setDonHangs(data));
        } else {
            const maNguoiDung = localStorage.getItem("userId");
            if (maNguoiDung) {
                layDonHangTheoNguoiDung(parseInt(maNguoiDung)).then((data: DonHangModel[]) => setDonHangs(data));
            }
        }
    }, [isAdmin]);

    const handleDelete = (id: number) => {
        xoaDonHang(id).then(() => {
            alert("Đã xóa đơn hàng!");
            setDonHangs(donHangs.filter((donHang) => donHang.maDonHang !== id));
        });
    };

    return (
        <div>
            <h1>{isAdmin ? "📦 Quản lý đơn hàng" : "📦 Đơn hàng của tôi"}</h1>
            <ul>
                {donHangs.map((donHang) => (
                    <li key={donHang.maDonHang}>
                        {donHang.diaChiNhanHang} - {donHang.tongTien} VND
                        {isAdmin && <button onClick={() => handleDelete(donHang.maDonHang)}>Xóa</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonHangList;

// import React, { useEffect, useState } from "react";
// // Sửa import API cho đúng tên hàm mới và đường dẫn
// import { layDonHangCuaToi } from "../../API/DonHangAPI"; // Giả sử API ở đây, sửa nếu cần
// // Import DTO thay vì Model nếu Backend trả về DTO (khuyến nghị)
// // import DonHangModel from "../../models/DonHangModel"; // Model cũ
// import { DonHangDTO } from "../../dto/DonHangDTO"; // << Hoặc import từ nơi bạn định nghĩa DTO ở FE
// import { Link } from "react-router-dom";
// import dinhDangSo from "../Utils/dinhDangSo"; // Import hàm định dạng số
//
// // Bỏ prop isAdmin vì component này chỉ dành cho người dùng xem đơn của họ
// const DonHangList: React.FC = () => {
//     // Sử dụng kiểu dữ liệu DTO nếu Backend trả về DTO
//     const [donHangs, setDonHangs] = useState<DonHangDTO[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         setLoading(true);
//         setError(null);
//         // Gọi API mới để lấy đơn hàng của người dùng đang đăng nhập
//         layDonHangCuaToi()
//             .then(data => {
//                 // Sắp xếp đơn hàng mới nhất lên đầu (tùy chọn)
//                 data.sort((a, b) => b.maDonHang - a.maDonHang);
//                 setDonHangs(data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 setError(err.message || "Lỗi tải lịch sử đơn hàng.");
//                 setLoading(false);
//                 console.error("Lỗi fetch đơn hàng:", err);
//             });
//         // Không cần dependency vì chỉ load 1 lần khi vào trang
//     }, []);
//
//     if (loading) {
//         return <div className="container mt-4 text-center"><h5>Đang tải lịch sử đơn hàng...</h5></div>;
//     }
//
//     if (error) {
//         return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
//     }
//
//     return (
//         <div className="container mt-4 mb-5">
//             <h1 className="mb-4">Lịch sử đơn hàng của tôi</h1>
//             {donHangs.length === 0 ? (
//                 <div className="text-center p-5 border rounded bg-light">
//                     <p className="lead">Bạn chưa có đơn hàng nào.</p>
//                     <Link to="/" className="btn btn-primary mt-3">
//                         <i className="fas fa-shopping-bag me-2"></i> Bắt đầu mua sắm
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="list-group">
//                     {donHangs.map((donHang) => (
//                         // === SỬA LỖI KEY PROP: Thêm key={donHang.maDonHang} ===
//                         <div key={donHang.maDonHang} className="list-group-item list-group-item-action flex-column align-items-start mb-3 shadow-sm">
//                             {/* === KẾT THÚC SỬA === */}
//                             <div className="d-flex w-100 justify-content-between mb-2">
//                                 <h5 className="mb-1">Mã đơn: #{donHang.maDonHang}</h5>
//                                 <small className="text-muted">Ngày đặt: {new Date(donHang.ngayTao).toLocaleDateString('vi-VN')}</small>
//                             </div>
//                             <div className="row mb-1">
//                                 <div className="col-md-8">
//                                     {/* Hiển thị tóm tắt sản phẩm (ví dụ: tên sản phẩm đầu tiên và số lượng) */}
//                                     {donHang.danhSachChiTietDonHang && donHang.danhSachChiTietDonHang.length > 0 && (
//                                         <p className="mb-1 small text-muted">
//                                             Sản phẩm: {donHang.danhSachChiTietDonHang[0].tenSach}
//                                             {donHang.danhSachChiTietDonHang.length > 1 && ` và ${donHang.danhSachChiTietDonHang.length - 1} sản phẩm khác...`}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="col-md-4 text-md-end">
//                                     <p className="mb-1">Tổng tiền: <span className="fw-bold text-danger">{dinhDangSo(donHang.tongTien)} đ</span></p>
//                                 </div>
//                             </div>
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <span className={`badge ${
//                                     donHang.trangThai === 'Đã hủy' ? 'bg-danger' :
//                                         donHang.trangThai === 'Đã giao' ? 'bg-success' :
//                                             donHang.trangThai === 'Đang giao' ? 'bg-info' :
//                                                 'bg-warning text-dark' // Mặc định là Chờ xử lý hoặc trạng thái khác
//                                 }`}>{donHang.trangThai || 'Chờ xử lý'}</span>
//                                 {/* Nút Xem Chi Tiết (sẽ làm sau) */}
//                                 {/* <Link to={`/tai-khoan/don-hang/${donHang.maDonHang}`} className="btn btn-sm btn-outline-primary">
//                                     Xem chi tiết
//                                 </Link> */}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default DonHangList;