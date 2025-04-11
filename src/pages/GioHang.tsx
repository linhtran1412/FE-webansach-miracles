// src/pages/GioHang.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { layGioHang, xoaSachKhoiGioHangAPI, capNhatSoLuongAPI } from '../API/GioHangAPI';
import GioHangModel from '../models/GioHangModel';
import dinhDangSo from '../layouts/Utils/dinhDangSo';

const GioHang: React.FC = () => {
    const [gioHang, setGioHang] = useState<GioHangModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Biến tạm lưu giá trị gioHang để rollback khi API lỗi
    // Khai báo ở scope của component để các hàm con có thể truy cập nếu cần (mặc dù trong onBlur không cần nữa)
    // Tuy nhiên, cách tốt hơn là dùng state riêng hoặc useRef nếu cần lưu snapshot phức tạp.
    // Trong trường hợp này, logic rollback đã nằm trong handleCapNhatSoLuong nên không cần biến này ở ngoài.

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Vui lòng đăng nhập để xem giỏ hàng.");
            navigate('/dang-nhap');
            return;
        }
        setLoading(true);
        setError(null);
        layGioHang()
            .then(data => {
                setGioHang(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Đã xảy ra lỗi khi tải giỏ hàng.");
                setLoading(false);
            });
    }, [navigate]);

    // const handleXoaSach = async (maSach: number) => {
    //     if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    //         try {
    //             const gioHangMoi = await xoaSachKhoiGioHangAPI(maSach);
    //             setGioHang(gioHangMoi);
    //             alert("Đã xóa sản phẩm thành công!");
    //         } catch (err: any) {
    //             alert(`Lỗi khi xóa: ${err.message}`);
    //         }
    //     }
    // };

    const handleXoaSach = async (maSach: number) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            try {
                // API giờ trả về giỏ hàng mới nhất (hoặc null) sau khi xóa thành công và fetch lại
                const gioHangMoiNhat = await xoaSachKhoiGioHangAPI(maSach);
                // Cập nhật state với giỏ hàng mới (có thể là null nếu giỏ hàng rỗng)
                setGioHang(gioHangMoiNhat);
                alert("Đã xóa sản phẩm thành công!"); // Thông báo này có thể không cần thiết nữa nếu UI cập nhật ngay
            } catch (err: any) {
                alert(`Lỗi khi xóa: ${err.message}`);
                // Cân nhắc fetch lại giỏ hàng nếu API xóa bị lỗi để đảm bảo UI đúng
                // layGioHang().then(setGioHang);
            }
        }
    };

    const handleCapNhatSoLuong = async (maSach: number, soLuongMoi: number) => {
        if (soLuongMoi < 0) return; // Vẫn giữ kiểm tra này

        // Lưu trạng thái hiện tại để rollback nếu API lỗi
        const gioHangTruocKhiCapNhat = gioHang ? JSON.parse(JSON.stringify(gioHang)) : null;

        // Cập nhật UI tạm thời (optional nhưng giúp giao diện mượt hơn)
        if (gioHang) {
            // Chỉ cập nhật UI nếu số lượng mới > 0
            if (soLuongMoi > 0) {
                const chiTietCanUpdate = gioHang.danhSachChiTietGioHang.find(ct => ct.maSach === maSach);
                if (chiTietCanUpdate) {
                    const updatedChiTiet = gioHang.danhSachChiTietGioHang.map(ct =>
                        ct.maSach === maSach ? { ...ct, soLuong: soLuongMoi } : ct
                    );
                    const tongTienMoi = updatedChiTiet.reduce((sum, ct) => sum + ct.giaBan * ct.soLuong, 0);
                    setGioHang({ ...gioHang, danhSachChiTietGioHang: updatedChiTiet, tongTien: tongTienMoi });
                }
            } else { // Nếu số lượng mới là 0 (do xóa)
                const updatedChiTiet = gioHang.danhSachChiTietGioHang.filter(ct => ct.maSach !== maSach);
                const tongTienMoi = updatedChiTiet.reduce((sum, ct) => sum + ct.giaBan * ct.soLuong, 0);
                setGioHang({ ...gioHang, danhSachChiTietGioHang: updatedChiTiet, tongTien: tongTienMoi });
            }

        }

        // Gọi API
        try {
            const gioHangMoiTuAPI = await capNhatSoLuongAPI(maSach, soLuongMoi); // API sẽ xử lý cả trường hợp soLuongMoi = 0 (xóa)
            // Cập nhật state từ phản hồi chính thức của API để đảm bảo đồng bộ
            setGioHang(gioHangMoiTuAPI);
        } catch (err: any) {
            alert(`Lỗi khi cập nhật số lượng: ${err.message}`);
            // Nếu API lỗi, rollback lại giao diện về trạng thái trước đó
            setGioHang(gioHangTruocKhiCapNhat);
        }
    };

    if (loading) { return <div className="container text-center mt-5"><h1>Đang tải giỏ hàng...</h1></div>; }
    if (error) { return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>; }
    if (!gioHang || gioHang.danhSachChiTietGioHang.length === 0) { return <div className="container mt-5"><h1>Giỏ hàng của bạn</h1><p>Giỏ hàng của bạn đang trống.</p><Link to="/" className="btn btn-primary">Tiếp tục mua sắm</Link></div>; }

    return (
        <div className="container mt-4 mb-5">
            <h1>Giỏ hàng của bạn</h1>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead className="table-light">
                    {/* ... table header ... */}
                    <tr>
                        <th style={{ minWidth: '150px' }}>Sản phẩm</th>
                        <th className="text-center">Hình ảnh</th>
                        <th className="text-end" style={{ minWidth: '100px' }}>Đơn giá</th>
                        <th className="text-center" style={{ minWidth: '120px', maxWidth: '150px' }}>Số lượng</th>
                        <th className="text-end" style={{ minWidth: '110px' }}>Thành tiền</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gioHang.danhSachChiTietGioHang.map((item) => ( // 'item' có sẵn trong scope của map
                        <tr key={item.maSach}>
                            {/* ... các cột tên, ảnh, đơn giá ... */}
                            <td>
                                <Link to={`/sach/${item.maSach}`} className="text-dark text-decoration-none">{item.tenSach}</Link>
                            </td>
                            <td className="text-center">
                                {item.hinhAnh ? (
                                    <img src={item.hinhAnh} alt={item.tenSach} style={{ width: '60px', height: 'auto', objectFit: 'contain' }} />
                                ) : (
                                    <span className="text-muted small">(Không có ảnh)</span>
                                )}
                            </td>
                            <td className="text-end">{dinhDangSo(item.giaBan)} đ</td>
                            <td>
                                <div className="input-group input-group-sm justify-content-center">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => handleCapNhatSoLuong(item.maSach, item.soLuong - 1)}
                                        disabled={item.soLuong <= 1}
                                    >-</button>
                                    <input
                                        type="number"
                                        className="form-control text-center px-1"
                                        // defaultValue={item.soLuong} // Sử dụng defaultValue hoặc value có kiểm soát
                                        value={item.soLuong} // Sử dụng value nếu state được cập nhật đúng
                                        min="1"
                                        onChange={(e) => {
                                            // Cập nhật UI tạm thời ngay khi gõ để mượt hơn
                                            // Nhưng chỉ gọi API khi blur hoặc nhấn enter để tránh gọi liên tục
                                            const enteredValue = e.target.value;
                                            const newQuantity = parseInt(enteredValue);

                                            if (!isNaN(newQuantity) && newQuantity > 0) {
                                                // Chỉ cập nhật state UI tạm thời ở đây
                                                if(gioHang) {
                                                    const updatedChiTiet = gioHang.danhSachChiTietGioHang.map(ct =>
                                                        ct.maSach === item.maSach ? { ...ct, soLuong: newQuantity } : ct
                                                    );
                                                    const tongTienMoi = updatedChiTiet.reduce((sum, ct) => sum + ct.giaBan * ct.soLuong, 0);
                                                    setGioHang({ ...gioHang, danhSachChiTietGioHang: updatedChiTiet, tongTien: tongTienMoi });
                                                }
                                            } else if (enteredValue === '') {
                                                // Nếu xóa hết số, có thể tạm hiển thị là 1 hoặc giữ state cũ
                                                if(gioHang) {
                                                    const updatedChiTiet = gioHang.danhSachChiTietGioHang.map(ct =>
                                                        ct.maSach === item.maSach ? { ...ct, soLuong: 1 } : ct // Tạm để là 1
                                                    );
                                                    const tongTienMoi = updatedChiTiet.reduce((sum, ct) => sum + ct.giaBan * ct.soLuong, 0);
                                                    setGioHang({ ...gioHang, danhSachChiTietGioHang: updatedChiTiet, tongTien: tongTienMoi });
                                                }
                                            }
                                        }}
                                        onBlur={(e) => { // Xử lý chính khi người dùng rời khỏi input
                                            const finalQuantityStr = e.target.value;
                                            const finalQuantity = parseInt(finalQuantityStr);

                                            // Nếu giá trị cuối cùng không hợp lệ (rỗng, chữ, < 1)
                                            if (isNaN(finalQuantity) || finalQuantity < 1) {
                                                // Lấy lại số lượng *hiện tại* của item này từ state `gioHang`
                                                // (Lưu ý: `item.soLuong` ở đây có thể đã bị thay đổi bởi onChange phía trên,
                                                // nên cần lấy từ state `gioHang` để chắc chắn)
                                                const currentItemState = gioHang?.danhSachChiTietGioHang.find(ct => ct.maSach === item.maSach);
                                                const validQuantity = currentItemState ? currentItemState.soLuong : 1;

                                                // Gọi hàm cập nhật để reset về giá trị hợp lệ
                                                handleCapNhatSoLuong(item.maSach, validQuantity);

                                                // Cập nhật lại giá trị hiển thị của input nếu cần
                                                e.target.value = validQuantity.toString();
                                            } else {
                                                // Nếu giá trị hợp lệ, gọi API để cập nhật
                                                handleCapNhatSoLuong(item.maSach, finalQuantity);
                                            }
                                        }}
                                        style={{ MozAppearance: 'textfield', maxWidth: '50px' }}
                                        aria-label={`Số lượng cho ${item.tenSach}`}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => handleCapNhatSoLuong(item.maSach, item.soLuong + 1)}
                                        // Thêm kiểm tra tồn kho nếu cần
                                    >+</button>
                                </div>
                            </td>
                            <td className="text-end fw-bold">{dinhDangSo(item.giaBan * item.soLuong)} đ</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleXoaSach(item.maSach)}
                                    title={`Xóa ${item.tenSach} khỏi giỏ hàng`}
                                > <i className="fas fa-trash-alt"></i> </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="table-light">
                        <td colSpan={4} className="text-end fw-bold">Tổng cộng:</td>
                        <td className="text-end fw-bold h5 text-danger">{dinhDangSo(gioHang.tongTien)} đ</td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div className="d-flex justify-content-between mt-3 flex-column flex-sm-row">
                <Link to="/" className="btn btn-outline-primary mb-2 mb-sm-0"><i className="fas fa-arrow-left me-1"></i> Tiếp tục mua sắm</Link>
                <Link to="/thanh-toan/dia-chi" className="btn btn-success">Tiến hành thanh toán <i className="fas fa-arrow-right ms-1"></i></Link>
            </div>
        </div>
    );
};

export default GioHang;

