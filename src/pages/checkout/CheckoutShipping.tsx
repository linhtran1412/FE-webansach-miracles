import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { layHinhThucGiaoHang } from '../../API/CheckoutAPI'; // Import API
import { HinhThucGiaoHangModel } from '../../models/LookupModels'; // Import Model
import dinhDangSo from '../../layouts/Utils/dinhDangSo'; // Import hàm định dạng số

const CheckoutShipping: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [shippingMethods, setShippingMethods] = useState<HinhThucGiaoHangModel[]>([]);
    const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy state địa chỉ từ bước trước
    const addressState = location.state as { diaChiNhanHang: string; diaChiMuaHang: string; };

    useEffect(() => {
        // Kiểm tra nếu không có state địa chỉ thì quay lại bước 1
        if (!addressState) {
            alert("Vui lòng nhập địa chỉ trước.");
            navigate('/thanh-toan/dia-chi');
            return;
        }

        setLoading(true);
        setError(null);
        layHinhThucGiaoHang()
            .then(data => {
                setShippingMethods(data);
                // Tự động chọn hình thức đầu tiên nếu có
                if (data && data.length > 0) {
                    setSelectedMethodId(data[0].maHinhThucGiaoHang);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi tải hình thức giao hàng:", err);
                setError("Không thể tải danh sách hình thức giao hàng.");
                setLoading(false);
            });
    }, [navigate, addressState]); // Thêm dependency

    const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethodId(parseInt(event.target.value));
    };

    const handleNextStep = () => {
        if (selectedMethodId === null) {
            alert("Vui lòng chọn hình thức giao hàng.");
            return;
        }
        // Chuyển sang bước thanh toán, truyền state địa chỉ và mã vận chuyển
        navigate('/thanh-toan/thanh-toan', {
            state: {
                ...addressState, // Giữ lại state địa chỉ
                maHinhThucGiaoHang: selectedMethodId
            }
        });
    };

    if (loading) {
        return <div className="container mt-5">Đang tải hình thức giao hàng...</div>;
    }

    if (error) {
        return <div className="container mt-5 alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: '700px' }}>
            <h1>Bước 2: Chọn hình thức giao hàng</h1>
            <div className="card">
                <div className="card-body">
                    {shippingMethods.length === 0 ? (
                        <p>Không có hình thức giao hàng nào.</p>
                    ) : (
                        shippingMethods.map((method) => (
                            <div className="form-check mb-3" key={method.maHinhThucGiaoHang}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="shippingMethod"
                                    id={`ship-${method.maHinhThucGiaoHang}`}
                                    value={method.maHinhThucGiaoHang}
                                    checked={selectedMethodId === method.maHinhThucGiaoHang}
                                    onChange={handleMethodChange}
                                />
                                <label className="form-check-label w-100" htmlFor={`ship-${method.maHinhThucGiaoHang}`}>
                                    <div className="d-flex justify-content-between">
                                        <span>
                                            <strong>{method.tenHinhThucGiaoHang}</strong>
                                            <small className="d-block text-muted">{method.moTa}</small>
                                        </span>
                                        <span className="fw-bold">{dinhDangSo(method.chiPhiGiaoHang)} đ</span>
                                    </div>
                                </label>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <button onClick={() => navigate(-1)} className="btn btn-outline-secondary"><i className="fas fa-arrow-left me-1"></i> Quay lại</button>
                <button onClick={handleNextStep} className="btn btn-primary" disabled={selectedMethodId === null}>Tiếp tục chọn Thanh toán <i className="fas fa-arrow-right ms-1"></i></button>
            </div>
        </div>
    );
};

export default CheckoutShipping; // Quan trọng!