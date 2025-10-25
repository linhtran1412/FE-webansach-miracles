import React from "react";
import NavBarAD from "../header-footer_AD/Navbar_AD";
import DanhSachSanPhamAD from "../products/danhSachSanPham";
import DanhSachSanPham from "../../layouts/products/danhSachSanPham";
import {useParams} from "react-router-dom";

interface ADPageProps{
    tuKhoaTimKiem:string
}

    function ADPage({tuKhoaTimKiem}:ADPageProps) {
        const {maTheLoai} = useParams();
        let maTheLoaiNumBer = 0;
        try {
            maTheLoaiNumBer = parseInt(maTheLoai + '');

        } catch (error) {
            maTheLoaiNumBer = 0;
            console.log(error);
        }
        if (Number.isNaN(maTheLoaiNumBer))
            maTheLoaiNumBer = 0;
        return (
            <div>
                <DanhSachSanPhamAD tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumBer}/>
            </div>
        );
    }

export default ADPage;