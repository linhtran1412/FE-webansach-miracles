import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import sachModel from "../../models/sachModel";

import { error } from "console";
import {laySachTheoMaSach} from "../../API/sachAPI";

import renderRating from "../Utils/renderRating";
import dinhDangSo from "../Utils/dinhDangSo";
import DanhGiaSanPham from "../products/components/danhGiaSanPham";
import HinhAnhSanPham from "../products/components/hinhAnhSanPham";


const ChiTietSanPhamAD: React.FC = () => {
    // Lấy mã sách từ URL
    const { maSach } = useParams();

    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + '');
        if (Number.isNaN(maSachNumber))
            maSachNumber = 0;
    } catch (error) {
        maSachNumber = 0;
        console.error("Error", error);
    }

    // Khai báo
    const [sach, setSach] = useState<sachModel| null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);
    const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const soLuongMoi = parseInt(event.target.value);
        const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
        if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
            setSoLuong(soLuongMoi);
        }
    }

    useEffect(() => {
            laySachTheoMaSach(maSachNumber)
                .then((sach) => {
                        setSach(sach);
                        setDangTaiDuLieu(false);
                    }
                )
                .catch((error) => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                })
        }, [maSach]
    )

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    if (!sach) {
        return (
            <div>
                <h1>Sách không tồn tại!</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <HinhAnhSanPham maSach={maSachNumber}/>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>{sach.tenSach}</h1>
                            <h4>{sach.trungBinhXepHang?sach.trungBinhXepHang:0}</h4>
                            <h4>{sach.giaBan}</h4>
                            <hr/>
                            <div dangerouslySetInnerHTML={{__html: (sach.moTa + '')}}/>
                            <hr/>
                        </div>
                        <div className="col-4">

                            <div className="row mt-4 mb-4">
                                <DanhGiaSanPham maSach={maSachNumber}/>
                            </div>


                        </div>


                    </div>

                </div>
                {/*review*/}


            </div>
        </div>
            );
            }
            export default ChiTietSanPhamAD;