// // import React, { useState } from 'react';
// // import './App.css';
// // import {BrowserRouter, Route, Routes} from "react-router-dom";
// // import Navbar from "./layouts/header-footer/NarBar";
// // import HomePage from "./layouts/homePage/hompage";
// // import About from "./layouts/about/About";
// // import ChiTietSanPham from "./layouts/products/chiTietSanPham";
// // import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
// // import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
// // import DangNhap from "./layouts/nguoiDung/dangNhap";
// // import Test from "./layouts/nguoiDung/text";
// // import SachForm from "./layouts/admin/sachForm";
// // import Footer from "./layouts/header-footer/Footer";
// // import ADPage from "./LayoutAD/ADPage/ADPage";
// // import NavBarAD from "./LayoutAD/header-footer_AD/Narbar_AD";
// //
// //
// // // --- 1. THÊM DÒNG IMPORT NÀY ---
// // // Đảm bảo đường dẫn './pages/GioHang' là chính xác với vị trí bạn lưu file GioHang.tsx
// // import GioHang from './pages/GioHang';
// //
// //
// // function App() {
// //     const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
// //     // eslint-disable-next-line no-restricted-globals
// //     const isAdminPath = location.pathname.startsWith("/admin"); // Lưu ý: 'location' có thể cần thay bằng hook useLocation() của react-router-dom để theo dõi thay đổi path tốt hơn
// //
// //     return (
// //         <div className='App'>
// //             <BrowserRouter>
// //                 { /* Hiển thị Navbar phù hợp */ }
// //                 {isAdminPath ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
// //
// //                 {/* Routes cho người dùng thông thường */}
// //                 {!isAdminPath ? (
// //                     <Routes>
// //                         <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
// //                         <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
// //                         <Route path='/about' element={<About />} />
// //                         <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
// //                         <Route path='/dang-ky' element={<DangKyNguoiDung />} />
// //                         <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>} />
// //                         <Route path='/dang-nhap' element={<DangNhap />} />
// //                         <Route path='/test' element={<Test />} />
// //
// //                         {/* --- 2. THÊM ROUTE CHO GIỎ HÀNG Ở ĐÂY --- */}
// //                         <Route path='/gio-hang' element={<GioHang />} />
// //
// //                         {/* Route này có vẻ nên nằm trong phần admin? */}
// //                         <Route path='/admin/them-sach' element={<SachForm />} />
// //
// //                     </Routes>
// //                 ) : (
// //                     /* Routes cho Admin */
// //                     <Routes>
// //                         <Route path='/admin' element={<ADPage tuKhoaTimKiem={tuKhoaTimKiem} />} />
// //                         {/* Bạn có thể thêm các route admin khác ở đây */}
// //                         {/* Ví dụ: <Route path='/admin/quan-ly-sach' element={<QuanLySachComponent />} /> */}
// //                         {/* Route '/admin/them-sach' nên được chuyển vào đây nếu chỉ admin được truy cập */}
// //                         {/* <Route path='/admin/them-sach' element={<SachForm />} /> */}
// //                     </Routes>
// //                 )}
// //
// //                 <Footer/>
// //             </BrowserRouter>
// //         </div>
// //     );
// // }
// //
// // export default App;
//
//
//
//
// import React, { useState } from 'react';
// import './App.css';
// // Đảm bảo import hook useLocation nếu bạn muốn dùng nó thay cho location.pathname
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./layouts/header-footer/NarBar";
// import HomePage from "./layouts/homePage/hompage";
// import About from "./layouts/about/About";
// import ChiTietSanPham from "./layouts/products/chiTietSanPham";
// import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
// import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
// import DangNhap from "./layouts/nguoiDung/dangNhap";
// import Test from "./layouts/nguoiDung/text"; // Component này có thể không cần thiết nữa
// import SachForm from "./layouts/admin/sachForm"; // Nên chuyển vào route admin
// import Footer from "./layouts/header-footer/Footer";
// import ADPage from "./LayoutAD/ADPage/ADPage";
// import NavBarAD from "./LayoutAD/header-footer_AD/Narbar_AD";
//
// // Import các trang checkout
// import CheckoutAddress from './pages/checkout/CheckoutAddress';
// import CheckoutShipping from './pages/checkout/CheckoutShipping';
// import CheckoutPayment from './pages/checkout/CheckoutPayment';
// import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
//
// // Import trang giỏ hàng và lịch sử đơn hàng
// import GioHang from './pages/GioHang';
// // Đảm bảo đường dẫn này đúng tới file DonHangList của bạn
// import DonHangList from './layouts/nguoiDung/DonHangList';
//
// // Component Wrapper để sử dụng hook useLocation (cách tốt hơn location.pathname)
// const AppContent = () => {
//     const location = useLocation(); // Dùng hook useLocation
//     const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
//     const isAdminPath = location.pathname.startsWith("/admin");
//
//     return (
//         <> {/* Sử dụng Fragment để không cần thẻ div thừa */}
//             { /* Hiển thị Navbar phù hợp */ }
//             {isAdminPath ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
//
//             <div className="main-content" style={{ minHeight: 'calc(100vh - 150px)' }}> {/* Thêm class hoặc style để đảm bảo footer không bị đẩy lên */}
//                 {/* Routes cho người dùng thông thường */}
//                 {!isAdminPath ? (
//                     <Routes>
//                         <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                         <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} /> {/* Route xem theo thể loại */}
//                         <Route path='/about' element={<About />} />
//                         <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
//                         <Route path='/dang-ky' element={<DangKyNguoiDung />} />
//                         <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
//                         <Route path='/dang-nhap' element={<DangNhap />} />
//                         {/* <Route path='/test' element={<Test />} /> */} {/* Có thể bỏ route test nếu không dùng */}
//
//                         {/* Route Giỏ hàng */}
//                         <Route path='/gio-hang' element={<GioHang />} />
//
//                         {/* === THÊM CÁC ROUTE CHECKOUT VÀO ĐÂY === */}
//                         <Route path='/thanh-toan/dia-chi' element={<CheckoutAddress />} />
//                         <Route path='/thanh-toan/van-chuyen' element={<CheckoutShipping />} />
//                         <Route path='/thanh-toan/thanh-toan' element={<CheckoutPayment />} />
//                         <Route path='/dat-hang-thanh-cong/:maDonHang' element={<CheckoutSuccess />} />
//                         {/* === KẾT THÚC THÊM ROUTE CHECKOUT === */}
//
//                         {/* === THÊM ROUTE XEM LỊCH SỬ ĐƠN HÀNG === */}
//                         <Route path='/tai-khoan/don-hang' element={<DonHangList isAdmin={false} />} />
//                         {/* === KẾT THÚC THÊM ROUTE LỊCH SỬ === */}
//
//                         {/* Route '/admin/them-sach' nên chuyển vào phần Admin */}
//                         {/* <Route path='/admin/them-sach' element={<SachForm />} /> */}
//
//                     </Routes>
//                 ) : (
//                     /* Routes cho Admin */
//                     <Routes>
//                         <Route path='/admin' element={<ADPage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                         {/* === CHUYỂN ROUTE THÊM SÁCH VÀO ĐÂY === */}
//                         <Route path='/admin/them-sach' element={<SachForm />} />
//                         {/* Bạn có thể thêm các route admin khác ở đây */}
//                         {/* Ví dụ: <Route path='/admin/quan-ly-don-hang' element={<QuanLyDonHangComponent />} /> */}
//                         {/* Ví dụ: <Route path='/admin/quan-ly-nguoi-dung' element={<QuanLyNguoiDungComponent />} /> */}
//                     </Routes>
//                 )}
//             </div>
//             <Footer />
//         </>
//     );
// }
//
//
// function App() {
//     return (
//         <div className='App'>
//             <BrowserRouter>
//                 <AppContent /> {/* Sử dụng component Wrapper */}
//             </BrowserRouter>
//         </div>
//     );
// }
//
// export default App;







// import React, { useState } from 'react';
// import './App.css';
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./layouts/header-footer/NarBar";
// import HomePage from "./layouts/homePage/hompage";
// import About from "./layouts/about/About";
// import ChiTietSanPham from "./layouts/products/chiTietSanPham";
// import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
// import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
// import DangNhap from "./layouts/nguoiDung/dangNhap";
// // import Test from "./layouts/nguoiDung/text";
// import SachForm from "./layouts/admin/sachForm"; // Component Thêm Sách
// import Footer from "./layouts/header-footer/Footer";
// // Import layout/components admin
// // Đảm bảo đường dẫn này đúng
// import DanhSachSanPhamAD from "./LayoutAD/products/danhSachSanPham"; // Component Danh sách SP Admin
// import NavBarAD from "./LayoutAD/header-footer_AD/Narbar_AD";
//
// // Import các trang checkout
// import CheckoutAddress from './pages/checkout/CheckoutAddress';
// import CheckoutShipping from './pages/checkout/CheckoutShipping';
// import CheckoutPayment from './pages/checkout/CheckoutPayment';
// import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
//
// // Import trang giỏ hàng và lịch sử đơn hàng
// import GioHang from './pages/GioHang';
// import DonHangList from './layouts/nguoiDung/DonHangList';
//
// // === 1. KIỂM TRA LẠI ĐƯỜNG DẪN IMPORT NÀY ===
// // Đường dẫn đến các component bạn đã copy vào src/layouts/admin/
// import ChiTietSanPhamAD from './layouts/admin/chiTietSanPhamAD'; // Import Chi tiết SP Admin
// import SachUpdate from './layouts/admin/SachUpdate';             // Import Cập nhật SP Admin
// // === KẾT THÚC KIỂM TRA IMPORT ===
//
//
// // Component Wrapper để sử dụng hook useLocation
// const AppContent = () => {
//     const location = useLocation();
//     const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
//     const isAdminPath = location.pathname.startsWith("/admin");
//
//     return (
//         <>
//             { /* Hiển thị Navbar phù hợp */ }
//             {isAdminPath ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
//
//             <div className="main-content" style={{ minHeight: 'calc(100vh - 150px)' }}>
//                 {/* Routes cho người dùng thông thường */}
//                 {!isAdminPath ? (
//                     <Routes>
//                         <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                         <Route path='/the-loai/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                         <Route path='/about' element={<About />} />
//                         <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
//                         <Route path='/dang-ky' element={<DangKyNguoiDung />} />
//                         <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
//                         <Route path='/dang-nhap' element={<DangNhap />} />
//                         <Route path='/gio-hang' element={<GioHang />} />
//                         <Route path='/thanh-toan/dia-chi' element={<CheckoutAddress />} />
//                         <Route path='/thanh-toan/van-chuyen' element={<CheckoutShipping />} />
//                         <Route path='/thanh-toan/thanh-toan' element={<CheckoutPayment />} />
//                         <Route path='/dat-hang-thanh-cong/:maDonHang' element={<CheckoutSuccess />} />
//                         <Route path='/tai-khoan/don-hang' element={<DonHangList isAdmin={false} />} />
//                     </Routes>
//                 ) : (
//                     /* Routes cho Admin */
//                     <Routes>
//                         <Route path='/admin' element={<DanhSachSanPhamAD tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={0} setTuKhoaTimKiem={setTuKhoaTimKiem} />} />
//                         <Route path='/admin/them-sach' element={<SachForm />} />
//
//                         {/* === 2. CÁC ROUTE ADMIN MỚI CHO SÁCH === */}
//                         <Route path='/admin/sach/:maSach' element={<ChiTietSanPhamAD />} />
//                         <Route path='/admin/cap-nhat/:maSach' element={<SachUpdate />} />
//                         {/* === KẾT THÚC ROUTES MỚI === */}
//
//                         {/* Các route admin khác */}
//                     </Routes>
//                 )}
//             </div>
//             {/* Hiển thị Footer nếu không phải trang admin */}
//             {!isAdminPath && <Footer />}
//         </>
//     );
// }
//
//
// function App() {
//     return (
//         <div className='App'>
//             <BrowserRouter>
//                 <AppContent />
//             </BrowserRouter>
//         </div>
//     );
// }
//
// export default App;








// import React, { useState, useEffect } from 'react'; // Thêm useEffect
// import './App.css';
// import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom"; // Thêm Navigate
// import Navbar from "./layouts/header-footer/NarBar";
// import HomePage from "./layouts/homePage/hompage";
// import About from "./layouts/about/About";
// import ChiTietSanPham from "./layouts/products/chiTietSanPham";
// import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
// import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
// import DangNhap from "./layouts/nguoiDung/dangNhap";
// import SachForm from "./layouts/admin/sachForm";
// import Footer from "./layouts/header-footer/Footer";
// import DanhSachSanPhamAD from "./LayoutAD/products/danhSachSanPham";
// import NavBarAD from "./LayoutAD/header-footer_AD/Narbar_AD";
// import CheckoutAddress from './pages/checkout/CheckoutAddress';
// import CheckoutShipping from './pages/checkout/CheckoutShipping';
// import CheckoutPayment from './pages/checkout/CheckoutPayment';
// import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
// import GioHang from './pages/GioHang';
// import DonHangList from './layouts/nguoiDung/DonHangList';
// import ChiTietSanPhamAD from './layouts/admin/chiTietSanPhamAD';
// import SachUpdate from './layouts/admin/SachUpdate';
//
//
// // === Import các hàm kiểm tra ===
// import { isLoggedIn, checkAdminRole } from './layouts/Utils/authCheck'; // <<< KIỂM TRA ĐƯỜNG DẪN NÀY
//
// // Component Wrapper
// const AppContent = () => {
//     const location = useLocation();
//     const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
//
//     // === State để trigger re-render khi auth thay đổi ===
//     const [authVersion, setAuthVersion] = useState(() => Date.now()); // Khởi tạo bằng timestamp để chắc chắn thay đổi
//     // === Kiểm tra quyền trực tiếp ===
//     const isUserLoggedIn = isLoggedIn();
//     const isAdmin = checkAdminRole();
//
//     useEffect(() => {
//         const handleAuthChange = () => {
//             console.log("Auth state changed (event received), updating component..."); // Debug
//             setAuthVersion(Date.now()); // Cập nhật state để trigger re-render
//         };
//         // Lắng nghe sự kiện từ login/logout
//         window.addEventListener('authChange', handleAuthChange);
//         // Lắng nghe sự kiện storage từ tab khác (tùy chọn)
//         // window.addEventListener('storage', handleAuthChange);
//         return () => {
//             window.removeEventListener('authChange', handleAuthChange);
//             // window.removeEventListener('storage', handleAuthChange);
//         };
//     }, []); // Chỉ chạy 1 lần
//
//     console.log(`Rendering AppContent: isLoggedIn=${isUserLoggedIn}, isAdmin=${isAdmin}, authVersion=${authVersion}`); // Debug
//
//     return (
//         <>
//             {/* Hiển thị Navbar dựa trên quyền isAdmin */}
//             {isAdmin ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
//
//             <div className="main-content" style={{ minHeight: 'calc(100vh - 150px)' }}>
//                 <Routes>
//                     {/* --- Routes Public và User --- */}
//                     <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                     <Route path='/the-loai/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                     <Route path='/about' element={<About />} />
//                     <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
//                     <Route path='/dang-ky' element={<DangKyNguoiDung />} />
//                     <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
//                     <Route path='/dang-nhap' element={<DangNhap />} />
//
//                     {/* --- Routes yêu cầu đăng nhập (USER hoặc ADMIN) --- */}
//                     {/* Dùng Navigate để chuyển hướng nếu chưa login */}
//                     <Route path='/gio-hang' element={isUserLoggedIn ? <GioHang /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/thanh-toan/dia-chi' element={isUserLoggedIn ? <CheckoutAddress /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/thanh-toan/van-chuyen' element={isUserLoggedIn ? <CheckoutShipping /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/thanh-toan/thanh-toan' element={isUserLoggedIn ? <CheckoutPayment /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/dat-hang-thanh-cong/:maDonHang' element={isUserLoggedIn ? <CheckoutSuccess /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/tai-khoan/don-hang' element={isUserLoggedIn ? <DonHangList isAdmin={false} /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//
//                     {/* --- Routes chỉ dành cho ADMIN --- */}
//                     {/* Chỉ render các Route này nếu biến isAdmin là true */}
//                     {isAdmin && (
//                         <>
//                             <Route path='/admin' element={<DanhSachSanPhamAD tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={0} setTuKhoaTimKiem={setTuKhoaTimKiem} />} />
//                             <Route path='/admin/them-sach' element={<SachForm />} />
//                             <Route path='/admin/sach/:maSach' element={<ChiTietSanPhamAD />} />
//                             <Route path='/admin/cap-nhat/:maSach' element={<SachUpdate />} />
//                             {/* Thêm các route admin khác nếu cần */}
//                         </>
//                     )}
//
//                     {/* --- Route xử lý khi User cố vào /admin --- */}
//                     {/* Route này chỉ có tác dụng nếu isAdmin là false */}
//                     {!isAdmin && (
//                         <Route path="/admin/*" element={<Navigate to="/" replace />} />
//                     )}
//
//                     {/* Route 404 (Nếu cần) */}
//                     {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
//
//                 </Routes>
//             </div>
//             {/* Hiển thị Footer nếu không phải admin */}
//             {!isAdmin && <Footer />}
//         </>
//     );
// }
//
// // Component App chính
// function App() {
//     return (
//         <div className='App'>
//             <BrowserRouter>
//                 <AppContent />
//             </BrowserRouter>
//         </div>
//     );
// }
//
// export default App;






// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { BrowserRouter, Route, Routes, useLocation, Navigate, Link } from "react-router-dom";
//
// // --- Import Components Layout Chính ---
// import Navbar from "./layouts/header-footer/NarBar";
// import Footer from "./layouts/header-footer/Footer";
// import NavBarAD from "./LayoutAD/header-footer_AD/Navbar_AD"; // Navbar Admin
//
// // --- Import Pages/Components Người dùng ---
// import HomePage from "./layouts/homePage/hompage";
// // import About from "./layouts/about/About"; // Trang giới thiệu (nếu dùng component)
// import ChiTietSanPham from "./layouts/products/chiTietSanPham";
// import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
// import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
// import DangNhap from "./layouts/nguoiDung/dangNhap";
// import GioHang from './pages/GioHang';
// import DonHangList from './layouts/nguoiDung/DonHangList'; // Trang đơn hàng của user
// import TaiKhoanHoSo from './pages/TaiKhoanHoSo';       // <<< Import Trang Hồ sơ
// import CheckoutAddress from './pages/checkout/CheckoutAddress';
// import CheckoutShipping from './pages/checkout/CheckoutShipping';
// import CheckoutPayment from './pages/checkout/CheckoutPayment';
// import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
//
// // --- Import Pages/Components Admin ---
// import DanhSachSanPhamAD from "./LayoutAD/products/danhSachSanPham"; // Trang chính admin
// import SachForm from "./layouts/admin/sachForm";                     // Trang thêm sách
// import ChiTietSanPhamAD from './layouts/admin/chiTietSanPhamAD';     // Trang chi tiết sách admin
// import SachUpdate from './layouts/admin/SachUpdate';                 // Trang cập nhật sách admin
// import ReportsPage from "./layouts/admin/ReportsPage";
// import QuanLyDonHangList from './layouts/admin/DonHangList'; // <<< Import Quản lý Đơn hàng Admin
// // Import trang quản lý thể loại nếu đã tạo
// // import QuanLyTheLoai from './pages/admin/QuanLyTheLoai';
//
// // === Import các hàm kiểm tra Auth ===
// // <<< THÊM checkAdminOrStaffRole >>>
// import { isLoggedIn, checkAdminRole, checkAdminOrStaffRole } from './layouts/Utils/authCheck';
//
// // Component Wrapper để quản lý layout và routing
// const AppContent = () => {
//     const location = useLocation();
//     const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
//     // State để trigger re-render khi trạng thái đăng nhập/quyền thay đổi
//     const [authVersion, setAuthVersion] = useState(() => localStorage.getItem('token'));
//     // <<< SỬA: Dùng hàm kiểm tra mới >>>
//     const isUserLoggedIn = isLoggedIn();
//     const hasAdminAccess = checkAdminOrStaffRole(); // Kiểm tra Admin HOẶC Staff
//     const isStrictlyAdmin = checkAdminRole();      // Chỉ kiểm tra Admin
//
//     // Lắng nghe sự kiện 'authChange' để cập nhật component khi login/logout
//     useEffect(() => {
//         const handleAuthChange = () => {
//             console.log("Auth state changed event detected, re-rendering AppContent...");
//             setAuthVersion(localStorage.getItem('token')); // Cập nhật state để trigger render lại
//         };
//         window.addEventListener('authChange', handleAuthChange);
//         return () => {
//             window.removeEventListener('authChange', handleAuthChange);
//         };
//     }, []); // Chỉ chạy 1 lần
//
//     return (
//         <>
//             {/* Chọn Navbar phù hợp */}
//             {/* <<< SỬA: Dùng hasAdminAccess >>> */}
//             {hasAdminAccess && location.pathname.startsWith('/admin') ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
//
//             {/* Phần Nội dung chính */}
//             <div className="main-content" style={{ minHeight: 'calc(100vh - 150px)' }}>
//                 <Routes>
//                     {/* --- Routes Public (Ai cũng vào được) --- Giữ nguyên */}
//                     <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                     <Route path='/the-loai/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                     {/* <Route path='/about' element={<About />} /> */}
//                     <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
//                     <Route path='/dang-ky' element={<DangKyNguoiDung />} />
//                     <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
//                     <Route path='/dang-nhap' element={<DangNhap />} />
//
//                     {/* --- Routes yêu cầu ĐĂNG NHẬP (User hoặc Admin/Staff) --- Giữ nguyên */}
//                     <Route path='/gio-hang' element={isUserLoggedIn ? <GioHang /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/thanh-toan/dia-chi' element={isUserLoggedIn ? <CheckoutAddress /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/thanh-toan/van-chuyen' element={isUserLoggedIn ? <CheckoutShipping /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/thanh-toan/thanh-toan' element={isUserLoggedIn ? <CheckoutPayment /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/dat-hang-thanh-cong/:maDonHang' element={isUserLoggedIn ? <CheckoutSuccess /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     <Route path='/tai-khoan/don-hang' element={isUserLoggedIn ? <DonHangList isAdmin={false} /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     {/* === ROUTE HỒ SƠ === */}
//                     <Route path='/tai-khoan/ho-so' element={isUserLoggedIn ? <TaiKhoanHoSo /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
//                     {/* === KẾT THÚC ROUTE HỒ SƠ === */}
//
//
//                     {/* --- Routes chỉ dành cho ADMIN hoặc STAFF --- */}
//                     {/* <<< SỬA: Dùng hasAdminAccess >>> */}
//                     {hasAdminAccess && (
//                         <Route path='/admin'>
//                             <Route index element={<DanhSachSanPhamAD tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={0} setTuKhoaTimKiem={setTuKhoaTimKiem} />} /> {/* Trang /admin */}
//                             <Route path='them-sach' element={<SachForm />} /> {/* Trang /admin/them-sach */}
//                             <Route path='sach/:maSach' element={<ChiTietSanPhamAD />} /> {/* Trang /admin/sach/:maSach */}
//                             <Route path='cap-nhat/:maSach' element={<SachUpdate />} /> {/* Trang /admin/cap-nhat/:maSach */}
//                             {/* Route Quản lý Đơn hàng cho Admin/Staff */}
//                             <Route path='don-hang' element={<QuanLyDonHangList />} />
//                             {/* Route Báo cáo - Chỉ Admin (dùng isStrictlyAdmin) */}
//                             {/* <<< SỬA: Bảo vệ bằng isStrictlyAdmin >>> */}
//                             <Route path='bao-cao' element={isStrictlyAdmin ? <ReportsPage /> : <Navigate to="/admin" replace />} />
//                             {/* Thêm các route admin khác vào đây */}
//                         </Route>
//                     )}
//
//                     {/* --- Route xử lý khi User (không phải Admin/Staff) cố vào /admin --- */}
//                     {/* <<< SỬA: Dùng hasAdminAccess >>> */}
//                     { !hasAdminAccess && location.pathname.startsWith("/admin") && (
//                         <Route path="/admin/*" element={<Navigate to="/" replace />} />
//                     )}
//
//                     {/* Route 404 Not Found (Đặt cuối cùng) */}
//                     <Route path="*" element={<div className='container mt-5 text-center'><h1>404 - Trang không tồn tại</h1><Link to="/">Quay về trang chủ</Link></div>} />
//
//                 </Routes>
//             </div>
//
//             {/* Hiển thị Footer nếu không phải trang admin */}
//             {/* <<< SỬA: Dùng hasAdminAccess và kiểm tra path >>> */}
//             {!hasAdminAccess && !location.pathname.startsWith("/admin") && <Footer />}
//         </>
//     );
// }
//
// // Component App chính
// function App() {
//     return (
//         <div className='App'>
//             <BrowserRouter>
//                 <AppContent />
//             </BrowserRouter>
//         </div>
//     );
// }
//
// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, Navigate, Link } from "react-router-dom";

// --- Import Components Layout Chính ---
import Navbar from "./layouts/header-footer/NavBar";
import Footer from "./layouts/header-footer/Footer";
import NavBarAD from "./LayoutAD/header-footer_AD/Navbar_AD"; // Navbar Admin

// --- Import Pages/Components Người dùng ---
import HomePage from "./layouts/homePage/hompage";
// import About from "./layouts/about/About"; // Trang giới thiệu (nếu dùng component)
import ChiTietSanPham from "./layouts/products/chiTietSanPham"; // <<< Trang chi tiết SP Người dùng
import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
import DangNhap from "./layouts/nguoiDung/dangNhap";
import GioHang from './pages/GioHang';
import DonHangList from './layouts/nguoiDung/DonHangList'; // Trang đơn hàng của user
import TaiKhoanHoSo from './pages/TaiKhoanHoSo';       // Trang Hồ sơ
import YeuThichPage from './pages/YeuThichPage';     // <<< THÊM IMPORT TRANG YÊU THÍCH (Bạn đã đặt đúng trong /pages)
import CheckoutAddress from './pages/checkout/CheckoutAddress';
import CheckoutShipping from './pages/checkout/CheckoutShipping';
import CheckoutPayment from './pages/checkout/CheckoutPayment';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';

// --- Import Pages/Components Admin ---
import DanhSachSanPhamAD from "./LayoutAD/products/danhSachSanPham"; // Trang chính admin
import SachForm from "./layouts/admin/sachForm";                     // Trang thêm sách
import ChiTietSanPhamAD from './layouts/admin/chiTietSanPhamAD';     // Trang chi tiết sách admin <<< Khác với cái ở trên
import SachUpdate from './layouts/admin/SachUpdate';                 // Trang cập nhật sách admin
import ReportsPage from "./layouts/admin/ReportsPage";
import QuanLyDonHangList from './layouts/admin/DonHangList'; // <<< Import Quản lý Đơn hàng Admin
// Import trang quản lý thể loại nếu đã tạo
// import QuanLyTheLoai from './pages/admin/QuanLyTheLoai';

// === Import các hàm kiểm tra Auth ===
import { isLoggedIn, checkAdminRole, checkAdminOrStaffRole } from './layouts/Utils/authCheck'; // <<< Đã có checkAdminOrStaffRole

// Component Wrapper để quản lý layout và routing
const AppContent = () => {
    const location = useLocation();
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const [authVersion, setAuthVersion] = useState(() => localStorage.getItem('token'));
    const isUserLoggedIn = isLoggedIn();
    const hasAdminAccess = checkAdminOrStaffRole(); // Dùng hàm kiểm tra mới
    const isStrictlyAdmin = checkAdminRole();      // Dùng hàm kiểm tra mới

    useEffect(() => {
        const handleAuthChange = () => {
            console.log("Auth state changed event detected, re-rendering AppContent...");
            setAuthVersion(localStorage.getItem('token'));
        };
        window.addEventListener('authChange', handleAuthChange);
        return () => {
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    return (
        <>
            {/* Chọn Navbar phù hợp */}
            {hasAdminAccess && location.pathname.startsWith('/admin') ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}

            {/* Phần Nội dung chính */}
            <div className="main-content" style={{ minHeight: 'calc(100vh - 150px)' }}>
                <Routes>
                    {/* --- Routes Public --- */}
                    <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                    <Route path='/the-loai/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                    <Route path='/sach/:maSach' element={<ChiTietSanPham />} /> {/* <<< Dùng component ChiTietSanPham Người dùng */}
                    <Route path='/dang-ky' element={<DangKyNguoiDung />} />
                    <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
                    <Route path='/dang-nhap' element={<DangNhap />} />

                    {/* --- Routes yêu cầu ĐĂNG NHẬP --- */}
                    <Route path='/gio-hang' element={isUserLoggedIn ? <GioHang /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
                    <Route path='/thanh-toan/dia-chi' element={isUserLoggedIn ? <CheckoutAddress /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
                    <Route path='/thanh-toan/van-chuyen' element={isUserLoggedIn ? <CheckoutShipping /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
                    <Route path='/thanh-toan/thanh-toan' element={isUserLoggedIn ? <CheckoutPayment /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
                    <Route path='/dat-hang-thanh-cong/:maDonHang' element={isUserLoggedIn ? <CheckoutSuccess /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
                    <Route path='/tai-khoan/don-hang' element={isUserLoggedIn ? <DonHangList isAdmin={false} /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
                    <Route path='/tai-khoan/ho-so' element={isUserLoggedIn ? <TaiKhoanHoSo /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />

                    {/* === THÊM ROUTE YÊU THÍCH === */}
                    <Route path='/tai-khoan/yeu-thich' element={isUserLoggedIn ? <YeuThichPage /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />} />
                    {/* === KẾT THÚC THÊM ROUTE YÊU THÍCH === */}

                    {/* --- Routes ADMIN / STAFF --- */}
                    {hasAdminAccess && (
                        <Route path='/admin'>
                            <Route index element={<DanhSachSanPhamAD tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={0} setTuKhoaTimKiem={setTuKhoaTimKiem} />} />
                            <Route path='them-sach' element={<SachForm />} />
                            <Route path='sach/:maSach' element={<ChiTietSanPhamAD />} /> {/* <<< Dùng component ChiTietSanPhamAD Admin */}
                            <Route path='cap-nhat/:maSach' element={<SachUpdate />} />
                            <Route path='don-hang' element={<QuanLyDonHangList />} />
                            <Route path='bao-cao' element={isStrictlyAdmin ? <ReportsPage /> : <Navigate to="/admin" replace />} />
                        </Route>
                    )}

                    {/* --- Redirect nếu User vào /admin --- */}
                    { !hasAdminAccess && location.pathname.startsWith("/admin") && (
                        <Route path="/admin/*" element={<Navigate to="/" replace />} />
                    )}

                    {/* --- Route 404 --- */}
                    <Route path="*" element={<div className='container mt-5 text-center'><h1>404 - Trang không tồn tại</h1><Link to="/">Quay về trang chủ</Link></div>} />
                </Routes>
            </div>

            {/* Hiển thị Footer */}
            {!hasAdminAccess && !location.pathname.startsWith("/admin") && <Footer />}
        </>
    );
};

// Component App chính
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
    );
}

export default App;

