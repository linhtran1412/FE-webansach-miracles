import React, { useEffect, useState } from "react";
import HocSinhModel from "../../../models/HocSinhModel";
import {layToanBoHocSinh} from "../../../API/HocSinhAPI";
import {error} from "console";
import StudentProps from "../component/StudentProps";
const ViewStudent:React.FC=()=>{
    const [danhSachHocSinh,setDanhSachHocSinh]=useState<HocSinhModel[]>([]);
    const [dangTaiDuLieu,setDangTaiDuLieu]=useState(true);
    const [baoLoi,setBaoLoi]=useState(null);
    useEffect(() => {
        layToanBoHocSinh().then(
            HocSinhData=>{
                setDanhSachHocSinh(HocSinhData);
                setDangTaiDuLieu(false);
            }
        ).catch(
        )
    }, []);
    if(dangTaiDuLieu){
        return (
            <div>
                <h1>dang tai du lieu</h1>
            </div>
        );
}
    if(baoLoi){
        return (
            <div>
                <h1>bao loi</h1>
            </div>

        );
    }




    return (
        <div className="container">
            <div className="row mt-4">
                {
                    danhSachHocSinh.map((hocsinh) => (
                            <StudentProps key={hocsinh.id} student={hocsinh} />
                        )
                    )
                }
            </div>
        </div>

    );

}

export default ViewStudent;