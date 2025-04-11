// import React, { useState } from 'react';
// import './App.css';
// import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Navbar from "./layouts/header-footer/NarBar";
// import HomePage from "./layouts/homePage/hompage";
// import About from "./layouts/about/About";
// import ChiTietSanPham from "./layouts/products/chiTietSanPham";
// import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
// import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
// import DangNhap from "./layouts/nguoiDung/dangNhap";
// import Test from "./layouts/nguoiDung/text";
// import SachForm from "./layouts/admin/sachForm";
// import Footer from "./layouts/header-footer/Footer";
// import ADPage from "./LayoutAD/ADPage/ADPage";
// import NavBarAD from "./LayoutAD/header-footer_AD/Narbar_AD";
//
//
// // --- 1. THÊM DÒNG IMPORT NÀY ---
// // Đảm bảo đường dẫn './pages/GioHang' là chính xác với vị trí bạn lưu file GioHang.tsx
// import GioHang from './pages/GioHang';
//
//
// function App() {
//     const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
//     // eslint-disable-next-line no-restricted-globals
//     const isAdminPath = location.pathname.startsWith("/admin"); // Lưu ý: 'location' có thể cần thay bằng hook useLocation() của react-router-dom để theo dõi thay đổi path tốt hơn
//
//     return (
//         <div className='App'>
//             <BrowserRouter>
//                 { /* Hiển thị Navbar phù hợp */ }
//                 {isAdminPath ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
//
//                 {/* Routes cho người dùng thông thường */}
//                 {!isAdminPath ? (
//                     <Routes>
//                         <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                         <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                         <Route path='/about' element={<About />} />
//                         <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
//                         <Route path='/dang-ky' element={<DangKyNguoiDung />} />
//                         <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>} />
//                         <Route path='/dang-nhap' element={<DangNhap />} />
//                         <Route path='/test' element={<Test />} />
//
//                         {/* --- 2. THÊM ROUTE CHO GIỎ HÀNG Ở ĐÂY --- */}
//                         <Route path='/gio-hang' element={<GioHang />} />
//
//                         {/* Route này có vẻ nên nằm trong phần admin? */}
//                         <Route path='/admin/them-sach' element={<SachForm />} />
//
//                     </Routes>
//                 ) : (
//                     /* Routes cho Admin */
//                     <Routes>
//                         <Route path='/admin' element={<ADPage tuKhoaTimKiem={tuKhoaTimKiem} />} />
//                         {/* Bạn có thể thêm các route admin khác ở đây */}
//                         {/* Ví dụ: <Route path='/admin/quan-ly-sach' element={<QuanLySachComponent />} /> */}
//                         {/* Route '/admin/them-sach' nên được chuyển vào đây nếu chỉ admin được truy cập */}
//                         {/* <Route path='/admin/them-sach' element={<SachForm />} /> */}
//                     </Routes>
//                 )}
//
//                 <Footer/>
//             </BrowserRouter>
//         </div>
//     );
// }
//
// export default App;




import React, { useState } from 'react';
import './App.css';
// Đảm bảo import hook useLocation nếu bạn muốn dùng nó thay cho location.pathname
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./layouts/header-footer/NarBar";
import HomePage from "./layouts/homePage/hompage";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/products/chiTietSanPham";
import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
import DangNhap from "./layouts/nguoiDung/dangNhap";
import Test from "./layouts/nguoiDung/text"; // Component này có thể không cần thiết nữa
import SachForm from "./layouts/admin/sachForm"; // Nên chuyển vào route admin
import Footer from "./layouts/header-footer/Footer";
import ADPage from "./LayoutAD/ADPage/ADPage";
import NavBarAD from "./LayoutAD/header-footer_AD/Narbar_AD";

// Import các trang checkout
import CheckoutAddress from './pages/checkout/CheckoutAddress';
import CheckoutShipping from './pages/checkout/CheckoutShipping';
import CheckoutPayment from './pages/checkout/CheckoutPayment';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';

// Import trang giỏ hàng và lịch sử đơn hàng
import GioHang from './pages/GioHang';
// Đảm bảo đường dẫn này đúng tới file DonHangList của bạn
import DonHangList from './layouts/nguoiDung/DonHangList';

// Component Wrapper để sử dụng hook useLocation (cách tốt hơn location.pathname)
const AppContent = () => {
    const location = useLocation(); // Dùng hook useLocation
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const isAdminPath = location.pathname.startsWith("/admin");

    return (
        <> {/* Sử dụng Fragment để không cần thẻ div thừa */}
            { /* Hiển thị Navbar phù hợp */ }
            {isAdminPath ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}

            <div className="main-content" style={{ minHeight: 'calc(100vh - 150px)' }}> {/* Thêm class hoặc style để đảm bảo footer không bị đẩy lên */}
                {/* Routes cho người dùng thông thường */}
                {!isAdminPath ? (
                    <Routes>
                        <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} /> {/* Route xem theo thể loại */}
                        <Route path='/about' element={<About />} />
                        <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
                        <Route path='/dang-ky' element={<DangKyNguoiDung />} />
                        <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
                        <Route path='/dang-nhap' element={<DangNhap />} />
                        {/* <Route path='/test' element={<Test />} /> */} {/* Có thể bỏ route test nếu không dùng */}

                        {/* Route Giỏ hàng */}
                        <Route path='/gio-hang' element={<GioHang />} />

                        {/* === THÊM CÁC ROUTE CHECKOUT VÀO ĐÂY === */}
                        <Route path='/thanh-toan/dia-chi' element={<CheckoutAddress />} />
                        <Route path='/thanh-toan/van-chuyen' element={<CheckoutShipping />} />
                        <Route path='/thanh-toan/thanh-toan' element={<CheckoutPayment />} />
                        <Route path='/dat-hang-thanh-cong/:maDonHang' element={<CheckoutSuccess />} />
                        {/* === KẾT THÚC THÊM ROUTE CHECKOUT === */}

                        {/* === THÊM ROUTE XEM LỊCH SỬ ĐƠN HÀNG === */}
                        <Route path='/tai-khoan/don-hang' element={<DonHangList isAdmin={false} />} />
                        {/* === KẾT THÚC THÊM ROUTE LỊCH SỬ === */}

                        {/* Route '/admin/them-sach' nên chuyển vào phần Admin */}
                        {/* <Route path='/admin/them-sach' element={<SachForm />} /> */}

                    </Routes>
                ) : (
                    /* Routes cho Admin */
                    <Routes>
                        <Route path='/admin' element={<ADPage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                        {/* === CHUYỂN ROUTE THÊM SÁCH VÀO ĐÂY === */}
                        <Route path='/admin/them-sach' element={<SachForm />} />
                        {/* Bạn có thể thêm các route admin khác ở đây */}
                        {/* Ví dụ: <Route path='/admin/quan-ly-don-hang' element={<QuanLyDonHangComponent />} /> */}
                        {/* Ví dụ: <Route path='/admin/quan-ly-nguoi-dung' element={<QuanLyNguoiDungComponent />} /> */}
                    </Routes>
                )}
            </div>
            <Footer />
        </>
    );
}


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <AppContent /> {/* Sử dụng component Wrapper */}
            </BrowserRouter>
        </div>
    );
}

export default App;