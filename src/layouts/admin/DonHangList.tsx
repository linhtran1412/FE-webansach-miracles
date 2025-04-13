// import React, { useEffect, useState } from "react";
// import { layToanBoDonHang, layDonHangTheoNguoiDung, xoaDonHang } from "../../API/DonHangAPI";
// import DonHangModel from "../../models/DonHangModel";
//
// interface DonHangListProps {
//     isAdmin: boolean;
// }
//
// const DonHangList: React.FC<DonHangListProps> = ({ isAdmin }) => {
//     const [donHangs, setDonHangs] = useState<DonHangModel[]>([]);
//
//     useEffect(() => {
//         if (isAdmin) {
//             layToanBoDonHang().then((data: DonHangModel[]) => setDonHangs(data));
//         } else {
//             const maNguoiDung = localStorage.getItem("userId");
//             if (maNguoiDung) {
//                 layDonHangTheoNguoiDung(parseInt(maNguoiDung)).then((data: DonHangModel[]) => setDonHangs(data));
//             }
//         }
//     }, [isAdmin]);
//
//     const handleDelete = (id: number) => {
//         xoaDonHang(id).then(() => {
//             alert("Đã xóa đơn hàng!");
//             setDonHangs(donHangs.filter((donHang) => donHang.maDonHang !== id));
//         });
//     };
//
//     return (
//         <div>
//             <h1>{isAdmin ? "📦 Quản lý đơn hàng" : "📦 Đơn hàng của tôi"}</h1>
//             <ul>
//                 {donHangs.map((donHang) => (
//                     <li key={donHang.maDonHang}>
//                         {donHang.diaChiNhanHang} - {donHang.tongTien} VND
//                         {isAdmin && <button onClick={() => handleDelete(donHang.maDonHang)}>Xóa</button>}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default DonHangList;



// Ví dụ: src/layouts/admin/DonHangList.tsx
import React, { useEffect, useState } from "react";
// === SỬA IMPORT CHO ĐÚNG TÊN HÀM ===
import { layToanBoDonHangAdmin, xoaDonHangAdmin } from "../../API/DonHangAPI"; // <<< DÙNG TÊN HÀM NÀY
import DonHangModel from "../../models/DonHangModel";       // <<< Kiểm tra đường dẫn model
import { Link, useNavigate } from "react-router-dom";       // <<< Thêm import useNavigate
import dinhDangSo from "../../layouts/Utils/dinhDangSo"; // <<< Kiểm tra đường dẫn Utils
import { checkAdminRole, isLoggedIn } from "../../layouts/Utils/authCheck"; // <<< Kiểm tra đường dẫn Utils

// Bỏ prop isAdmin nếu component này chỉ dành cho admin
const QuanLyDonHangList: React.FC = () => {
    const [donHangs, setDonHangs] = useState<DonHangModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null); // State cho biết đang xóa đơn hàng nào
    const navigate = useNavigate();

    // Hàm fetch dữ liệu
    const fetchData = () => {
        setLoading(true);
        setError(null);
        // === SỬA TÊN HÀM GỌI API ===
        layToanBoDonHangAdmin()
            .then((data) => {
                if(Array.isArray(data)) {
                    data.sort((a, b) => b.maDonHang - a.maDonHang); // Sắp xếp
                    setDonHangs(data);
                } else {
                    setDonHangs([]);
                    console.warn("API layToanBoDonHangAdmin không trả về mảng:", data);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Lỗi tải danh sách đơn hàng.");
                setLoading(false);
                console.error("Lỗi fetch đơn hàng admin:", err);
            });
    }

    // useEffect kiểm tra quyền và fetch dữ liệu
    useEffect(() => {
        if (!isLoggedIn()) {
            alert("Vui lòng đăng nhập.");
            navigate('/dang-nhap', { replace: true });
            return;
        }
        if (!checkAdminRole()) {
            alert("Bạn không có quyền truy cập trang này.");
            navigate('/', { replace: true });
            return;
        }
        fetchData(); // Gọi fetch data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Chỉ chạy 1 lần

    // Hàm xử lý xóa
    const handleDelete = (id: number) => {
        if(deletingId === id) return; // Tránh nhấn xóa nhiều lần

        if(window.confirm(`Bạn chắc chắn muốn xóa đơn hàng #${id}?`)) {
            setDeletingId(id); // Bắt đầu xóa
            // === SỬA TÊN HÀM GỌI API ===
            xoaDonHangAdmin(id)
                .then(() => {
                    alert("Đã xóa đơn hàng thành công!");
                    // Cập nhật lại danh sách bằng cách lọc bỏ
                    setDonHangs(currentDonHangs =>
                        currentDonHangs.filter((donHang) => donHang.maDonHang !== id)
                    );
                })
                .catch(error => {
                    alert(`Lỗi khi xóa đơn hàng: ${error.message}`);
                    console.error("Lỗi xóa đơn hàng:", error);
                })
                .finally(() => {
                    setDeletingId(null); // Kết thúc xóa
                });
        }
    };

    // --- Render ---
    if (loading) return <div className="container mt-4 text-center"><h5>Đang tải danh sách đơn hàng...</h5></div>;
    if (error) return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;

    return (
        <div className="container mt-4 mb-5">
            <h1 className="mb-4">📦 Quản lý đơn hàng</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                    <tr className="text-center align-middle">
                        <th>Mã ĐH</th>
                        <th>Ngày đặt</th>
                        <th>Người đặt (Username)</th>
                        <th>Địa chỉ nhận</th>
                        <th className="text-end">Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody className="align-middle">
                    {donHangs.length === 0 ? (
                        <tr><td colSpan={7} className="text-center">Không có đơn hàng nào.</td></tr>
                    ) : (
                        donHangs.map((donHang) => (
                            <tr key={donHang.maDonHang}>
                                <td className="text-center">{donHang.maDonHang}</td>
                                <td className="text-center">{donHang.ngayTao ? new Date(donHang.ngayTao).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                <td>{donHang.nguoiDung?.tenDangNhap || 'N/A'}</td>
                                <td>{donHang.diaChiNhanHang}</td>
                                <td className="text-end">{dinhDangSo(donHang.tongTien)} đ</td>
                                <td className="text-center">
                                        <span className={`badge rounded-pill ${
                                            donHang.trangThai === 'Đã hủy' ? 'bg-danger' :
                                                donHang.trangThai === 'Đã giao hàng' ? 'bg-success' :
                                                    donHang.trangThai === 'Đang giao hàng' ? 'bg-info' :
                                                        donHang.trangThai === 'Đang xử lý' ? 'bg-warning text-dark' :
                                                            'bg-secondary'
                                        }`}>
                                            {donHang.trangThai || 'Chưa xác định'}
                                        </span>
                                </td>
                                <td className="text-center">
                                    {/* Nút sửa trạng thái (cần component/modal riêng) */}
                                    {/* <button className="btn btn-warning btn-sm me-2" title="Sửa trạng thái"><i className="fas fa-edit"></i></button> */}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        title="Xóa đơn hàng"
                                        onClick={() => handleDelete(donHang.maDonHang)}
                                        disabled={deletingId === donHang.maDonHang} // Disable khi đang xóa
                                    >
                                        {deletingId === donHang.maDonHang ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <i className="fas fa-trash-alt"></i>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Sửa tên export nếu cần
export default QuanLyDonHangList;