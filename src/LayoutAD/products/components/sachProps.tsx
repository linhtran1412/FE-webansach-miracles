import React, { useEffect, useState } from "react";
import SachModel from "../../../models/sachModel";
import {layToanBoAnhCuaMotSach} from "../../../API/hinhAnhAPI";
import {error} from "console";
import hinhAnhModel from "../../../models/hinhAnhModel";
import {Link} from "react-router-dom";

interface SachPropsInterface{
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {
    const maSach: number = props.sach.maSach;

    const [danhSachAnh, setDanhSachAnh] = useState<hinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
            layToanBoAnhCuaMotSach(maSach).then(
                hinhAnhData =>{
                    setDanhSachAnh(hinhAnhData);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }, [] // Chi goi mot lan
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

    let duLieuAnh:string="";
    if(danhSachAnh[0] && danhSachAnh[0].duLieuAnh){
        duLieuAnh=danhSachAnh[0].duLieuAnh;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/sach/${props.sach.maSach}`}style={{textDecoration:'none'}}>
                    <img
                        src={duLieuAnh}
                        className="card-img-top"
                        alt={props.sach.tenSach}
                        style={{height: '50px',width:'50px'}}
                    />
                </Link>

            </div>
        </div>

    );
}
export default SachProps;