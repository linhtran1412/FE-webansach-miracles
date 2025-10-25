// import React, { useEffect, useState } from "react";
// import SachModel from "../../../models/sachModel";
// import {lay1AnhCuaMotSach, layToanBoAnhCuaMotSach} from "../../../API/hinhAnhAPI";
// // import { error } from "console"; // Không cần thiết nếu không dùng
// import hinhAnhModel from "../../../models/hinhAnhModel";
// import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
// import dinhDangSo from "../../Utils/dinhDangSo";
// import { themSachVaoGioHangAPI } from "../../../API/GioHangAPI"; // Thêm import API giỏ hàng
//
// interface SachPropsInterface {
//     sach: SachModel;
// }
//
// const SachProps: React.FC<SachPropsInterface> = (props) => {
//     const { sach } = props; // Destructuring props cho dễ dùng
//     const maSach: number = sach.maSach;
//
//     // State cho hình ảnh
//     const [danhSachAnh, setDanhSachAnh] = useState<hinhAnhModel[]>([]);
//     const [dangTaiAnh, setDangTaiAnh] = useState(true); // Đổi tên state loading ảnh
//     const [loiAnh, setLoiAnh] = useState<string | null>(null); // Đổi tên state lỗi ảnh
//
//     // State cho chức năng giỏ hàng
//     const [thongBaoThem, setThongBaoThem] = useState<string | null>(null);
//     const [dangThemVaoGio, setDangThemVaoGio] = useState(false); // State để disable nút
//     const navigate = useNavigate();
//
//     // useEffect để tải ảnh sản phẩm
//     useEffect(() => {
//         // Chỉ gọi API nếu maSach hợp lệ
//         if (maSach > 0) {
//             setDangTaiAnh(true);
//             setLoiAnh(null);
//             // Sửa: Gọi lay1AnhCuaMotSach thay vì layToanBoAnhCuaMotSach để lấy ảnh đại diện
//             // Giả sử lay1AnhCuaMotSach trả về mảng chứa 1 ảnh hoặc mảng rỗng
//             lay1AnhCuaMotSach(maSach).then(
//                 hinhAnhData => {
//                     setDanhSachAnh(hinhAnhData);
//                     setDangTaiAnh(false);
//                 }
//             ).catch(
//                 (error: any) => { // Thêm kiểu cho error
//                     console.error("Lỗi khi tải ảnh:", error); // Log lỗi ra console
//                     setLoiAnh(error.message || "Lỗi tải ảnh.");
//                     setDangTaiAnh(false);
//                 }
//             );
//         } else {
//             setDangTaiAnh(false);
//             setLoiAnh("Mã sách không hợp lệ.");
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [maSach]); // Chỉ chạy lại khi maSach thay đổi
//
//     // Hàm xử lý thêm vào giỏ hàng
//     const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault(); // Ngăn link chuyển trang nếu nút nằm trong Link
//         event.stopPropagation(); // Ngăn sự kiện nổi bọt lên Link cha (nếu có)
//
//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("Vui lòng đăng nhập để thêm vào giỏ hàng.");
//             navigate('/dang-nhap');
//             return;
//         }
//
//         // Kiểm tra xem sách có còn hàng không
//         if (!sach || (sach.soLuong !== undefined && sach.soLuong < 1)) {
//             alert("Sản phẩm này đã hết hàng!");
//             return;
//         }
//
//
//         setDangThemVaoGio(true); // Bắt đầu loading
//         setThongBaoThem("Đang thêm...");
//         try {
//             await themSachVaoGioHangAPI(maSach, 1); // Thêm 1 sản phẩm
//             setThongBaoThem("Đã thêm!");
//             // Cập nhật số lượng trên icon giỏ hàng (nếu có state quản lý global)
//             // window.dispatchEvent(new CustomEvent('cartUpdated'));
//             setTimeout(() => setThongBaoThem(null), 2000); // Ẩn thông báo thành công sau 2s
//         } catch (error: any) {
//             console.error("Lỗi khi thêm vào giỏ hàng:", error);
//             setThongBaoThem(`Lỗi: ${error.message || "Không thể thêm."}`);
//             setTimeout(() => setThongBaoThem(null), 3000); // Giữ thông báo lỗi lâu hơn (3s)
//         } finally {
//             setDangThemVaoGio(false); // Kết thúc loading dù thành công hay thất bại
//         }
//     };
//
//     // Xử lý hiển thị ảnh
//     let duLieuAnh: string = "/path/to/default/image.jpg"; // Đường dẫn ảnh mặc định
//     if (!dangTaiAnh && danhSachAnh.length > 0 && danhSachAnh[0].duLieuAnh) {
//         duLieuAnh = danhSachAnh[0].duLieuAnh;
//     } else if (!dangTaiAnh && loiAnh) {
//         // Có thể hiển thị một ảnh báo lỗi hoặc giữ ảnh mặc định
//         console.warn("Không thể tải ảnh cho sách:", maSach, loiAnh);
//     }
//
//     // CSS cho thông báo nhỏ
//     const notificationStyle: React.CSSProperties = {
//         position: 'absolute',
//         bottom: '-25px', // Điều chỉnh vị trí dưới nút
//         left: '50%',
//         transform: 'translateX(-50%)',
//         fontSize: '0.75em', // Kích thước nhỏ hơn
//         padding: '2px 8px',
//         borderRadius: '5px',
//         color: 'white',
//         whiteSpace: 'nowrap',
//         zIndex: 10, // Đảm bảo hiển thị trên các phần tử khác
//         textAlign: 'center',
//     };
//
//
//     return (
//         // Sử dụng thẻ article hoặc div với class `product-card` để dễ dàng style hơn
//         <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
//             {/* Card */}
//             <div className="card h-100 w-100 shadow-sm product-card"> {/* Thêm class và shadow */}
//                 {/* Link bao quanh ảnh và tiêu đề */}
//                 <Link to={`/sach/${sach.maSach}`} className="text-decoration-none text-dark">
//                     {/* Ảnh sản phẩm */}
//                     <div className="card-img-top-wrapper" style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
//                         {dangTaiAnh ? (
//                             <div className="spinner-border spinner-border-sm" role="status">
//                                 <span className="visually-hidden">Loading...</span>
//                             </div>
//                         ) : (
//                             <img
//                                 src={duLieuAnh}
//                                 className="card-img-top"
//                                 alt={sach.tenSach || "Hình ảnh sách"}
//                                 style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} // contain để giữ tỷ lệ ảnh
//                             />
//                         )}
//                     </div>
//                     {/* Phần thân card */}
//                     <div className="card-body d-flex flex-column"> {/* flex-column để đẩy nút xuống dưới */}
//                         {/* Tiêu đề sách */}
//                         <h5 className="card-title fs-6 mb-2 text-truncate" title={sach.tenSach || ""}> {/* fs-6, text-truncate */}
//                             {sach.tenSach || "Không có tên"}
//                         </h5>
//                         {/* Mô tả ngắn (nếu có, hoặc bỏ đi) */}
//                         {/* <p className="card-text small text-muted text-truncate">{sach.moTa || ""}</p> */}
//
//                         {/* Giá */}
//                         <div className="price mt-auto mb-2"> {/* mt-auto đẩy giá và nút xuống dưới */}
//                             {sach.giaNiemYet && sach.giaNiemYet > (sach.giaBan ?? 0) && (
//                                 <span className="original-price text-muted text-decoration-line-through small me-2">
//                                      {dinhDangSo(sach.giaNiemYet)} đ
//                                  </span>
//                             )}
//                             <span className="discounted-price fw-bold text-danger">
//                                  {dinhDangSo(sach.giaBan)} đ
//                              </span>
//                         </div>
//                     </div>
//                 </Link> {/* Kết thúc Link */}
//
//                 {/* Phần chân card chứa nút */}
//                 <div className="card-footer bg-transparent border-top-0 pb-3 pt-2"> {/* Footer riêng cho nút */}
//                     <div className="d-grid gap-2 d-sm-flex justify-content-between align-items-center"> {/* Flex layout cho nút */}
//                         {/* Nút thêm vào giỏ hàng */}
//                         <div className="flex-grow-1 position-relative me-sm-1 mb-1 mb-sm-0"> {/* Thêm position-relative */}
//                             <button
//                                 className="btn btn-sm btn-danger w-100" // btn-sm, w-100
//                                 onClick={handleAddToCart}
//                                 disabled={dangThemVaoGio || (sach.soLuong !== undefined && sach.soLuong < 1)} // Disable khi đang thêm hoặc hết hàng
//                                 title={ (sach.soLuong !== undefined && sach.soLuong < 1) ? "Hết hàng" : "Thêm vào giỏ hàng"} // Tooltip
//                             >
//                                 <i className="fas fa-shopping-cart me-1"></i> {/* Icon */}
//                                 { (sach.soLuong !== undefined && sach.soLuong < 1) ? "Hết hàng" : "Thêm"} {/* Text nút */}
//                             </button>
//                             {/* Hiển thị thông báo nhỏ */}
//                             {thongBaoThem && (
//                                 <span style={{
//                                     ...notificationStyle, // Áp dụng style cơ bản
//                                     backgroundColor: thongBaoThem.startsWith('Lỗi:') ? '#dc3545' : '#198754', // Màu nền dựa trên thông báo
//                                 }}>
//                                       {thongBaoThem}
//                                   </span>
//                             )}
//                         </div>
//
//                         {/* Nút yêu thích (tạm thời) */}
//                         {/*
//                            <div className="flex-shrink-0">
//                                <button className="btn btn-sm btn-outline-secondary" onClick={(e) => {e.preventDefault(); alert("Chức năng Yêu thích chưa có!");}} title="Thêm vào yêu thích">
//                                    <i className="fas fa-heart"></i>
//                                </button>
//                            </div>
//                            */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default SachProps;



import React, { useEffect, useState } from "react";
import SachModel from "../../../models/sachModel";
import { lay1AnhCuaMotSach } from "../../../API/hinhAnhAPI";
import hinhAnhModel from "../../../models/hinhAnhModel";
import { Link, useNavigate } from "react-router-dom";
import dinhDangSo from "../../Utils/dinhDangSo";
import { themSachVaoGioHangAPI } from "../../../API/GioHangAPI";
// === THÊM IMPORT API YÊU THÍCH ===
import { themVaoYeuThich, xoaKhoiYeuThich, kiemTraYeuThich } from "../../../API/YeuThichAPI"; // <<< KIỂM TRA LẠI ĐƯỜNG DẪN
import { isLoggedIn } from "../../Utils/authCheck"; // Import hàm kiểm tra đăng nhập

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {
    const { sach } = props;
    const maSach: number = sach.maSach;

    // States cho ảnh
    const [danhSachAnh, setDanhSachAnh] = useState<hinhAnhModel[]>([]);
    const [dangTaiAnh, setDangTaiAnh] = useState(true);
    const [loiAnh, setLoiAnh] = useState<string | null>(null);

    // States cho giỏ hàng
    const [thongBaoThemGioHang, setThongBaoThemGioHang] = useState<string | null>(null);
    const [dangThemGioHang, setDangThemGioHang] = useState(false);

    // === THÊM STATES CHO YÊU THÍCH ===
    const [isInWishlist, setIsInWishlist] = useState(false); // Trạng thái yêu thích
    const [dangXuLyYeuThich, setDangXuLyYeuThich] = useState(false); // Loading cho nút yêu thích
    const [thongBaoYeuThich, setThongBaoYeuThich] = useState<string | null>(null); // Thông báo yêu thích
    // === KẾT THÚC THÊM STATES ===

    const navigate = useNavigate();
    const loggedIn = isLoggedIn(); // Kiểm tra đăng nhập 1 lần

    // useEffect tải ảnh
    useEffect(() => {
        if (maSach > 0) {
            setDangTaiAnh(true); setLoiAnh(null);
            lay1AnhCuaMotSach(maSach).then(hinhAnhData => {
                setDanhSachAnh(hinhAnhData); setDangTaiAnh(false);
            }).catch((error: any) => {
                console.error(`[SachProps] Lỗi tải ảnh sách ${maSach}:`, error);
                setLoiAnh(error.message || "Lỗi tải ảnh."); setDangTaiAnh(false);
            });
        } else {
            setDangTaiAnh(false); setLoiAnh("Mã sách không hợp lệ.");
        }
    }, [maSach]);

    // === useEffect KIỂM TRA TRẠNG THÁI YÊU THÍCH KHI LOGIN ===
    useEffect(() => {
        if (loggedIn && maSach > 0) {
            kiemTraYeuThich(maSach)
                .then(result => {
                    setIsInWishlist(result);
                })
                .catch(err => {
                    console.warn(`[SachProps] Lỗi kiểm tra yêu thích sách ${maSach}:`, err);
                });
        } else {
            setIsInWishlist(false); // Reset nếu chưa đăng nhập
        }
    }, [maSach, loggedIn]); // Chạy lại khi mã sách hoặc trạng thái đăng nhập thay đổi

    // Hàm xử lý thêm vào giỏ hàng
    const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); event.stopPropagation();
        if (!loggedIn) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng."); navigate('/dang-nhap'); return;
        }
        if (!sach || (sach.soLuong !== undefined && sach.soLuong < 1)) {
            alert("Sản phẩm này đã hết hàng!"); return;
        }
        setDangThemGioHang(true); setThongBaoThemGioHang("Đang thêm...");
        try {
            await themSachVaoGioHangAPI(maSach, 1); setThongBaoThemGioHang("Đã thêm!");
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            setTimeout(() => setThongBaoThemGioHang(null), 2000);
        } catch (error: any) {
            console.error("[SachProps] Lỗi thêm vào giỏ:", error); setThongBaoThemGioHang(`Lỗi: ${error.message || "Không thể thêm."}`);
            setTimeout(() => setThongBaoThemGioHang(null), 3000);
        } finally { setDangThemGioHang(false); }
    };

    // === HÀM XỬ LÝ TOGGLE YÊU THÍCH ===
    const handleToggleWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); event.stopPropagation();
        if (!loggedIn) {
            alert("Vui lòng đăng nhập để sử dụng chức năng yêu thích."); navigate('/dang-nhap'); return;
        }
        setDangXuLyYeuThich(true); setThongBaoYeuThich(null);

        try {
            if (isInWishlist) {
                // Đang yêu thích -> Xóa
                await xoaKhoiYeuThich(maSach);
                setIsInWishlist(false);
                setThongBaoYeuThich("Đã xóa!");
            } else {
                // Chưa yêu thích -> Thêm
                await themVaoYeuThich(maSach);
                setIsInWishlist(true);
                setThongBaoYeuThich("Đã thích!");
            }
            setTimeout(() => setThongBaoYeuThich(null), 2000); // Ẩn thông báo sau 2s
        } catch (error: any) {
            console.error("[SachProps] Lỗi xử lý yêu thích:", error);
            setThongBaoYeuThich(`Lỗi: ${error.message || "Thao tác thất bại."}`);
            setTimeout(() => setThongBaoYeuThich(null), 3000); // Giữ lỗi lâu hơn
        } finally {
            setDangXuLyYeuThich(false);
        }
    };
    // === KẾT THÚC HÀM TOGGLE ===

    // Xử lý hiển thị ảnh
    let duLieuAnh: string = "/images/book/abc.jpg"; // <<< SỬA LẠI ĐƯỜNG DẪN ẢNH MẶC ĐỊNH CHO ĐÚNG
    if (!dangTaiAnh && danhSachAnh.length > 0 && danhSachAnh[0].duLieuAnh) {
        duLieuAnh = danhSachAnh[0].duLieuAnh;
    } else if (!dangTaiAnh && loiAnh) {
        console.warn("[SachProps] Không tải được ảnh sách:", maSach, loiAnh);
    }

    // CSS cho thông báo nhỏ
    const notificationStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '-25px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.75em',
        padding: '2px 8px',
        borderRadius: '5px',
        color: 'white',
        whiteSpace: 'nowrap',
        zIndex: 10,
        textAlign: 'center',
    };

    // CSS cho thông báo yêu thích (phía trên nút yêu thích)
    const wishlistNotificationStyle: React.CSSProperties = {
        position: 'absolute',
        top: '-25px',
        right: '0.5rem',
        transform: 'translateX(0)',
        fontSize: '0.7em',
        padding: '2px 6px',
        borderRadius: '4px',
        color: 'white',
        whiteSpace: 'nowrap',
        zIndex: 15,
    };

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
            <div className="card h-100 w-100 shadow-sm product-card position-relative">

                {/* === NÚT YÊU THÍCH (ABSOLUTE) === */}
                {loggedIn && (
                    <button
                        className={`btn btn-sm position-absolute top-0 end-0 m-2 p-1 lh-1 ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={handleToggleWishlist}
                        disabled={dangXuLyYeuThich}
                        title={isInWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                        style={{ zIndex: 5 }}
                    >
                        {dangXuLyYeuThich ? (
                            <span className="spinner-border spinner-border-sm" style={{ width: '0.8rem', height: '0.8rem' }} role="status" aria-hidden="true"></span>
                        ) : (
                            <i className={`fas fa-heart ${isInWishlist ? '' : 'far'}`}></i>
                        )}
                        {/* Thông báo yêu thích nhỏ */}
                        {thongBaoYeuThich && (
                            <span style={{
                                ...wishlistNotificationStyle,
                                backgroundColor: thongBaoYeuThich.startsWith('Lỗi:') ? '#dc3545' : '#6c757d',
                            }}>
                                 {thongBaoYeuThich}
                             </span>
                        )}
                    </button>
                )}
                {/* === KẾT THÚC NÚT YÊU THÍCH === */}

                <Link to={`/sach/${sach.maSach}`} className="text-decoration-none text-dark d-block">
                    <div className="card-img-top-wrapper" style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                        {dangTaiAnh ? ( <div className="spinner-border spinner-border-sm"><span className="visually-hidden">...</span></div> )
                            : ( <img src={duLieuAnh} className="card-img-top" alt={sach.tenSach || "Hình ảnh sách"} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} /> )}
                    </div>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title fs-6 mb-2 text-truncate" title={sach.tenSach || ""}>
                            {sach.tenSach || "Không có tên"}
                        </h5>
                        <div className="price mt-auto mb-2">
                            {sach.giaNiemYet && sach.giaNiemYet > (sach.giaBan ?? 0) && (
                                <span className="original-price text-muted text-decoration-line-through small me-2">
                                     { dinhDangSo(sach.giaNiemYet)} đ
                                </span>
                            )}
                            <span className="discounted-price fw-bold text-danger">
                               { dinhDangSo(sach.giaBan)} đ
                            </span>
                        </div>
                    </div>
                </Link>

                <div className="card-footer bg-transparent border-top-0 pb-3 pt-2">
                    <div className="d-grid gap-2 position-relative">
                        <button
                            className="btn btn-sm btn-danger w-100"
                            onClick={handleAddToCart}
                            disabled={dangThemGioHang || (sach.soLuong !== undefined && sach.soLuong < 1)}
                            title={ (sach.soLuong !== undefined && sach.soLuong < 1) ? "Hết hàng" : "Thêm vào giỏ hàng"}
                        >
                            <i className="fas fa-shopping-cart me-1"></i>
                            { (sach.soLuong !== undefined && sach.soLuong < 1) ? "Hết hàng" : "Thêm"}
                        </button>
                        {thongBaoThemGioHang && (
                            <span style={{
                                ...notificationStyle,
                                backgroundColor: thongBaoThemGioHang.startsWith('Lỗi:') ? '#dc3545' : '#198754',
                            }}>
                                {thongBaoThemGioHang}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SachProps;
