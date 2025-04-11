import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CheckoutSuccess: React.FC = () => {
    const { maDonHang } = useParams<{ maDonHang: string }>(); // Lấy mã đơn hàng từ URL

    return (
        <div className="container mt-5 mb-5 text-center">
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Đặt hàng thành công!</h4>
                <p>Cảm ơn bạn đã mua hàng tại YoungSan Bookstore.</p>
                {maDonHang && (
                    <p className="mb-0">Mã đơn hàng của bạn là: <strong>#{maDonHang}</strong></p>
                )}
                <hr />
                <p className="mb-0">Bạn có thể xem chi tiết đơn hàng trong Lịch sử mua hàng.</p>
            </div>
            <div className='mt-4'>
                <Link to="/" className="btn btn-primary me-3">
                    <i className="fas fa-home me-1"></i> Về trang chủ
                </Link>
                <Link to="/tai-khoan/don-hang" className="btn btn-outline-secondary">
                    <i className="fas fa-history me-1"></i> Xem lịch sử đơn hàng
                </Link>
            </div>
        </div>
    );
};

export default CheckoutSuccess; // Quan trọng!