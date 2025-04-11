import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { layHinhThucThanhToan, datHangAPI, CheckoutRequestData } from '../../API/CheckoutAPI';
import { HinhThucThanhToanModel } from '../../models/LookupModels'; // Model đã được sửa ở Bước 1
import dinhDangSo from '../../layouts/Utils/dinhDangSo';

const CheckoutPayment: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentMethods, setPaymentMethods] = useState<HinhThucThanhToanModel[]>([]);
    const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const checkoutState = location.state as {
        diaChiNhanHang: string;
        diaChiMuaHang: string;
        maHinhThucGiaoHang: number;
    };

    useEffect(() => {
        if (!checkoutState || checkoutState.maHinhThucGiaoHang === undefined || checkoutState.maHinhThucGiaoHang === null) {
            console.error("CheckoutPayment: Thiếu thông tin địa chỉ hoặc mã giao hàng từ bước trước.");
            setError("Lỗi dữ liệu thanh toán. Vui lòng quay lại bước nhập địa chỉ.");
            setLoading(false);
            return;
        }
        console.log("CheckoutPayment: Received state:", checkoutState);

        setLoading(true);
        setError(null);
        layHinhThucThanhToan()
            .then(data => {
                console.log("CheckoutPayment: Fetched payment methods:", data);
                setPaymentMethods(data);
                if (data && data.length > 0) {
                    // === SỬA LẠI KEY ĐỂ LẤY ID DEFAULT ===
                    const defaultId = data[0].maHinhThucGiaoHang; // Dùng key từ API
                    // === KẾT THÚC SỬA ===
                    setSelectedMethodId(defaultId);
                    console.log("CheckoutPayment: Default payment method ID set:", defaultId);
                } else {
                    console.warn("CheckoutPayment: No payment methods found.");
                    setError("Không tìm thấy hình thức thanh toán nào.");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("CheckoutPayment: Lỗi tải hình thức thanh toán:", err);
                setError("Không thể tải danh sách hình thức thanh toán. Vui lòng thử lại.");
                setLoading(false);
            });
    }, []);

    const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newId = parseInt(event.target.value);
        setSelectedMethodId(newId);
        console.log('Payment Method Selected:', newId);
    };

    const handlePlaceOrder = async () => {
        console.log('ID thanh toán đã chọn (ngay trước khi đặt hàng):', selectedMethodId);

        if (selectedMethodId === null || !checkoutState) {
            alert("Vui lòng chọn hình thức thanh toán hoặc kiểm tra lại thông tin.");
            return;
        }

        setIsPlacingOrder(true);
        setError(null);

        // === QUAN TRỌNG: Khi gửi đi vẫn dùng key chuẩn mà DTO Backend mong đợi ===
        const orderData: CheckoutRequestData = {
            diaChiMuaHang: checkoutState.diaChiMuaHang,
            diaChiNhanHang: checkoutState.diaChiNhanHang,
            maHinhThucGiaoHang: checkoutState.maHinhThucGiaoHang,
            maHinhThucThanhToan: selectedMethodId // DTO Backend cần key này
        };
        // === KẾT THÚC ===

        console.log(">>> DỮ LIỆU GỬI LÊN BE:", JSON.stringify(orderData, null, 2));

        try {
            const createdOrder = await datHangAPI(orderData);
            console.log("Đơn hàng đã tạo thành công:", createdOrder);
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            console.log("CheckoutPayment: Dispatched cartUpdated event.");
            navigate(`/dat-hang-thanh-cong/${createdOrder.maDonHang}`, { replace: true });
        } catch (err: any) {
            console.error("CheckoutPayment: Lỗi khi gọi API đặt hàng:", err);
            setError(err.message || "Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
            setIsPlacingOrder(false);
        }
    };

    if (loading) {
        return <div className="container mt-5 text-center">Đang tải hình thức thanh toán...</div>;
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
                <Link to="/thanh-toan/dia-chi" className="btn btn-outline-primary">Quay lại Bước 1</Link>
            </div>
        );
    }

    if (paymentMethods.length === 0) {
        return (
            <div className="container mt-5">
                <p>Không có hình thức thanh toán nào khả dụng.</p>
                <button onClick={() => navigate(-1)} className="btn btn-outline-secondary"><i className="fas fa-arrow-left me-1"></i> Quay lại</button>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: '700px' }}>
            <h1>Bước 3: Chọn hình thức thanh toán</h1>
            <div className="card mb-3">
                <div className="card-body">
                    {paymentMethods.map((method) => {
                        // === SỬA LẠI CÁC KEY CHO KHỚP VỚI API/MODEL ===
                        const methodId = method.maHinhThucGiaoHang; // Key ID từ API
                        const methodTen = method.tenHinhThucGiaoHang; // Key Tên từ API
                        const methodMoTa = method.moTa;
                        const methodPhi = method.chiPhiGiaoHang;    // Key Phí từ API
                        // === KẾT THÚC SỬA ===

                        return (
                            <div className="form-check mb-3" key={methodId}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id={`pay-${methodId}`}
                                    value={methodId}
                                    checked={selectedMethodId === methodId}
                                    onChange={handleMethodChange}
                                    disabled={isPlacingOrder}
                                />
                                <label className="form-check-label w-100" htmlFor={`pay-${methodId}`}>
                                    <div className="d-flex justify-content-between">
                                         <span>
                                            <strong>{methodTen}</strong>
                                             <small className="d-block text-muted">{methodMoTa}</small>
                                        </span>
                                        {methodPhi > 0 && (
                                            <span className="fw-bold">+{dinhDangSo(methodPhi)} đ</span>
                                        )}
                                    </div>
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <div className="d-flex justify-content-between mt-3">
                <button onClick={() => navigate(-1)} className="btn btn-outline-secondary" disabled={isPlacingOrder}>
                    <i className="fas fa-arrow-left me-1"></i> Quay lại
                </button>
                <button
                    onClick={handlePlaceOrder}
                    className="btn btn-danger"
                    disabled={selectedMethodId === null || isPlacingOrder || paymentMethods.length === 0}
                >
                    {isPlacingOrder ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Đang đặt hàng...
                        </>
                    ) : (
                        <> Đặt Hàng <i className="fas fa-check ms-1"></i> </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPayment;