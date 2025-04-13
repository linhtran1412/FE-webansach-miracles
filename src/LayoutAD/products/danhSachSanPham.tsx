// import React, { useEffect, useState, ChangeEvent } from "react"; // Thêm ChangeEvent nếu dùng input search sau này
// import SachModel from "../../models/sachModel";
// // Bỏ component SachProps vì ta sẽ hiển thị ảnh và nút trực tiếp ở đây
// // import SachProps from "./components/sachProps";
// import { layToanBoSach, timKiemSach } from "../../API/sachAPI";
// // import { error } from "console"; // Không cần import error
// import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate nếu cần
// import { PhanTrang } from "../../layouts/Utils/PhanTrang";
// import dinhDangSo from "../../layouts/Utils/dinhDangSo"; // Import để định dạng giá
// import { lay1AnhCuaMotSach } from "../../API/hinhAnhAPI"; // Import để lấy ảnh đại diện
// import HinhAnhModel from "../../models/hinhAnhModel"; // Import model ảnh
//
// interface DanhSachSanPhamProps {
//     tuKhoaTimKiem: string;
//     maTheLoai: number;
//     // Thêm setTuKhoaTimKiem nếu có ô tìm kiếm trong component này
//     setTuKhoaTimKiem?: (tuKhoa: string) => void;
// }
//
// // Component nhỏ để hiển thị ảnh đại diện
// const AnhDaiDienSach: React.FC<{ maSach: number }> = ({ maSach }) => {
//     const [anhUrl, setAnhUrl] = useState<string | null>(null);
//     const [dangTaiAnh, setDangTaiAnh] = useState(true);
//
//     useEffect(() => {
//         setDangTaiAnh(true);
//         lay1AnhCuaMotSach(maSach)
//             .then(hinhAnhData => {
//                 if (hinhAnhData.length > 0 && hinhAnhData[0].duLieuAnh) {
//                     setAnhUrl(hinhAnhData[0].duLieuAnh);
//                 } else {
//                     setAnhUrl('/path/to/default/image.jpg'); // Đặt ảnh mặc định nếu không có
//                 }
//                 setDangTaiAnh(false);
//             })
//             .catch(error => {
//                 console.error(`Lỗi tải ảnh cho sách ${maSach}:`, error);
//                 setAnhUrl('/path/to/default/image.jpg'); // Đặt ảnh mặc định khi lỗi
//                 setDangTaiAnh(false);
//             });
//     }, [maSach]);
//
//     if (dangTaiAnh) {
//         return <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">...</span></div>;
//     }
//
//     return (
//         <img
//             src={anhUrl || '/path/to/default/image.jpg'}
//             alt={`Ảnh sách ${maSach}`}
//             style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
//         />
//     );
// };
//
//
// function DanhSachSanPhamAD({ tuKhoaTimKiem, maTheLoai }: DanhSachSanPhamProps) {
//     const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
//     const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
//     const [baoLoi, setBaoLoi] = useState<string | null>(null); // Sửa kiểu dữ liệu lỗi
//     const [trangHienTai, setTrangHienTai] = useState(1);
//     const [tongSoTrang, setTongSoTrang] = useState(0);
//     // const [tongSoSach, setSoSach] = useState(0); // Biến này chưa được dùng
//     const navigate = useNavigate(); // Dùng để chuyển trang nếu cần
//
//     // --- Hàm Fetch dữ liệu ---
//     useEffect(() => {
//         setDangTaiDuLieu(true); // Bắt đầu tải
//         setBaoLoi(null); // Reset lỗi cũ
//
//         const fetchFunction = (tuKhoaTimKiem === '' && maTheLoai === 0)
//             ? layToanBoSach(trangHienTai - 1)
//             : timKiemSach(tuKhoaTimKiem, maTheLoai); // Giả sử timKiemSach cũng nhận trang
//
//         fetchFunction.then(
//             kq => {
//                 setDanhSachQuyenSach(kq.ketQua);
//                 setTongSoTrang(kq.tongSoTrang);
//                 setDangTaiDuLieu(false);
//             }
//         ).catch(
//             (error: any) => { // Bắt lỗi chi tiết hơn
//                 setDangTaiDuLieu(false);
//                 setBaoLoi(error.message || "Lỗi kết nối hoặc không tìm thấy dữ liệu.");
//                 console.error("Lỗi fetch sách:", error);
//             }
//         );
//     }, [trangHienTai, tuKhoaTimKiem, maTheLoai]);
//
//     // --- Hàm Phân Trang ---
//     const phanTrang = (trang: number) => {
//         setTrangHienTai(trang);
//     };
//
//     // --- Hàm Xử Lý Xóa Sách ---
//     const handleDelete = (maSachCanXoa: number, tenSach: string | undefined) => {
//         if (!window.confirm(`Bạn có chắc chắn muốn xóa sách "${tenSach || maSachCanXoa}"?`)) {
//             return;
//         }
//
//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
//             navigate('/dang-nhap'); // Chuyển về trang đăng nhập
//             return;
//         }
//
//         setDangTaiDuLieu(true); // Có thể thêm state loading riêng cho việc xóa
//
//         fetch(`http://localhost:8080/sach/${maSachCanXoa}`, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then(async (response) => {
//                 if (response.ok) {
//                     alert(`Đã xóa sách "${tenSach || maSachCanXoa}" thành công!`);
//                     // Cập nhật lại state để xóa sách khỏi giao diện
//                     // Nên fetch lại trang hiện tại để đảm bảo dữ liệu đồng bộ nhất
//                     // setDanhSachQuyenSach(prevDanhSach =>
//                     //     prevDanhSach.filter(sach => sach.maSach !== maSachCanXoa)
//                     // );
//                     // Fetch lại dữ liệu cho trang hiện tại
//                     const fetchFunction = (tuKhoaTimKiem === '' && maTheLoai === 0)
//                         ? layToanBoSach(trangHienTai - 1)
//                         : timKiemSach(tuKhoaTimKiem, maTheLoai);
//                     fetchFunction.then(kq => {
//                         setDanhSachQuyenSach(kq.ketQua);
//                         setTongSoTrang(kq.tongSoTrang);
//                     }).finally(() => setDangTaiDuLieu(false));
//
//                 } else {
//                     // Xử lý lỗi từ server
//                     let errorMsg = `Lỗi ${response.status} khi xóa sách.`;
//                     try {
//                         const errorData = await response.json();
//                         errorMsg = errorData.message || errorData.error || errorData.noiDung || JSON.stringify(errorData) || errorMsg;
//                     } catch (e) {
//                         errorMsg = await response.text().catch(() => errorMsg);
//                     }
//                     alert(`Xóa sách thất bại: ${errorMsg}`);
//                     console.error("Lỗi xóa sách:", errorMsg);
//                     setDangTaiDuLieu(false); // Tắt loading nếu có lỗi
//                 }
//             })
//             .catch((error) => {
//                 console.error("Lỗi fetch khi xóa sách:", error);
//                 alert("Đã xảy ra lỗi kết nối khi xóa sách. Vui lòng thử lại.");
//                 setDangTaiDuLieu(false); // Tắt loading nếu có lỗi
//             });
//     };
//
//
//     // --- Render Trạng thái Loading và Lỗi ---
//     if (dangTaiDuLieu && danhSachQuyenSach.length === 0) { // Chỉ hiện loading toàn trang khi mới vào
//         return (
//             <div className="container text-center mt-5">
//                 <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Đang tải dữ liệu...</span>
//                 </div>
//             </div>
//         );
//     }
//
//     if (baoLoi) {
//         return (
//             <div className="container mt-4">
//                 <div className="alert alert-danger">
//                     <h1>Gặp lỗi:</h1>
//                     <p>{baoLoi}</p>
//                     <button onClick={() => window.location.reload()} className="btn btn-primary">Tải lại trang</button>
//                 </div>
//             </div>
//         );
//     }
//
//     // --- Render Khi Không Tìm Thấy Sách ---
//     if (!dangTaiDuLieu && danhSachQuyenSach.length === 0) {
//         return (
//             <div className="container mt-5 text-center">
//                 <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
//                 {/* Có thể thêm nút quay lại hoặc xóa bộ lọc tìm kiếm */}
//                 <Link to="/admin" className="btn btn-primary mt-3">Xem tất cả sách</Link>
//             </div>
//         );
//     }
//
//     // --- Render Bảng Danh Sách Sách ---
//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h1>Quản lý sách</h1>
//                 {/* === NÚT THÊM SÁCH === */}
//                 <Link to="/admin/them-sach" className="btn btn-success">
//                     <i className="fas fa-plus me-1"></i> Thêm sách mới
//                 </Link>
//                 {/* === KẾT THÚC NÚT THÊM SÁCH === */}
//             </div>
//
//             {/* Có thể thêm ô tìm kiếm ở đây */}
//             {/* <div className="mb-3"> ... ô tìm kiếm ... </div> */}
//
//             {/* Bảng danh sách */}
//             {dangTaiDuLieu && <div className="text-center mb-2">Đang cập nhật...</div>} {/* Chỉ báo loading nhỏ khi fetch lại */}
//             <div className="table-responsive"> {/* Bọc table trong div responsive */}
//                 <table className="table table-bordered table-hover shadow-sm"> {/* Thêm shadow-sm */}
//                     <thead className="table-light"> {/* Thêm background cho thead */}
//                     <tr className="text-center align-middle"> {/* Căn giữa các th */}
//                         <th>Mã</th>
//                         <th style={{minWidth: '150px'}}>Tên Sách</th> {/* Đặt độ rộng tối thiểu */}
//                         <th>Ảnh</th>
//                         <th style={{minWidth: '100px'}}>Giá bán</th>
//                         {/* <th>Giá niêm yết</th> */}
//                         <th>SL</th> {/* Viết tắt Số lượng */}
//                         {/* <th style={{minWidth: '200px'}}>Mô tả</th> */}
//                         <th>Tác giả</th>
//                         {/* <th>Xếp hạng</th> */}
//                         <th style={{minWidth: '200px'}}>Hành động</th> {/* Đặt độ rộng tối thiểu */}
//                     </tr>
//                     </thead>
//                     <tbody className="text-center align-middle"> {/* Căn giữa nội dung td */}
//                     {danhSachQuyenSach.map((sach) => (
//                         <tr key={sach.maSach}>
//                             <td>{sach.maSach}</td>
//                             <td className="text-start">{sach.tenSach}</td> {/* Căn trái tên sách */}
//                             <td>
//                                 {/* Component hiển thị ảnh đại diện */}
//                                 <AnhDaiDienSach maSach={sach.maSach} />
//                             </td>
//                             <td className="text-end">{dinhDangSo(sach.giaBan)} đ</td> {/* Căn phải giá */}
//                             {/* <td className="text-end">{dinhDangSo(sach.giaNiemYet)} đ</td> */}
//                             <td>{sach.soLuong}</td>
//                             {/* <td className="text-start text-truncate" style={{maxWidth: '200px'}} title={sach.moTa || ''}>{sach.moTa}</td> */}
//                             <td className="text-start">{sach.tenTacGia}</td>
//                             {/* <td>{sach.trungBinhXepHang?.toFixed(1)}</td> */}
//
//                             {/* === CỘT HÀNH ĐỘNG === */}
//                             <td>
//                                 <div className="d-flex justify-content-center gap-2"> {/* Dùng flex và gap */}
//                                     <Link to={`/admin/sach/${sach.maSach}`} className="btn btn-info btn-sm" title="Xem chi tiết">
//                                         <i className="fas fa-eye"></i>
//                                         {/* Chi Tiết */}
//                                     </Link>
//                                     <Link to={`/admin/cap-nhat/${sach.maSach}`} className="btn btn-warning btn-sm" title="Chỉnh sửa">
//                                         <i className="fas fa-edit"></i>
//                                         {/* Sửa */}
//                                     </Link>
//                                     <button
//                                         className="btn btn-danger btn-sm"
//                                         title="Xóa sách"
//                                         onClick={() => handleDelete(sach.maSach, sach.tenSach)}
//                                         disabled={dangTaiDuLieu} // Disable nút xóa khi đang loading
//                                     >
//                                         <i className="fas fa-trash-alt"></i>
//                                         {/* Xóa */}
//                                     </button>
//                                 </div>
//                             </td>
//                             {/* === KẾT THÚC CỘT HÀNH ĐỘNG === */}
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="mt-3 d-flex justify-content-center"> {/* Căn giữa phân trang */}
//                 <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
//             </div>
//         </div>
//     );
// }
//
// export default DanhSachSanPhamAD;


import React, { useEffect, useState, ChangeEvent } from "react";
import SachModel from "../../models/sachModel";
import { layToanBoSach, timKiemSach } from "../../API/sachAPI";
import { Link, useNavigate } from "react-router-dom";
import { PhanTrang } from "../../layouts/Utils/PhanTrang";
import dinhDangSo from "../../layouts/Utils/dinhDangSo";
import { lay1AnhCuaMotSach } from "../../API/hinhAnhAPI";
import HinhAnhModel from "../../models/hinhAnhModel";

// --- Interface cho Props ---
interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai: number;
    setTuKhoaTimKiem?: (tuKhoa: string) => void; // Optional prop
}

// --- Component con hiển thị ảnh đại diện ---
const AnhDaiDienSach: React.FC<{ maSach: number }> = ({ maSach }) => {
    const [anhUrl, setAnhUrl] = useState<string | null>(null);
    const [dangTaiAnh, setDangTaiAnh] = useState(true);
    const defaultImageUrl = '/images/default-book.png'; // Thay bằng đường dẫn ảnh mặc định của bạn

    useEffect(() => {
        setDangTaiAnh(true);
        lay1AnhCuaMotSach(maSach)
            .then(hinhAnhData => {
                if (hinhAnhData.length > 0 && hinhAnhData[0].duLieuAnh) {
                    setAnhUrl(hinhAnhData[0].duLieuAnh);
                } else {
                    setAnhUrl(defaultImageUrl); // Đặt ảnh mặc định nếu không có
                }
                setDangTaiAnh(false);
            })
            .catch(error => {
                console.error(`Lỗi tải ảnh cho sách ${maSach}:`, error);
                setAnhUrl(defaultImageUrl); // Đặt ảnh mặc định khi lỗi
                setDangTaiAnh(false);
            });
    }, [maSach]);

    if (dangTaiAnh) {
        return <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">...</span></div>;
    }

    return (
        <img
            src={anhUrl || defaultImageUrl}
            alt={`Ảnh sách ${maSach}`}
            style={{ height: '50px', width: 'auto', objectFit: 'contain', maxWidth: '50px' }} // Giới hạn chiều rộng tối đa
        />
    );
};

// --- Component chính DanhSachSanPhamAD ---
function DanhSachSanPhamAD({ tuKhoaTimKiem, maTheLoai }: DanhSachSanPhamProps) {
    // --- States ---
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dangXuLyXoa, setDangXuLyXoa] = useState<number | null>(null); // State để biết sách nào đang được xóa
    const navigate = useNavigate();

    // --- Fetch dữ liệu sách (useEffect) ---
    useEffect(() => {
        setDangTaiDuLieu(true);
        setBaoLoi(null);
        // Tạm thời bỏ qua logic tìm kiếm/lọc để đơn giản hóa
        layToanBoSach(trangHienTai - 1)
            .then(kq => {
                setDanhSachQuyenSach(kq.ketQua || []); // Đảm bảo là mảng
                setTongSoTrang(kq.tongSoTrang || 0); // Đảm bảo là số
                setDangTaiDuLieu(false);
            })
            .catch((error: any) => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message || "Lỗi kết nối hoặc không tìm thấy dữ liệu.");
                console.error("Lỗi fetch sách:", error);
            });
    }, [trangHienTai, tuKhoaTimKiem, maTheLoai]); // Giữ dependencies

    // --- Hàm Phân Trang ---
    const phanTrang = (trang: number) => {
        if (trang >= 1 && trang <= tongSoTrang) {
            setTrangHienTai(trang);
        }
    };

    // --- Hàm Xử Lý Xóa Sách ---
    const handleDelete = (maSachCanXoa: number, tenSach: string | undefined) => {
        if (dangXuLyXoa === maSachCanXoa) return; // Tránh click nhiều lần

        if (!window.confirm(`Bạn có chắc chắn muốn xóa sách "${tenSach || maSachCanXoa}"?`)) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert("Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
            navigate('/dang-nhap');
            return;
        }

        setDangXuLyXoa(maSachCanXoa); // Bắt đầu xử lý xóa cho sách này

        fetch(`http://localhost:8080/sach/${maSachCanXoa}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.ok) {
                    alert(`Đã xóa sách "${tenSach || maSachCanXoa}" thành công!`);
                    // Cập nhật lại danh sách sau khi xóa thành công
                    setDanhSachQuyenSach(prevDanhSach =>
                        prevDanhSach.filter(sach => sach.maSach !== maSachCanXoa)
                    );
                    // Có thể cần fetch lại nếu số lượng trang thay đổi, nhưng tạm thời filter là đủ
                } else {
                    let errorMsg = `Lỗi ${response.status} khi xóa sách.`;
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.message || errorData.error || errorData.noiDung || JSON.stringify(errorData) || errorMsg;
                    } catch (e) {
                        errorMsg = await response.text().catch(() => errorMsg);
                    }
                    alert(`Xóa sách thất bại: ${errorMsg}`);
                    console.error("Lỗi xóa sách:", errorMsg);
                }
            })
            .catch((error) => {
                console.error("Lỗi fetch khi xóa sách:", error);
                alert("Đã xảy ra lỗi kết nối khi xóa sách. Vui lòng thử lại.");
            })
            .finally(() => {
                setDangXuLyXoa(null); // Kết thúc xử lý xóa (dù thành công hay thất bại)
            });
    };

    // --- Render ---

    // Loading ban đầu
    if (dangTaiDuLieu && danhSachQuyenSach.length === 0) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Đang tải dữ liệu...</span>
                </div>
            </div>
        );
    }

    // Hiển thị lỗi
    if (baoLoi) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    <h1>Gặp lỗi:</h1>
                    <p>{baoLoi}</p>
                    <button onClick={() => setTrangHienTai(1)} className="btn btn-primary">Thử lại</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Quản lý sách</h1>
                <Link to="/admin/them-sach" className="btn btn-success">
                    <i className="fas fa-plus me-1"></i> Thêm sách mới
                </Link>
            </div>

            {/* Optional: Loading indicator khi phân trang hoặc xóa */}
            {dangTaiDuLieu && <div className="text-center mb-2 text-muted"><i>Đang tải...</i></div>}

            <div className="table-responsive">
                <table className="table table-bordered table-hover shadow-sm">
                    <thead className="table-light">
                    <tr className="text-center align-middle">
                        <th>Mã</th>
                        <th style={{ minWidth: '200px' }}>Tên Sách</th>
                        <th>Ảnh</th>
                        <th style={{ minWidth: '100px' }}>Giá bán</th>
                        <th>SL</th>
                        <th style={{ minWidth: '150px' }}>Tác giả</th>
                        <th style={{ minWidth: '170px' }}>Hành động</th>
                    </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                    {danhSachQuyenSach.length === 0 && !dangTaiDuLieu && (
                        <tr>
                            <td colSpan={7}>Không tìm thấy sách nào.</td>
                        </tr>
                    )}
                    {danhSachQuyenSach.map((sach) => (
                        <tr key={sach.maSach}>
                            <td>{sach.maSach}</td>
                            <td className="text-start">{sach.tenSach}</td>
                            <td>
                                <AnhDaiDienSach maSach={sach.maSach} />
                            </td>
                            <td className="text-end">{dinhDangSo(sach.giaBan)} đ</td>
                            <td>{sach.soLuong}</td>
                            <td className="text-start">{sach.tenTacGia}</td>
                            <td>
                                <div className="d-flex justify-content-center flex-wrap gap-2"> {/* Thêm flex-wrap */}
                                    <Link to={`/admin/sach/${sach.maSach}`} className="btn btn-info btn-sm" title="Xem chi tiết">
                                        <i className="fas fa-eye"></i>
                                    </Link>
                                    <Link to={`/admin/cap-nhat/${sach.maSach}`} className="btn btn-warning btn-sm" title="Chỉnh sửa">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        title="Xóa sách"
                                        onClick={() => handleDelete(sach.maSach, sach.tenSach)}
                                        disabled={dangXuLyXoa === sach.maSach} // Disable nút khi đang xóa sách này
                                    >
                                        {dangXuLyXoa === sach.maSach ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <i className="fas fa-trash-alt"></i>
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/* Chỉ hiển thị phân trang nếu có nhiều hơn 1 trang */}
            {tongSoTrang > 1 && (
                <div className="mt-3 d-flex justify-content-center">
                    <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
                </div>
            )}
        </div>
    );
}

export default DanhSachSanPhamAD;