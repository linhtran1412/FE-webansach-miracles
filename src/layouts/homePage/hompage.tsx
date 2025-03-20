import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanPham from "../products/danhSachSanPham";
import {useParams} from "react-router-dom";
import ChiTietSanPham from "../products/chiTietSanPham";
import {ViewStacked} from "react-bootstrap-icons";
import ViewStudent from "../admin/student/ViewStudent";
interface HomePageProps{
    tuKhoaTimKiem:string
}
function HomePage({tuKhoaTimKiem}:HomePageProps){
    const {maTheLoai}=useParams();
    let maTheLoaiNumBer=0;
    try{
        maTheLoaiNumBer=parseInt(maTheLoai+'');

    }catch (error){
        maTheLoaiNumBer=0;
        console.log(error);
    }
    if(Number.isNaN(maTheLoaiNumBer))
        maTheLoaiNumBer=0;
    return(
        <div>
            <Banner />
            <Carousel/>
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumBer}/>

        </div>
    );
}

export default HomePage;