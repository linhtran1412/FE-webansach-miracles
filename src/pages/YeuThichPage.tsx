//
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import SachModel from '../models/sachModel';
// import { layDanhSachYeuThich } from '../API/YeuThichAPI'; // Điều chỉnh đường dẫn nếu cần
// import { isLoggedIn } from '../layouts/Utils/authCheck'; // Điều chỉnh đường dẫn nếu cần
// import SachProps from '../layouts/products/components/sachProps'; // Dùng lại component SachProps để hiển thị
//
// const YeuThichPage: React.FC = () => {
//     const [wishlist, setWishlist] = useState<SachModel[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         if (!isLoggedIn()) {
//             alert("Vui lòng đăng nhập để xem danh sách yêu thích.");
//             navigate('/dang-nhap', { replace: true, state: { from: '/tai-khoan/yeu-thich' } });
//             return;
//         }
//
//         setLoading(true);
//         setError(null);
//
//         layDanhSachYeuThich()
//             .then(data => {
//                 setWishlist(data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 setError(err.message || "Lỗi tải danh sách yêu thích.");
//                 setLoading(false);
//                 console.error("Lỗi fetch wishlist:", err);
//             });
//     }, [navigate]);
//
//     if (loading) {
//         return <div className="container mt-4 text-center"><h5>Đang tải danh sách yêu thích...</h5></div>;
//     }
//
//     if (error) {
//         return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
//     }
//
//     return (
//         <div className="container mt-4 mb-5">
//             <h1 className="mb-4">❤️ Sách Yêu Thích</h1>
//             {wishlist.length === 0 ? (
//                 <div className="text-center p-5 border rounded bg-light">
//                     <p className="lead">Bạn chưa có sách yêu thích nào.</p>
//                     <Link to="/" className="btn btn-primary mt-3">
//                         <i className="fas fa-search me-2"></i> Khám phá sách ngay
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="row">
//                     {/* Sử dụng lại component SachProps để hiển thị sách */}
//                     {wishlist.map((sach) => (
//                         <SachProps key={sach.maSach} sach={sach} />
//                         // Lưu ý: Component SachProps gốc có nút "Thêm vào giỏ",
//                         // Bạn có thể muốn tạo một phiên bản khác hoặc tùy chỉnh SachProps
//                         // để hiển thị thêm nút "Xóa khỏi yêu thích" chẳng hạn.
//                         // Tạm thời, chỉ hiển thị như danh sách sản phẩm thông thường.
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default YeuThichPage;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation
// // Sửa lại import SachModel cho đúng cấu trúc DTO mới mà API trả về
// // import SachModel from '../models/sachModel'; // Bỏ import này
// import { SachSimpleDTO } from '../dto/SachSimpleDTO'; // <<< THÊM IMPORT DTO NÀY (Tạo file dto/SachSimpleDTO.ts nếu chưa có)
//
// import { layDanhSachYeuThich, xoaKhoiYeuThich } from '../API/YeuThichAPI'; // Thêm API xóa
// import { isLoggedIn } from '../layouts/Utils/authCheck';
// // import SachProps from '../layouts/products/components/sachProps'; // Không dùng SachProps trực tiếp ở đây nữa
//
// // <<< TẠO COMPONENT CON ĐỂ HIỂN THỊ SÁCH YÊU THÍCH >>>
// interface WishlistItemProps {
//     sach: SachSimpleDTO;
//     onRemove: (maSach: number) => void; // Hàm callback khi xóa thành công
//     isRemoving: boolean; // Trạng thái đang xóa
// }
//
// const WishlistItem: React.FC<WishlistItemProps> = ({ sach, onRemove, isRemoving }) => {
//     const defaultImage = "/images/book/abc.jpg"; // Ảnh mặc định
//
//     const handleRemoveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault(); // Ngăn link nếu nút nằm trong link
//         if (window.confirm(`Bạn có chắc muốn xóa "${sach.tenSach}" khỏi danh sách yêu thích?`)) {
//             try {
//                 await xoaKhoiYeuThich(sach.maSach);
//                 onRemove(sach.maSach); // Gọi callback để component cha cập nhật UI
//             } catch (error: any) {
//                 alert(`Lỗi khi xóa: ${error.message}`);
//             }
//         }
//     };
//
//     return (
//         <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
//             <div className="card h-100 w-100 shadow-sm product-card position-relative">
//                 {/* Nút xóa */}
//                 <button
//                     className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 p-1 lh-1"
//                     onClick={handleRemoveClick}
//                     disabled={isRemoving}
//                     title="Xóa khỏi yêu thích"
//                     style={{ zIndex: 5 }}
//                 >
//                     {isRemoving ? (
//                         <span className="spinner-border spinner-border-sm" style={{ width: '0.8rem', height: '0.8rem' }} role="status" aria-hidden="true"></span>
//                     ) : (
//                         <i className="fas fa-times"></i> // Icon dấu X
//                     )}
//                 </button>
//
//                 <Link to={`/sach/${sach.maSach}`} className="text-decoration-none text-dark d-block">
//                     <div className="card-img-top-wrapper" style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
//                         <img
//                             src={sach.hinhAnhDaiDien || defaultImage} // Dùng hinhAnhDaiDien từ DTO
//                             className="card-img-top"
//                             alt={sach.tenSach || "Hình ảnh sách"}
//                             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
//                             onError={(e) => { (e.target as HTMLImageElement).src = defaultImage; }} // Fallback nếu ảnh lỗi
//                         />
//                     </div>
//                     <div className="card-body d-flex flex-column">
//                         <h5 className="card-title fs-6 mb-2 text-truncate" title={sach.tenSach || ""}>
//                             {sach.tenSach || "Không có tên"}
//                         </h5>
//                         {/* Có thể thêm giá nếu DTO có và bạn muốn hiển thị */}
//                         {/* <div className="price mt-auto mb-2 text-danger fw-bold">
//                              {sach.giaBan ? dinhDangSo(sach.giaBan) + ' đ' : ''}
//                          </div> */}
//                     </div>
//                 </Link>
//                 {/* Có thể thêm nút "Thêm vào giỏ" nếu muốn */}
//                 {/* <div className="card-footer bg-transparent border-top-0 pb-3 pt-2">...</div> */}
//             </div>
//         </div>
//     );
// };
// // <<< KẾT THÚC COMPONENT CON >>>
//
//
// // <<< COMPONENT CHA: YeuThichPage >>>
// const YeuThichPage: React.FC = () => {
//     // <<< SỬA: Dùng SachSimpleDTO >>>
//     const [wishlist, setWishlist] = useState<SachSimpleDTO[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [removingId, setRemovingId] = useState<number | null>(null); // State theo dõi sách đang xóa
//     const navigate = useNavigate();
//     const location = useLocation(); // Dùng để trigger useEffect khi quay lại trang
//
//     // Hàm fetch dữ liệu
//     const fetchWishlist = () => {
//         console.log("YeuThichPage: Fetching wishlist..."); // Log
//         setLoading(true);
//         setError(null);
//         layDanhSachYeuThich()
//             .then(data => {
//                 console.log("YeuThichPage: Wishlist data received:", data); // Log dữ liệu nhận được
//                 // <<< SỬA: Ép kiểu data thành SachSimpleDTO[] >>>
//                 setWishlist(data as SachSimpleDTO[]);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 setError(err.message || "Lỗi tải danh sách yêu thích.");
//                 setLoading(false);
//                 console.error("YeuThichPage: Lỗi fetch wishlist:", err);
//             });
//     };
//
//     // useEffect để fetch dữ liệu KHI component mount HOẶC location thay đổi (quay lại trang)
//     useEffect(() => {
//         if (!isLoggedIn()) {
//             alert("Vui lòng đăng nhập để xem danh sách yêu thích.");
//             // Chuyển về trang đăng nhập, lưu lại trang yêu thích để quay lại sau
//             navigate('/dang-nhap', { replace: true, state: { from: location.pathname } });
//             return;
//         }
//         fetchWishlist(); // Gọi hàm fetch
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [location, navigate]); // <<< Thêm location vào dependency list
//
//     // Hàm xử lý sau khi xóa thành công (cập nhật UI)
//     const handleItemRemoved = (removedMaSach: number) => {
//         setWishlist(currentWishlist => currentWishlist.filter(sach => sach.maSach !== removedMaSach));
//         setRemovingId(null); // Reset trạng thái đang xóa
//         window.dispatchEvent(new Event('wishlistUpdated')); // Bắn sự kiện để Navbar cập nhật count
//     };
//
//     if (loading) {
//         return <div className="container mt-4 text-center"><h5>Đang tải danh sách yêu thích...</h5></div>;
//     }
//
//     // Lỗi fetch ban đầu
//     if (error && wishlist.length === 0) {
//         return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
//     }
//
//     return (
//         <div className="container mt-4 mb-5">
//             <h1 className="mb-4">❤️ Sách Yêu Thích</h1>
//             {/* Hiển thị lỗi xóa (nếu có) mà không chặn hiển thị danh sách */}
//             {error && wishlist.length > 0 && <div className="alert alert-danger">{error}</div>}
//
//             {wishlist.length === 0 ? (
//                 <div className="text-center p-5 border rounded bg-light">
//                     <p className="lead">Bạn chưa có sách yêu thích nào.</p>
//                     <Link to="/" className="btn btn-primary mt-3">
//                         <i className="fas fa-search me-2"></i> Khám phá sách ngay
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="row">
//                     {/* <<< SỬA: Dùng component WishlistItem >>> */}
//                     {wishlist.map((sach) => (
//                         <WishlistItem
//                             key={sach.maSach}
//                             sach={sach}
//                             onRemove={handleItemRemoved}
//                             isRemoving={removingId === sach.maSach} // Truyền trạng thái đang xóa
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default YeuThichPage;
//


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SachSimpleDTO } from '../dto/SachSimpleDTO';
import { layDanhSachYeuThich, xoaKhoiYeuThich } from '../API/YeuThichAPI';
import { isLoggedIn } from '../layouts/Utils/authCheck';

// --- Component con: KHÔNG gọi API; chỉ phát sự kiện xoá ---
interface WishlistItemProps {
    sach: SachSimpleDTO;
    onRemoveClick: (maSach: number, tenSach: string) => void;
    isRemoving: boolean;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ sach, onRemoveClick, isRemoving }) => {
    const defaultImage = "/images/book/abc.jpg";

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
            <div className="card h-100 w-100 shadow-sm product-card position-relative">
                <button
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 p-1 lh-1"
                    onClick={(e) => { e.preventDefault(); onRemoveClick(sach.maSach, sach.tenSach || ""); }}
                    disabled={isRemoving}
                    title="Xóa khỏi yêu thích"
                    style={{ zIndex: 5 }}
                >
                    {isRemoving
                        ? <span className="spinner-border spinner-border-sm" style={{ width: '0.8rem', height: '0.8rem' }} role="status" aria-hidden="true"></span>
                        : <i className="fas fa-times"></i>
                    }
                </button>

                <Link to={`/sach/${sach.maSach}`} className="text-decoration-none text-dark d-block">
                    <div className="card-img-top-wrapper" style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                        <img
                            src={sach.hinhAnhDaiDien || defaultImage}
                            className="card-img-top"
                            alt={sach.tenSach || "Hình ảnh sách"}
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            onError={(e) => { (e.target as HTMLImageElement).src = defaultImage; }}
                        />
                    </div>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title fs-6 mb-2 text-truncate" title={sach.tenSach || ""}>
                            {sach.tenSach || "Không có tên"}
                        </h5>
                    </div>
                </Link>
            </div>
        </div>
    );
};

// --- Component cha ---
const YeuThichPage: React.FC = () => {
    const [wishlist, setWishlist] = useState<SachSimpleDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [removingId, setRemovingId] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const load = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await layDanhSachYeuThich();
            setWishlist(data as SachSimpleDTO[]);
        } catch (e:any) {
            setError(e?.message || "Lỗi tải danh sách yêu thích.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            alert("Vui lòng đăng nhập để xem danh sách yêu thích.");
            navigate('/dang-nhap', { replace: true, state: { from: location.pathname } });
            return;
        }
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    // Gọi API xoá ở CHA
    const handleRemoveClick = async (maSach: number, tenSach: string) => {
        if (!window.confirm(`Bạn có chắc muốn xóa "${tenSach}" khỏi danh sách yêu thích?`)) return;

        const snapshot = [...wishlist];
        setRemovingId(maSach);
        // Optimistic
        setWishlist(prev => prev.filter(x => x.maSach !== maSach));

        try {
            await xoaKhoiYeuThich(maSach);    // phải await
            // (tuỳ bạn) để chắc ăn DB-sync:
            // await load();
            window.dispatchEvent(new Event('wishlistUpdated'));
        } catch (e:any) {
            // rollback nếu fail
            setWishlist(snapshot);
            alert(e?.message || "Xóa yêu thích thất bại. Vui lòng đăng nhập lại?");
            console.error("[YeuThichPage] xoaKhoiYeuThich failed:", e);
        } finally {
            setRemovingId(null);
        }
    };

    if (loading) {
        return <div className="container mt-4 text-center"><h5>Đang tải danh sách yêu thích...</h5></div>;
    }

    if (error && wishlist.length === 0) {
        return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
    }

    return (
        <div className="container mt-4 mb-5">
            <h1 className="mb-4">❤️ Sách Yêu Thích</h1>
            {error && wishlist.length > 0 && <div className="alert alert-danger">{error}</div>}

            {wishlist.length === 0 ? (
                <div className="text-center p-5 border rounded bg-light">
                    <p className="lead">Bạn chưa có sách yêu thích nào.</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        <i className="fas fa-search me-2"></i> Khám phá sách ngay
                    </Link>
                </div>
            ) : (
                <div className="row">
                    {wishlist.map((sach) => (
                        <WishlistItem
                            key={sach.maSach}
                            sach={sach}
                            isRemoving={removingId === sach.maSach}
                            onRemoveClick={handleRemoveClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default YeuThichPage;
