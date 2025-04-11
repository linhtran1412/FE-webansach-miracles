import React, { useEffect, useState } from "react";
import { layToanBoDonHang, layDonHangTheoNguoiDung, xoaDonHang } from "../../API/DonHangAPI";
import DonHangModel from "../../models/DonHangModel";

interface DonHangListProps {
    isAdmin: boolean;
}

const DonHangList: React.FC<DonHangListProps> = ({ isAdmin }) => {
    const [donHangs, setDonHangs] = useState<DonHangModel[]>([]);

    useEffect(() => {
        if (isAdmin) {
            layToanBoDonHang().then((data: DonHangModel[]) => setDonHangs(data));
        } else {
            const maNguoiDung = localStorage.getItem("userId");
            if (maNguoiDung) {
                layDonHangTheoNguoiDung(parseInt(maNguoiDung)).then((data: DonHangModel[]) => setDonHangs(data));
            }
        }
    }, [isAdmin]);

    const handleDelete = (id: number) => {
        xoaDonHang(id).then(() => {
            alert("Đã xóa đơn hàng!");
            setDonHangs(donHangs.filter((donHang) => donHang.maDonHang !== id));
        });
    };

    return (
        <div>
            <h1>{isAdmin ? "📦 Quản lý đơn hàng" : "📦 Đơn hàng của tôi"}</h1>
            <ul>
                {donHangs.map((donHang) => (
                    <li key={donHang.maDonHang}>
                        {donHang.diaChiNhanHang} - {donHang.tongTien} VND
                        {isAdmin && <button onClick={() => handleDelete(donHang.maDonHang)}>Xóa</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonHangList;
