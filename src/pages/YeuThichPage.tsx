
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SachModel from '../models/sachModel';
import { layDanhSachYeuThich } from '../API/YeuThichAPI'; // Điều chỉnh đường dẫn nếu cần
import { isLoggedIn } from '../layouts/Utils/authCheck'; // Điều chỉnh đường dẫn nếu cần
import SachProps from '../layouts/products/components/sachProps'; // Dùng lại component SachProps để hiển thị

const YeuThichPage: React.FC = () => {
    const [wishlist, setWishlist] = useState<SachModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            alert("Vui lòng đăng nhập để xem danh sách yêu thích.");
            navigate('/dang-nhap', { replace: true, state: { from: '/tai-khoan/yeu-thich' } });
            return;
        }

        setLoading(true);
        setError(null);

        layDanhSachYeuThich()
            .then(data => {
                setWishlist(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Lỗi tải danh sách yêu thích.");
                setLoading(false);
                console.error("Lỗi fetch wishlist:", err);
            });
    }, [navigate]);

    if (loading) {
        return <div className="container mt-4 text-center"><h5>Đang tải danh sách yêu thích...</h5></div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
    }

    return (
        <div className="container mt-4 mb-5">
            <h1 className="mb-4">❤️ Sách Yêu Thích</h1>
            {wishlist.length === 0 ? (
                <div className="text-center p-5 border rounded bg-light">
                    <p className="lead">Bạn chưa có sách yêu thích nào.</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        <i className="fas fa-search me-2"></i> Khám phá sách ngay
                    </Link>
                </div>
            ) : (
                <div className="row">
                    {/* Sử dụng lại component SachProps để hiển thị sách */}
                    {wishlist.map((sach) => (
                        <SachProps key={sach.maSach} sach={sach} />
                        // Lưu ý: Component SachProps gốc có nút "Thêm vào giỏ",
                        // Bạn có thể muốn tạo một phiên bản khác hoặc tùy chỉnh SachProps
                        // để hiển thị thêm nút "Xóa khỏi yêu thích" chẳng hạn.
                        // Tạm thời, chỉ hiển thị như danh sách sản phẩm thông thường.
                    ))}
                </div>
            )}
        </div>
    );
};

export default YeuThichPage;