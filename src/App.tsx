import React, { useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Navbar from "./layouts/header-footer/NarBar";
import HomePage from "./layouts/homePage/hompage";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/products/chiTietSanPham";
import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
import DangNhap from "./layouts/nguoiDung/dangNhap";
import Test from "./layouts/nguoiDung/text";
import SachForm from "./layouts/admin/sachForm";
import Footer from "./layouts/header-footer/Footer";
import ADPage from "./LayoutAD/ADPage/ADPage";
import NavBarAD from "./LayoutAD/header-footer_AD/Narbar_AD";

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const isAdminPath = location.pathname.startsWith("/admin");
    // eslint-disable-next-line no-restricted-globals

    return (

    <div className='App'>
 <BrowserRouter>
     {isAdminPath ? <NavBarAD /> : <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}

     {!isAdminPath ?
         <Routes>


         <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
         <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
         <Route path='/about' element={<About />} />
         <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
             <Route path='/dang-ky' element={<DangKyNguoiDung />} />
             <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>} />
             <Route path='/dang-nhap' element={<DangNhap />} />
         <Route path='/test' element={<Test />} />
         <Route path='/admin/them-sach' element={<SachForm />} />

     </Routes>
         :

         <Routes>

         <Route path='/admin' element={<ADPage tuKhoaTimKiem={tuKhoaTimKiem} />} />
     </Routes> }

     <Footer/>
  </BrowserRouter>
 </div>
   );
}

export default App;
