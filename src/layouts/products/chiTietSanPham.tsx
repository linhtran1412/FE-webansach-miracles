// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import sachModel from "../../models/sachModel";
//
// // import { error } from "console"; // Không cần thiết nếu không dùng
// import { laySachTheoMaSach } from "../../API/sachAPI";
// import HinhAnhSanPham from "./components/hinhAnhSanPham";
// // import DanhSachSanPham from "./danhSachSanPham"; // Import này có thể không cần thiết trong file chi tiết
// import DanhGiaSanPham from "./components/danhGiaSanPham";
// import renderRating from "../Utils/renderRating";
// import dinhDangSo from "../Utils/dinhDangSo";
// import { themSachVaoGioHangAPI } from "../../API/GioHangAPI"; // Import API giỏ hàng
// import { useNavigate } from 'react-router-dom'; // Import hook để chuyển hướng
//
// const ChiTietSanPham: React.FC = () => {
//     // Lấy mã sách từ URL
//     const { maSach } = useParams();
//
//     let maSachNumber = 0;
//     try {
//         maSachNumber = parseInt(maSach + '');
//         if (Number.isNaN(maSachNumber))
//             maSachNumber = 0;
//     } catch (error: any) { // Thêm kiểu 'any' hoặc 'unknown' cho error
//         maSachNumber = 0;
//         console.error("Error parsing maSach:", error); // Sửa lại log lỗi
//     }
//
//     // Khai báo state
//     const [sach, setSach] = useState<sachModel | null>(null);
//     const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
//     const [baoLoi, setBaoLoi] = useState<string | null>(null); // Nên để kiểu string | null
//     const [soLuong, setSoLuong] = useState(1);
//     const [thongBaoThemGioHang, setThongBaoThemGioHang] = useState<string | null>(null); // State mới cho thông báo
//     const navigate = useNavigate(); // Hook để chuyển hướng
//
//     // Hàm xử lý tăng số lượng
//     const tangSoLuong = () => {
//         const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
//         if (soLuong < soLuongTonKho) {
//             setSoLuong(soLuong + 1);
//         } else {
//             alert("Số lượng tồn kho không đủ!"); // Thông báo nếu vượt quá
//         }
//     }
//
//     // Hàm xử lý giảm số lượng
//     const giamSoLuong = () => {
//         // Sửa: cho phép giảm xuống 1
//         if (soLuong > 1) {
//             setSoLuong(soLuong - 1);
//         }
//     }
//
//     // Hàm xử lý thay đổi số lượng từ input
//     const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         try {
//             const soLuongMoi = parseInt(event.target.value);
//             const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
//
//             if (!isNaN(soLuongMoi)) {
//                 if (soLuongMoi < 1) {
//                     setSoLuong(1); // Giới hạn tối thiểu là 1
//                 } else if (soLuongMoi > soLuongTonKho) {
//                     setSoLuong(soLuongTonKho); // Giới hạn tối đa là tồn kho
//                     alert("Số lượng tồn kho không đủ!");
//                 } else {
//                     setSoLuong(soLuongMoi);
//                 }
//             } else if (event.target.value === '') {
//                 // Cho phép input rỗng tạm thời, nhưng có thể reset về 1 nếu người dùng blur mà không nhập gì
//                 // Hoặc bạn có thể xử lý phức tạp hơn để giữ giá trị cuối cùng hợp lệ
//                 setSoLuong(1); // Tạm thời reset về 1 nếu input rỗng
//             }
//         } catch (e) {
//             console.error("Lỗi khi xử lý số lượng:", e);
//             setSoLuong(1); // Reset về 1 nếu có lỗi
//         }
//     }
//
//     // Hàm xử lý Mua ngay (Chưa có logic)
//     const handleMuaNgay = () => {
//         // Logic cho Mua Ngay sẽ ở đây
//         // Có thể thêm vào giỏ hàng rồi chuyển hướng đến trang giỏ hàng/thanh toán
//         alert("Chức năng Mua Ngay chưa được cài đặt!");
//     }
//
//     // --- Hàm xử lý Thêm vào Giỏ hàng ---
//     const handleThemVaoGioHang = async () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
//             navigate('/dang-nhap'); // Chuyển hướng đến trang đăng nhập
//             return;
//         }
//
//         if (sach && sach.maSach) {
//             setThongBaoThemGioHang("Đang thêm..."); // Thông báo chờ
//             try {
//                 // Gọi API thêm vào giỏ hàng
//                 await themSachVaoGioHangAPI(sach.maSach, soLuong);
//                 setThongBaoThemGioHang("Đã thêm vào giỏ hàng thành công!");
//
//                 // Cập nhật số lượng trên icon giỏ hàng (nếu có state quản lý global)
//                 // Hoặc phát ra một sự kiện để Navbar lắng nghe
//                 // window.dispatchEvent(new CustomEvent('cartUpdated'));
//
//                 // Tự động ẩn thông báo sau vài giây
//                 setTimeout(() => setThongBaoThemGioHang(null), 3000);
//             } catch (error: any) {
//                 console.error("Lỗi khi thêm vào giỏ:", error);
//                 // Hiển thị lỗi cụ thể từ backend nếu có
//                 setThongBaoThemGioHang(`Lỗi: ${error.message || "Không thể thêm vào giỏ hàng."}`);
//                 // Giữ thông báo lỗi lâu hơn
//                 setTimeout(() => setThongBaoThemGioHang(null), 5000);
//             }
//         }
//     }
//     // --- Kết thúc hàm Thêm vào Giỏ hàng ---
//
//     // useEffect để lấy dữ liệu sách
//     useEffect(() => {
//         if (maSachNumber > 0) { // Chỉ gọi API nếu maSachNumber hợp lệ
//             setDangTaiDuLieu(true); // Reset trạng thái loading
//             setBaoLoi(null);      // Reset lỗi
//             laySachTheoMaSach(maSachNumber)
//                 .then((sachData) => { // Đổi tên biến để tránh trùng
//                     setSach(sachData);
//                     setDangTaiDuLieu(false);
//                 })
//                 .catch((error: any) => { // Thêm kiểu cho error
//                     setBaoLoi(error.message || "Lỗi khi tải thông tin sách."); // Thông báo lỗi rõ ràng hơn
//                     setDangTaiDuLieu(false);
//                 });
//         } else {
//             // Xử lý trường hợp maSachNumber không hợp lệ
//             setBaoLoi("Mã sách không hợp lệ.");
//             setDangTaiDuLieu(false);
//             setSach(null);
//         }
//     }, [maSachNumber]); // Thay đổi dependency thành maSachNumber
//
//     // Xử lý trạng thái Loading
//     if (dangTaiDuLieu) {
//         return (
//             <div className="container text-center mt-5">
//                 <h1>Đang tải dữ liệu...</h1>
//                 {/* Có thể thêm spinner ở đây */}
//             </div>
//         );
//     }
//
//     // Xử lý trạng thái Lỗi
//     if (baoLoi) {
//         return (
//             <div className="container mt-5">
//                 <div className="alert alert-danger">
//                     <h1>Gặp lỗi:</h1>
//                     <p>{baoLoi}</p>
//                     <Link to="/" className="btn btn-primary">Về trang chủ</Link>
//                 </div>
//             </div>
//         );
//     }
//
//     // Xử lý Sách không tồn tại (sau khi đã hết loading và không có lỗi)
//     if (!sach) {
//         return (
//             <div className="container mt-5 text-center">
//                 <h1>Sách không tồn tại!</h1>
//                 <Link to="/" className="btn btn-primary">Về trang chủ</Link>
//             </div>
//         );
//     }
//
//     // --- Render giao diện khi có dữ liệu sách ---
//     return (
//         <div className="container">
//             <div className="row mt-4 mb-4">
//                 {/* Cột hình ảnh */}
//                 <div className="col-md-4 mb-3"> {/* Sử dụng col-md để responsive */}
//                     <HinhAnhSanPham maSach={maSachNumber} />
//                 </div>
//
//                 {/* Cột thông tin và mua hàng */}
//                 <div className="col-md-8">
//                     {/* Thông tin cơ bản */}
//                     <h1>{sach.tenSach}</h1>
//                     <div className="mb-2">
//                         {/* Render sao đánh giá */}
//                         <span className="me-2">{renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}</span>
//                         {/* Có thể thêm số lượt đánh giá nếu có */}
//                     </div>
//                     {/* Giá */}
//                     <div className="mb-3">
//                         {sach.giaNiemYet && sach.giaNiemYet > (sach.giaBan || 0) && (
//                             <span className="text-decoration-line-through text-secondary me-2">
//                                   {dinhDangSo(sach.giaNiemYet)} đ
//                               </span>
//                         )}
//                         <span className="h4 text-danger">{dinhDangSo(sach.giaBan)} đ</span>
//                         {sach.giaNiemYet && sach.giaBan && sach.giaNiemYet > sach.giaBan && (
//                             <span className="badge bg-danger ms-2">
//                                    -{Math.round(((sach.giaNiemYet - sach.giaBan) / sach.giaNiemYet) * 100)}%
//                               </span>
//                         )}
//                     </div>
//                     <hr />
//
//                     {/* Mô tả */}
//                     <div className="mb-3">
//                         <strong>Mô tả:</strong>
//                         <div dangerouslySetInnerHTML={{ __html: (sach.moTa || "Chưa có mô tả.") }} />
//                     </div>
//                     <hr />
//
//                     {/* Số lượng tồn kho (nếu muốn hiển thị) */}
//                     <p className="text-muted">Số lượng tồn: {sach.soLuong || 0}</p>
//
//                     {/* Phần chọn số lượng và mua hàng */}
//                     <div className="row align-items-center mb-3">
//                         <div className="col-lg-3 col-md-4 mb-2 mb-md-0">Số lượng:</div>
//                         <div className="col-lg-4 col-md-5">
//                             <div className="input-group input-group-sm" style={{ maxWidth: "150px" }}>
//                                 <button className="btn btn-outline-secondary" type="button" onClick={giamSoLuong} disabled={soLuong <= 1}>-</button>
//                                 <input
//                                     type="number" // Giữ type number nhưng có thể thêm CSS để ẩn mũi tên nếu muốn
//                                     className="form-control text-center"
//                                     value={soLuong}
//                                     min="1"
//                                     max={sach.soLuong || 1} // Thêm max
//                                     onChange={handleSoLuongChange}
//                                     aria-label="Số lượng"
//                                     style={{ MozAppearance: 'textfield' }} // Ẩn mũi tên trên Firefox
//                                 />
//                                 <button className="btn btn-outline-secondary" type="button" onClick={tangSoLuong} disabled={soLuong >= (sach.soLuong || 0)}>+</button>
//                             </div>
//                         </div>
//                     </div>
//
//
//                     {/* Tổng tiền tạm tính */}
//                     {sach.giaBan && (
//                         <div className="mb-3">
//                             <h5>Tạm tính: <span className="text-danger">{dinhDangSo(soLuong * sach.giaBan)} đ</span></h5>
//                         </div>
//                     )}
//
//                     {/* Nút Mua ngay và Thêm vào giỏ */}
//                     <div className="d-grid gap-2 d-md-block mb-3"> {/* Responsive button layout */}
//                         {/* <button type="button" className="btn btn-danger me-md-2 mb-2 mb-md-0" onClick={handleMuaNgay}>Mua ngay</button> */}
//                         <button
//                             type="button"
//                             className="btn btn-outline-primary"
//                             onClick={handleThemVaoGioHang}
//                             disabled={thongBaoThemGioHang === "Đang thêm..." || (sach.soLuong || 0) < 1} // Disable nếu đang thêm hoặc hết hàng
//                         >
//                             <i className="fas fa-cart-plus me-1"></i> {/* Icon giỏ hàng */}
//                             {thongBaoThemGioHang === "Đang thêm..." ? "Đang thêm..." : "Thêm vào giỏ hàng"}
//                         </button>
//                     </div>
//                     {/* Hiển thị thông báo thêm giỏ hàng */}
//                     {thongBaoThemGioHang && !thongBaoThemGioHang.includes("Đang thêm...") && (
//                         <div className={`mt-2 alert ${thongBaoThemGioHang.startsWith('Lỗi:') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert" style={{fontSize: '0.9em', padding: '0.5rem 1rem'}}>
//                             {thongBaoThemGioHang}
//                             <button type="button" className="btn-close" style={{padding: '0.5rem 1rem'}} onClick={() => setThongBaoThemGioHang(null)} aria-label="Close"></button>
//                         </div>
//                     )}
//
//                     {/* Thông báo hết hàng */}
//                     {(sach.soLuong || 0) < 1 && (
//                         <div className="alert alert-warning mt-3">Sản phẩm này đã hết hàng!</div>
//                     )}
//                 </div>
//             </div>
//
//             {/* Phần Đánh giá sản phẩm */}
//             <hr className="my-4" />
//             <div className="row mb-4">
//                 <div className="col-12">
//                     <h3 className="mb-3">Đánh giá sản phẩm</h3>
//                     <DanhGiaSanPham maSach={maSachNumber} />
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default ChiTietSanPham;


import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Thêm lại useNavigate
import sachModel from "../../models/sachModel";
import { laySachTheoMaSach } from "../../API/sachAPI";
import HinhAnhSanPham from "./components/hinhAnhSanPham";
import DanhGiaSanPham from "./components/danhGiaSanPham";
import renderRating from "../Utils/renderRating";
import dinhDangSo from "../Utils/dinhDangSo";
import { themSachVaoGioHangAPI } from "../../API/GioHangAPI";
// === THÊM IMPORT API YÊU THÍCH VÀ CHECK LOGIN ===
import { themVaoYeuThich, xoaKhoiYeuThich, kiemTraYeuThich } from "../../API/YeuThichAPI"; // <<< KIỂM TRA LẠI ĐƯỜNG DẪN
import { isLoggedIn } from "../Utils/authCheck"; // <<< KIỂM TRA LẠI ĐƯỜNG DẪN

const ChiTietSanPham: React.FC = () => {
    const { maSach } = useParams();
    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + '');
        if (Number.isNaN(maSachNumber)) maSachNumber = 0;
    } catch (error: any) {
        maSachNumber = 0; console.error("Error parsing maSach:", error);
    }

    // States chung
    const [sach, setSach] = useState<sachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    const [soLuong, setSoLuong] = useState(1);
    const navigate = useNavigate();
    const loggedIn = isLoggedIn();

    // States giỏ hàng
    const [thongBaoThemGioHang, setThongBaoThemGioHang] = useState<string | null>(null);
    const [dangThemGioHang, setDangThemGioHang] = useState(false);

    // === THÊM STATES YÊU THÍCH ===
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [dangXuLyYeuThich, setDangXuLyYeuThich] = useState(false);
    const [thongBaoYeuThich, setThongBaoYeuThich] = useState<string | null>(null);
    // === KẾT THÚC THÊM STATES YÊU THÍCH ===

    // Hàm xử lý tăng số lượng
    const tangSoLuong = () => {
        const soLuongTonKho = sach?.soLuong ?? 0;
        if (soLuong < soLuongTonKho) {
            setSoLuong(soLuong + 1);
        } else {
            alert("Số lượng tồn kho không đủ!");
        }
    };

    // Hàm xử lý giảm số lượng
    const giamSoLuong = () => {
        if (soLuong > 1) {
            setSoLuong(soLuong - 1);
        }
    };

    // Hàm xử lý thay đổi số lượng từ input
    const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const soLuongMoiStr = event.target.value;
            const soLuongTonKho = sach?.soLuong ?? 0;

            if (soLuongMoiStr === '') {
                setSoLuong(1); // Reset về 1 nếu rỗng
                return;
            }
            const soLuongMoi = parseInt(soLuongMoiStr);
            if (!isNaN(soLuongMoi)) {
                if (soLuongMoi < 1) setSoLuong(1);
                else if (soLuongMoi > soLuongTonKho) {
                    setSoLuong(soLuongTonKho);
                    alert("Số lượng tồn kho không đủ!");
                } else setSoLuong(soLuongMoi);
            }
        } catch (e) {
            console.error("Lỗi khi xử lý số lượng:", e); setSoLuong(1);
        }
    };

    // Hàm xử lý thêm giỏ hàng
    const handleThemVaoGioHang = async () => {
        if (!loggedIn) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!"); navigate('/dang-nhap'); return;
        }
        if (sach?.maSach) {
            setDangThemGioHang(true); setThongBaoThemGioHang("Đang thêm...");
            try {
                await themSachVaoGioHangAPI(sach.maSach, soLuong);
                setThongBaoThemGioHang("Đã thêm vào giỏ hàng thành công!");
                window.dispatchEvent(new CustomEvent('cartUpdated'));
                setTimeout(() => setThongBaoThemGioHang(null), 3000);
            } catch (error: any) {
                console.error("Lỗi khi thêm vào giỏ:", error);
                setThongBaoThemGioHang(`Lỗi: ${error.message || "Không thể thêm vào giỏ hàng."}`);
                setTimeout(() => setThongBaoThemGioHang(null), 5000);
            } finally {
                setDangThemGioHang(false);
            }
        } else {
            console.error("Không thể thêm vào giỏ: Thiếu thông tin sách.");
        }
    };

    // === THÊM HÀM XỬ LÝ TOGGLE YÊU THÍCH ===
    const handleToggleWishlist = async () => {
        if (!loggedIn) {
            alert("Vui lòng đăng nhập để sử dụng chức năng yêu thích."); navigate('/dang-nhap'); return;
        }
        if (!sach?.maSach) return;

        setDangXuLyYeuThich(true); setThongBaoYeuThich(null);
        try {
            if (isInWishlist) {
                await xoaKhoiYeuThich(sach.maSach); setIsInWishlist(false); setThongBaoYeuThich("Đã xóa khỏi yêu thích!");
            } else {
                await themVaoYeuThich(sach.maSach); setIsInWishlist(true); setThongBaoYeuThich("Đã thêm vào yêu thích!");
            }
            setTimeout(() => setThongBaoYeuThich(null), 2000);
        } catch (error: any) {
            console.error("[ChiTietSP] Lỗi xử lý yêu thích:", error);
            setThongBaoYeuThich(`Lỗi: ${error.message || "Thao tác thất bại."}`);
            setTimeout(() => setThongBaoYeuThich(null), 3000);
        } finally {
            setDangXuLyYeuThich(false);
        }
    };
    // === KẾT THÚC HÀM TOGGLE ===

    // useEffect lấy dữ liệu sách
    useEffect(() => {
        if (maSachNumber > 0) {
            setDangTaiDuLieu(true); setBaoLoi(null);
            laySachTheoMaSach(maSachNumber)
                .then((sachData) => { setSach(sachData); setDangTaiDuLieu(false); })
                .catch((error: any) => { setBaoLoi(error.message || "Lỗi tải thông tin sách."); setDangTaiDuLieu(false); });
        } else {
            setBaoLoi("Mã sách không hợp lệ."); setDangTaiDuLieu(false); setSach(null);
        }
    }, [maSachNumber]);

    // === useEffect KIỂM TRA YÊU THÍCH ===
    useEffect(() => {
        if (loggedIn && sach?.maSach && sach.maSach > 0) {
            kiemTraYeuThich(sach.maSach)
                .then(setIsInWishlist)
                .catch(err => console.warn(`[ChiTietSP] Lỗi kiểm tra yêu thích:`, err));
        } else {
            setIsInWishlist(false);
        }
    }, [sach, loggedIn]);
    // === KẾT THÚC useEffect KIỂM TRA ===

    // Render Loading/Error/Not Found
    if (dangTaiDuLieu) { return ( <div className="container text-center mt-5"><h1>Đang tải dữ liệu...</h1></div> ); }
    if (baoLoi) { return ( <div className="container mt-5"><div className="alert alert-danger"><h1>Gặp lỗi:</h1><p>{baoLoi}</p><Link to="/" className="btn btn-primary">Về trang chủ</Link></div></div> ); }
    if (!sach) { return ( <div className="container mt-5 text-center"><h1>Sách không tồn tại!</h1><Link to="/" className="btn btn-primary">Về trang chủ</Link></div> ); }

    // --- Render giao diện ---
    const soLuongTonKhoHienThi = sach.soLuong ?? 0;
    const giaBanHienThi = sach.giaBan ?? 0;
    const giaNiemYetHienThi = sach.giaNiemYet ?? 0;

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-md-4 mb-3">
                    {maSachNumber > 0 && <HinhAnhSanPham maSach={maSachNumber} />}
                </div>
                <div className="col-md-8">
                    {/* === SỬA: Thêm nút Yêu thích cạnh tiêu đề === */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h1>{sach?.tenSach || 'Tên sách không xác định'}</h1>
                        {loggedIn && (
                            <button
                                className={`btn btn-lg ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'} ms-2 p-1 lh-1`} // btn-lg
                                onClick={handleToggleWishlist}
                                disabled={dangXuLyYeuThich}
                                title={isInWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                            >
                                {dangXuLyYeuThich ? ( <span className="spinner-border spinner-border-sm" style={{width: '1.2rem', height: '1.2rem'}} role="status" aria-hidden="true"></span> ) // Lớn hơn chút
                                    : ( <i className={`fas fa-heart fs-4 ${isInWishlist ? '' : 'far'}`}></i> )} {/* fs-4 */}
                            </button>
                        )}
                    </div>
                    {/* Thông báo yêu thích */}
                    {thongBaoYeuThich && ( <div className={`alert ${thongBaoYeuThich.startsWith('Lỗi:') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert" style={{fontSize: '0.8em', padding: '0.4rem 0.8rem', marginTop: '-0.5rem', marginBottom: '0.5rem'}}> {thongBaoYeuThich} <button type="button" className="btn-close" style={{padding: '0.4rem 0.8rem'}} onClick={() => setThongBaoYeuThich(null)} aria-label="Close"></button> </div> )}
                    {/* === KẾT THÚC SỬA === */}

                    <div className="mb-2">
                        <span className="me-2">{renderRating(sach?.trungBinhXepHang || 0)}</span>
                    </div>
                    {/* Giá */}
                    <div className="mb-3">
                        {giaNiemYetHienThi > giaBanHienThi && ( <span className="text-decoration-line-through text-secondary me-2"> {dinhDangSo(giaNiemYetHienThi)} đ </span> )}
                        <span className="h4 text-danger">{dinhDangSo(giaBanHienThi)} đ</span>
                        {giaNiemYetHienThi > giaBanHienThi && ( <span className="badge bg-danger ms-2"> -{Math.round(((giaNiemYetHienThi - giaBanHienThi) / giaNiemYetHienThi) * 100)}% </span> )}
                    </div>
                    <hr />
                    {/* Mô tả */}
                    <div className="mb-3">
                        <strong>Mô tả:</strong>
                        <div dangerouslySetInnerHTML={{ __html: (sach?.moTa || "Chưa có mô tả.") }} />
                    </div>
                    <hr />
                    <p className="text-muted">Số lượng tồn: {soLuongTonKhoHienThi}</p>
                    {/* Phần chọn số lượng */}
                    <div className="row align-items-center mb-3">
                        <div className="col-lg-3 col-md-4 mb-2 mb-md-0">Số lượng:</div>
                        <div className="col-lg-4 col-md-5">
                            <div className="input-group input-group-sm" style={{ maxWidth: "150px" }}>
                                <button className="btn btn-outline-secondary" type="button" onClick={giamSoLuong} disabled={soLuong <= 1}>-</button>
                                <input
                                    type="number" className="form-control text-center" value={soLuong} min="1"
                                    max={soLuongTonKhoHienThi || 1} onChange={handleSoLuongChange} aria-label="Số lượng"
                                    style={{ MozAppearance: 'textfield' }}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={tangSoLuong} disabled={soLuong >= soLuongTonKhoHienThi}>+</button>
                            </div>
                        </div>
                    </div>
                    {/* Tổng tiền tạm tính */}
                    {giaBanHienThi > 0 && ( <div className="mb-3"> <h5>Tạm tính: <span className="text-danger">{dinhDangSo(soLuong * giaBanHienThi)} đ</span></h5> </div> )}
                    {/* Nút Mua ngay và Thêm vào giỏ */}
                    <div className="d-grid gap-2 d-md-block mb-3">
                        {/* <button type="button" className="btn btn-danger me-md-2 mb-2 mb-md-0" onClick={handleMuaNgay}>Mua ngay</button> */}
                        <button
                            type="button" className="btn btn-outline-primary" onClick={handleThemVaoGioHang}
                            disabled={dangThemGioHang || soLuongTonKhoHienThi < 1}
                        >
                            <i className="fas fa-cart-plus me-1"></i>
                            {dangThemGioHang ? "Đang thêm..." : "Thêm vào giỏ hàng"}
                        </button>
                    </div>
                    {/* Hiển thị thông báo thêm giỏ hàng */}
                    {thongBaoThemGioHang && !thongBaoThemGioHang.includes("Đang thêm...") && ( <div className={`mt-2 alert ${thongBaoThemGioHang.startsWith('Lỗi:') ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert" style={{fontSize: '0.9em', padding: '0.5rem 1rem'}}> {thongBaoThemGioHang} <button type="button" className="btn-close" style={{padding: '0.5rem 1rem'}} onClick={() => setThongBaoThemGioHang(null)} aria-label="Close"></button> </div> )}
                    {/* Thông báo hết hàng */}
                    {soLuongTonKhoHienThi < 1 && ( <div className="alert alert-warning mt-3">Sản phẩm này đã hết hàng!</div> )}
                </div>
            </div>
            {/* Phần Đánh giá */}
            <hr className="my-4" />
            <div className="row mb-4">
                <div className="col-12">
                    <h3 className="mb-3">Đánh giá sản phẩm</h3>
                    {maSachNumber > 0 && <DanhGiaSanPham maSach={maSachNumber} />}
                </div>
            </div>
        </div>
    );
};
export default ChiTietSanPham;
