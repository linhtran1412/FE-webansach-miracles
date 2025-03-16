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
import Home from "./Home";
import StudentsView from "./Student/student/StudentsView";
import AddStudent from "./Student/student/AddStudent";
import EditStudent from "./Student/student/EditStudent";
import StudentPofile from "./Student/student/StudentPofile";
// import DashboardPage from "./layouts/admin/trangDieuKhien";


function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
      <div className='App'>
        <BrowserRouter>
          <Navbar tuKhoaTimKiem={tuKhoaTimKiem}  setTuKhoaTimKiem={setTuKhoaTimKiem}/>
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
            {/*<Route path='/admin' element={<DashboardPage />} />*/}
            {/*//student*/}
            <Route
                // exact
                path="/"
                element={<Home />}></Route>
            <Route

                path="/view-students"
                element={<StudentsView />}></Route>
            <Route

                path="/add-students"
                element={<AddStudent />}></Route>
            <Route

                path="/edit-student/:id"
                element={<EditStudent />}></Route>
            <Route

                path="/student-profile/:id"
                element={<StudentPofile />}></Route>
          </Routes>

          <Footer/>
        </BrowserRouter>
      </div>
  );
}

export default App;
