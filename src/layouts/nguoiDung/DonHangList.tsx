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



// // Ví dụ: src/layouts/nguoiDung/DonHangList.tsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { layDonHangCuaToi } from "../../API/DonHangAPI";     // <<< Sửa đường dẫn nếu cần
// import DonHangModel from "../../models/DonHangModel";       // <<< Sửa đường dẫn nếu cần
// import dinhDangSo from "../Utils/dinhDangSo";            // <<< Sửa đường dẫn nếu cần
// import { isLoggedIn } from "../Utils/authCheck";       // <<< Sửa đường dẫn nếu cần
//
// const DonHangList: React.FC<{isAdmin?: boolean}> = ({isAdmin}) => { // Thêm lại prop isAdmin nếu cần phân biệt rõ ràng hơn
//     const [donHangs, setDonHangs] = useState<DonHangModel[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         // Chỉ fetch nếu đang ở trang người dùng (component này không nên dùng cho admin)
//         if (!isAdmin) {
//             if (!isLoggedIn()) {
//                 alert("Vui lòng đăng nhập để xem đơn hàng.");
//                 navigate('/dang-nhap', { replace: true });
//                 return;
//             }
//
//             setLoading(true);
//             setError(null);
//             layDonHangCuaToi()
//                 .then(data => {
//                     // Sắp xếp đơn hàng mới nhất lên đầu
//                     if (Array.isArray(data)) {
//                         data.sort((a, b) => b.maDonHang - a.maDonHang);
//                         setDonHangs(data);
//                     } else {
//                         // Xử lý trường hợp data không phải mảng (API trả về lỗi?)
//                         console.error("API layDonHangCuaToi không trả về một mảng:", data);
//                         setError("Định dạng dữ liệu đơn hàng không hợp lệ.");
//                         setDonHangs([]); // Đặt thành mảng rỗng
//                     }
//                     setLoading(false);
//                 })
//                 .catch(err => {
//                     setError(err.message || "Lỗi tải lịch sử đơn hàng.");
//                     setLoading(false);
//                     console.error("Lỗi fetch đơn hàng:", err);
//                 });
//         } else {
//             // Nếu component này vô tình được dùng cho admin, không làm gì cả hoặc báo lỗi
//             setLoading(false);
//             setError("Component này chỉ dành cho người dùng xem đơn hàng cá nhân.");
//         }
//
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isAdmin, navigate]); // Thêm isAdmin và navigate vào dependency
//
//     // --- Phần Render ---
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
//             <h1 className="mb-4">Đơn hàng của tôi</h1>
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
//                         // Bọc mỗi đơn hàng bằng div thay vì Link trực tiếp
//                         <div key={donHang.maDonHang} className="list-group-item list-group-item-action flex-column align-items-start mb-3 shadow-sm">
//                             <div className="d-flex w-100 justify-content-between mb-2">
//                                 <h5 className="mb-1 text-primary">Mã đơn: #{donHang.maDonHang}</h5>
//                                 <small className="text-muted">Ngày đặt: {donHang.ngayTao ? new Date(donHang.ngayTao).toLocaleDateString('vi-VN') : 'N/A'}</small>
//                             </div>
//                             <div className="row mb-1">
//                                 <div className="col-md-8">
//                                     {/* Hiển thị tóm tắt sản phẩm */}
//                                     {donHang.danhSachChiTietDonHang && donHang.danhSachChiTietDonHang.length > 0 && (
//                                         <p className="mb-1 small text-muted">
//                                             {/* Giả sử chi tiết đơn hàng có thông tin sách */}
//                                             {donHang.danhSachChiTietDonHang[0].sach?.tenSach || 'Sản phẩm'}
//                                             ({donHang.danhSachChiTietDonHang[0].soLuong}x)
//                                             {donHang.danhSachChiTietDonHang.length > 1 && ` và ${donHang.danhSachChiTietDonHang.length - 1} loại khác...`}
//                                         </p>
//                                     )}
//                                     <p className="mb-1 small">Giao đến: {donHang.diaChiNhanHang || 'N/A'}</p>
//                                 </div>
//                                 <div className="col-md-4 text-md-end">
//                                     <p className="mb-1 fw-bold">Tổng tiền: <span className="text-danger">{dinhDangSo(donHang.tongTien)} đ</span></p>
//                                 </div>
//                             </div>
//                             <div className="d-flex justify-content-between align-items-center mt-2">
//                                 {/* Hiển thị trạng thái */}
//                                 <span className={`badge rounded-pill ${
//                                     donHang.trangThai === 'Đã hủy' ? 'bg-danger' :
//                                         donHang.trangThai === 'Đã giao hàng' ? 'bg-success' : // Sửa lại nếu trạng thái khác
//                                             donHang.trangThai === 'Đang giao hàng' ? 'bg-info' :
//                                                 donHang.trangThai === 'Đang xử lý' ? 'bg-warning text-dark' : // Sửa lại nếu trạng thái khác
//                                                     'bg-secondary' // Trạng thái mặc định/khác
//                                 }`}>
//                                     {donHang.trangThai || 'Chưa xác định'}
//                                 </span>
//                                 {/* Có thể thêm nút xem chi tiết đơn hàng ở đây */}
//                                 {/* <Link to={`/tai-khoan/don-hang/${donHang.maDonHang}`} className="btn btn-sm btn-outline-primary">Xem chi tiết</Link> */}
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
//
//

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { layDonHangCuaToi } from "../../API/DonHangAPI";
import DonHangModel from "../../models/DonHangModel"; // Model đơn hàng
import dinhDangSo from "../Utils/dinhDangSo";
import { isLoggedIn } from "../Utils/authCheck";

type Props = { isAdmin?: boolean };

const DonHangList: React.FC<Props> = ({ isAdmin }) => {
    const [donHangs, setDonHangs] = useState<DonHangModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    // ======================= HÀM LOAD DỮ LIỆU =======================
    const load = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await layDonHangCuaToi(); // gọi API đơn hàng
            setDonHangs(Array.isArray(data) ? data : []);

            // Nếu vừa điều hướng từ trang "Đặt hàng thành công" (có ?ts=)
            // mà API chưa trả đơn mới, thử refetch 1 lần sau 250ms
            const hasTs = new URLSearchParams(location.search).has("ts");
            if (hasTs && (!data || data.length === 0)) {
                console.log("[DonHangList] Không thấy đơn mới, thử refetch sau 250ms...");
                setTimeout(async () => {
                    try {
                        const again = await layDonHangCuaToi();
                        if (again && again.length > 0) {
                            console.log("[DonHangList] Refetch thành công, cập nhật đơn mới!");
                            setDonHangs(again);
                        }
                    } catch (err) {
                        console.warn("[DonHangList] Refetch thất bại:", err);
                    }
                }, 250);
            }
        } catch (e: any) {
            setError(e?.message || "Lỗi tải lịch sử đơn hàng.");
        } finally {
            setLoading(false);
        }
    };

    // ======================= USE EFFECT =======================
    useEffect(() => {
        if (isAdmin) {
            setLoading(false);
            setError("Component này chỉ dành cho người dùng xem đơn hàng cá nhân.");
            return;
        }

        if (!isLoggedIn()) {
            alert("Vui lòng đăng nhập để xem đơn hàng.");
            navigate("/dang-nhap", {
                replace: true,
                state: { from: location.pathname },
            });
            return;
        }

        load();

        // Mỗi lần quay lại trang hoặc có query (?ts=...) mới thì refetch
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin, location.key, location.search]);

    // ======================= GIAO DIỆN HIỂN THỊ =======================
    if (loading)
        return (
            <div className="container mt-4 text-center">
                <h5>Đang tải lịch sử đơn hàng...</h5>
            </div>
        );

    if (error)
        return (
            <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>
        );

    return (
        <div className="container mt-4 mb-5">
            <h1 className="mb-4">Đơn hàng của tôi</h1>

            {donHangs.length === 0 ? (
                <div className="text-center p-5 border rounded bg-light">
                    <p className="lead">Bạn chưa có đơn hàng nào.</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        <i className="fas fa-shopping-bag me-2"></i> Bắt đầu mua sắm
                    </Link>
                </div>
            ) : (
                <div className="list-group">
                    {donHangs.map((dh) => (
                        <div
                            key={dh.maDonHang}
                            className="list-group-item list-group-item-action flex-column align-items-start mb-3 shadow-sm"
                        >
                            <div className="d-flex w-100 justify-content-between mb-2">
                                <h5 className="mb-1 text-primary">Mã đơn: #{dh.maDonHang}</h5>
                                <small className="text-muted">
                                    Ngày đặt:{" "}
                                    {dh.ngayTao
                                        ? new Date(dh.ngayTao).toLocaleDateString("vi-VN")
                                        : "N/A"}
                                </small>
                            </div>

                            <div className="row mb-1">
                                <div className="col-md-8">
                                    <p className="mb-1 small">
                                        Giao đến: {dh.diaChiNhanHang || "N/A"}
                                    </p>
                                </div>
                                <div className="col-md-4 text-md-end">
                                    <p className="mb-1 fw-bold">
                                        Tổng tiền:{" "}
                                        <span className="text-danger">
                      {dinhDangSo(dh.tongTien)} đ
                    </span>
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-2">
                <span
                    className={`badge rounded-pill ${
                        dh.trangThai === "Đã hủy"
                            ? "bg-danger"
                            : dh.trangThai === "Đã giao hàng"
                                ? "bg-success"
                                : dh.trangThai === "Đang giao hàng"
                                    ? "bg-info"
                                    : dh.trangThai === "Đang xử lý"
                                        ? "bg-warning text-dark"
                                        : "bg-secondary"
                    }`}
                >
                  {dh.trangThai || "Chưa xác định"}
                </span>

                                {/* Nút xem chi tiết (nếu có route chi tiết) */}
                                {/* <Link
                  to={`/tai-khoan/don-hang/${dh.maDonHang}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Xem chi tiết
                </Link> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonHangList;
