import React, { useEffect, useState } from "react";
import SachModel from "../../models/sachModel";
import SachProps from "./components/sachProps";
import {laySachTheoMaSach, layToanBoSach, timKiemSach} from "../../API/sachAPI";
import { error } from "console";
import {Link} from "react-router-dom";
import {PhanTrang} from "../../layouts/Utils/PhanTrang";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai:number;

}

function DanhSachSanPhamAD({ tuKhoaTimKiem ,maTheLoai}: DanhSachSanPhamProps) {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setSoSach] = useState(0);

    useEffect(() => {
        if (tuKhoaTimKiem === '' &&maTheLoai==0 ) {
            layToanBoSach(trangHienTai - 1).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }else{
            timKiemSach(tuKhoaTimKiem,maTheLoai).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
    }, [trangHienTai, tuKhoaTimKiem,maTheLoai]);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    //console.log(trangHienTai);

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


    if(danhSachQuyenSach.length===0){
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">

                    <table className="table table-bordered table-hover shadow">
                        <thead>
                        <tr className="text-center">
                            <th >Tên Sách</th>
                            <th>Giá bán</th>
                            <th>Giá niêm yết</th>
                            <th>Mô tả</th>
                            <th>Số lượng</th>
                            <th>Tên tác giả</th>
                            <th>Trung bình xếp hạng</th>
                            <th>Hinh anh</th>
                            <th colSpan={2}>Hành đông</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {danhSachQuyenSach.map((sach) => (
                            <tr key={sach.maSach}>
                                <td>{sach.tenSach}</td>
                                <td>{sach.giaBan}</td>
                                <td>{sach.giaNiemYet}</td>
                                <td>{sach.moTa}</td>
                                <td>{sach.soLuong}</td>
                                <td>{sach.tenTacGia}</td>
                                <td>{sach.trungBinhXepHang}</td>
                              <td> <SachProps key={sach.maSach} sach={sach} /></td>

                                <td>
                                    <button className="btn btn-warning">Sửa</button>

                                    <button className="btn btn-danger">Xóa</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </div>
    );
}

export default DanhSachSanPhamAD;