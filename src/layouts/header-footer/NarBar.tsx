import React, { ChangeEvent, useState, useEffect } from "react"; // Thêm useEffect
import { Link, NavLink, useNavigate } from "react-router-dom"; // Thêm useNavigate
// import { MenuButton, Search } from "react-bootstrap-icons"; // MenuButton không được dùng, Search dùng rồi
import { Search } from "react-bootstrap-icons";
// import { isToken } from "../Utils/JwtService"; // Hàm này chưa được dùng, ta sẽ kiểm tra token trực tiếp hoặc tạo lại nếu cần

// --- THÊM IMPORT API GIỎ HÀNG ---
import { layGioHang } from "../../API/GioHangAPI"; // Kiểm tra lại đường dẫn này!

interface NavbarProps {
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');
    const navigate = useNavigate(); // Dùng để chuyển hướng sau khi logout

    // --- THÊM STATE CHO SỐ LƯỢNG GIỎ HÀNG VÀ TRẠNG THÁI ĐĂNG NHẬP ---
    const [soLuongTrongGio, setSoLuongTrongGio] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token')); // Kiểm tra token khi component load

    // Hàm kiểm tra token (có thể dùng lại hàm isToken nếu nó chỉ làm việc này)
    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    // Hàm lấy số lượng giỏ hàng từ API
    const fetchCartCount = () => {
        if (checkLoginStatus()) { // Chỉ gọi API nếu đã đăng nhập
            layGioHang()
                .then(cart => {
                    if (cart && cart.danhSachChiTietGioHang) {
                        // Tính tổng số lượng của tất cả các item trong giỏ
                        const count = cart.danhSachChiTietGioHang.reduce((total, item) => total + item.soLuong, 0);
                        setSoLuongTrongGio(count);
                    } else {
                        setSoLuongTrongGio(0); // Đặt là 0 nếu giỏ hàng rỗng hoặc có lỗi nhẹ
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
                    setSoLuongTrongGio(0); // Đặt là 0 nếu có lỗi API
                });
        } else {
            setSoLuongTrongGio(0); // Reset về 0 nếu không đăng nhập
        }
    };

    // --- DÙNG useEffect ĐỂ LẤY SỐ LƯỢNG KHI LOAD VÀ KHI ĐĂNG NHẬP/ĐĂNG XUẤT ---
    useEffect(() => {
        setIsLoggedIn(checkLoginStatus()); // Cập nhật trạng thái đăng nhập
        fetchCartCount(); // Lấy số lượng giỏ hàng

        // === Lắng nghe sự kiện tùy chỉnh để cập nhật giỏ hàng ===
        // Hàm xử lý khi có sự kiện 'cartUpdated'
        const handleCartUpdate = () => {
            console.log("Navbar: Received cartUpdated event"); // Debug
            fetchCartCount(); // Gọi lại hàm fetch số lượng
        };

        // Đăng ký lắng nghe sự kiện
        window.addEventListener('cartUpdated', handleCartUpdate);
        console.log("Navbar: Added cartUpdated event listener"); // Debug

        // Hủy đăng ký khi component unmount
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            console.log("Navbar: Removed cartUpdated event listener"); // Debug
        };
        // Chạy lại effect này khi trạng thái đăng nhập thay đổi (ví dụ sau khi login/logout)
        // Tuy nhiên, việc login/logout thường gây reload trang hoặc thay đổi state ở App.tsx,
        // nên việc fetch lại dựa trên checkLoginStatus() thường đã đủ.
    }, []); // Chỉ chạy một lần khi mount để đăng ký listener


    // Hàm xử lý tìm kiếm
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTamThoi(e.target.value);
    }
    const handleSearch = () => {
        setTuKhoaTimKiem(tuKhoaTamThoi);
        // Có thể thêm navigate đến trang kết quả tìm kiếm nếu cần
        // navigate(`/tim-kiem?tuKhoa=${tuKhoaTamThoi}`);
    }

    // // --- HÀM XỬ LÝ ĐĂNG XUẤT ---
    // const handleLogout = () => {
    //     localStorage.removeItem('token'); // Xóa token
    //     setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    //     setSoLuongTrongGio(0); // Reset số lượng giỏ hàng trên UI
    //     // Thông báo cho các component khác (nếu cần) - không bắt buộc nếu dùng reload
    //     // window.dispatchEvent(new CustomEvent('logout'));
    //     navigate("/"); // Chuyển về trang chủ
    //     // window.location.reload(); // Hoặc reload lại trang để reset hoàn toàn (cách đơn giản nhất)
    // };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRoles'); // <<< XÓA ROLES KHI LOGOUT
        window.dispatchEvent(new Event('authChange')); // <<< BẮN SỰ KIỆN
        navigate("/");
        // window.location.reload(); // Có thể reload để đảm bảo reset hoàn toàn
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"> {/* Thêm sticky-top */}
            <div className="container-fluid">
                {/* Brand và Toggler */}
                <NavLink className="navbar-brand" to="/">Miracles</NavLink> {/* Dùng NavLink */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Phần menu */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/" end>Trang chủ</NavLink> {/* Thêm 'end' cho NavLink trang chủ */}
                        </li>
                        {/* Dropdown Thể loại */}
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại sách
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                {/* Nên fetch danh sách thể loại từ API thay vì hardcode */}
                                <li><NavLink className="dropdown-item" to="/the-loai/1">Sách khoa học </NavLink></li>
                                <li><NavLink className="dropdown-item" to="/the-loai/2">Giáo trình </NavLink></li>
                                <li><NavLink className="dropdown-item" to="/the-loai/3">Từ điển </NavLink></li>
                                <li><NavLink className="dropdown-item" to="/the-loai/4">Tiểu thuyết</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/the-loai/5">Truyện tranh </NavLink></li>
                            </ul>
                        </li>
                        {/* Dropdown Quy định (Nếu là link tĩnh thì dùng NavLink) */}
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Quy định bán hàng
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <li><a className="dropdown-item" href="/quydinh1.html" target="_blank" rel="noopener noreferrer">Mua hàng và thanh toán </a></li>
                                <li><a className="dropdown-item" href="/quydinh2.html" target="_blank" rel="noopener noreferrer">Vận chuyển và giao hàng </a></li>
                            </ul>
                        </li>
                        {/* Link Liên hệ */}

                        {/*<li className="nav-item">*/}
                        {/*    <NavLink className="nav-link" to="/lien-he">Liên hệ</NavLink> /!* Trỏ đến trang /lien-he *!/*/}
                        {/*</li>*/}

                        {/* Link Admin (chỉ hiện khi là admin?) - Cần logic kiểm tra role phức tạp hơn */}
                        {/* {isAdmin && <li className="nav-item"><NavLink className="nav-link" to="/admin">Quản trị</NavLink></li>} */}
                    </ul>

                    {/* Phần Tìm kiếm */}
                    <form className="d-flex mx-lg-auto" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}> {/* Dùng form và onSubmit */}
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Tìm kiếm sách..."
                            aria-label="Search"
                            onChange={onSearchInputChange}
                            value={tuKhoaTamThoi}
                        />
                        <button className="btn btn-outline-success" type="submit"><Search/></button> {/* type="submit" */}
                    </form>

                    {/* Phần icon bên phải */}
                    <div className='d-flex align-items-center ms-lg-2'> {/* Thêm ms-lg-2 để tạo khoảng cách */}
                        {/* Biểu tượng giỏ hàng */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {/* --- SỬA LINK VÀ THÊM BADGE --- */}
                                <NavLink className="nav-link position-relative me-2" to="/gio-hang" aria-label="Giỏ hàng"> {/* Dùng NavLink, thêm aria-label */}
                                    <i className="fas fa-shopping-cart fs-5"></i> {/* Tăng kích thước icon */}
                                    {isLoggedIn && soLuongTrongGio > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6em' }}> {/* Style nhỏ hơn */}
                                            {soLuongTrongGio > 99 ? '99+' : soLuongTrongGio} {/* Giới hạn số hiển thị */}
                                            <span className="visually-hidden">sản phẩm trong giỏ</span>
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        </ul>

                        {/* --- Icons Đăng nhập/Đăng ký / Logout --- */}
                        {isLoggedIn ? (
                            // Nếu đã đăng nhập
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" to="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user me-1"></i> Tài khoản
                                    </NavLink>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarUserDropdown"> {/* Thêm dropdown-menu-end */}
                                        <li><NavLink className="dropdown-item" to="/tai-khoan/ho-so">Hồ sơ</NavLink></li> {/* Link đến trang profile */}
                                        <li><NavLink className="dropdown-item" to="/tai-khoan/don-hang">Đơn hàng của tôi</NavLink></li> {/* Link xem đơn hàng */}
                                        {/* Thêm link quản trị nếu là admin */}
                                        {/* {isAdmin && <li><hr className="dropdown-divider"/></li>}
                                         {isAdmin && <li><NavLink className="dropdown-item" to="/admin">Trang quản trị</NavLink></li>} */}
                                        <li><hr className="dropdown-divider"/></li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        ) : (
                            // Nếu chưa đăng nhập
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dang-nhap">Đăng nhập</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-outline-light btn-sm ms-2" to="/dang-ky">Đăng ký</NavLink> {/* Dùng button style */}
                                </li>
                            </ul>
                        )}
                        {/* --- Hết phần Icons --- */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;