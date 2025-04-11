import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Bạn có thể tạo file API riêng cho người dùng sau này
// import { layThongTinCaNhan } from '../../API/NguoiDungAPI';

const CheckoutAddress: React.FC = () => {
    const navigate = useNavigate();
    const [diaChiNhanHang, setDiaChiNhanHang] = useState('');
    // Địa chỉ thanh toán, nếu không nhập sẽ lấy giống địa chỉ nhận hàng
    const [diaChiMuaHang, setDiaChiMuaHang] = useState('');
    const [hoTenNguoiNhan, setHoTenNguoiNhan] = useState('');
    const [soDienThoaiNguoiNhan, setSoDienThoaiNguoiNhan] = useState('');
    // const [loadingProfile, setLoadingProfile] = useState(false); // Dùng khi tích hợp profile

    // TODO: Tích hợp lấy thông tin profile người dùng sau này

    const handleNextStep = () => {
        if (!hoTenNguoiNhan.trim() || !soDienThoaiNguoiNhan.trim() || !diaChiNhanHang.trim()) {
            alert("Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.");
            return;
        }

        // Chuyển sang bước chọn vận chuyển, truyền state địa chỉ
        navigate('/thanh-toan/van-chuyen', {
            state: {
                diaChiNhanHang: diaChiNhanHang.trim(),
                diaChiMuaHang: (diaChiMuaHang.trim() || diaChiNhanHang.trim()), // Ưu tiên địa chỉ mua hàng, nếu rỗng thì lấy địa chỉ nhận hàng
                // Có thể truyền thêm các thông tin khác nếu cần
                // hoTen: hoTenNguoiNhan.trim(),
                // sdt: soDienThoaiNguoiNhan.trim(),
            }
        });
    };

    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: '700px' }}>
            <h1>Bước 1: Thông tin giao hàng</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                <div className="mb-3">
                    <label htmlFor="hoTenNguoiNhan" className="form-label">Họ và tên người nhận (*)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="hoTenNguoiNhan"
                        value={hoTenNguoiNhan}
                        onChange={(e) => setHoTenNguoiNhan(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="soDienThoaiNguoiNhan" className="form-label">Số điện thoại người nhận (*)</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="soDienThoaiNguoiNhan"
                        value={soDienThoaiNguoiNhan}
                        onChange={(e) => setSoDienThoaiNguoiNhan(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="diaChiNhanHang" className="form-label">Địa chỉ nhận hàng (*)</label>
                    <textarea
                        className="form-control"
                        id="diaChiNhanHang"
                        rows={3}
                        value={diaChiNhanHang}
                        onChange={(e) => setDiaChiNhanHang(e.target.value)}
                        required
                        placeholder="Nhập chi tiết số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    />
                </div>
                {/* Optional: Thêm ô nhập địa chỉ thanh toán nếu muốn tách biệt */}
                {/* <div className="mb-3">
                     <label htmlFor="diaChiMuaHang" className="form-label">Địa chỉ thanh toán (nếu khác)</label>
                     <textarea className="form-control" id="diaChiMuaHang" rows={3} value={diaChiMuaHang} onChange={(e) => setDiaChiMuaHang(e.target.value)} />
                </div> */}
                <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-primary">Tiếp tục chọn Vận chuyển <i className="fas fa-arrow-right ms-1"></i></button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutAddress; // Quan trọng: Phải có export default!