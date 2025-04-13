// src/pages/TaiKhoanHoSo.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// === Sửa lại đường dẫn import nếu cần ===
import { isLoggedIn } from '../layouts/Utils/authCheck';
import { UserInfoDTO } from '../dto/UserInfoDTO';
// === Kết thúc sửa đường dẫn ===

const TaiKhoanHoSo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfoDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra đăng nhập trước
        if (!isLoggedIn()) {
            alert("Vui lòng đăng nhập để xem hồ sơ.");
            navigate('/dang-nhap', { replace: true, state: { from: '/tai-khoan/ho-so' } }); // Chuyển về trang đăng nhập
            return;
        }

        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        // Gọi API lấy thông tin user
        fetch('http://localhost:8080/tai-khoan/thongtin', {
            headers: {
                'Authorization': `Bearer ${token}` // Gửi token
            }
        })
            .then(async res => {
                if (!res.ok) {
                    // Xử lý lỗi từ API
                    const errorText = await res.text().catch(() => `Status ${res.status}`);
                    let displayError = `Lỗi ${res.status}`;
                    try {
                        const errorJson = JSON.parse(errorText);
                        displayError = errorJson.noiDung || errorJson.message || errorText;
                    } catch (e) {
                        displayError = errorText || displayError;
                    }
                    // Nếu lỗi 401 (Unauthorized) có thể do token hết hạn
                    if (res.status === 401) {
                        displayError += ". Token có thể đã hết hạn, vui lòng đăng nhập lại.";
                        // Có thể tự động logout ở đây nếu muốn
                        // localStorage.removeItem('token');
                        // localStorage.removeItem('userRoles');
                        // window.dispatchEvent(new Event('authChange'));
                        // navigate('/dang-nhap', { replace: true });
                    }
                    throw new Error(displayError);
                }
                return await res.json(); // Parse dữ liệu nếu thành công
            })
            .then((data: UserInfoDTO) => {
                setUserInfo(data); // Lưu thông tin user vào state
                setLoading(false);
            })
            .catch(err => {
                // Bắt lỗi từ fetch hoặc từ throw new Error ở trên
                setError(err.message);
                setLoading(false);
                console.error("Lỗi fetch hồ sơ:", err);
            });

    }, [navigate]); // useEffect chỉ chạy 1 lần khi component mount

    // --- Render Trạng Thái ---
    if (loading) {
        return <div className="container mt-4 text-center"><h5>Đang tải thông tin hồ sơ...</h5></div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
    }

    // Nếu không loading, không lỗi, nhưng không có userInfo (ít xảy ra nếu API đúng)
    if (!userInfo) {
        return <div className="container mt-4 alert alert-warning">Không thể tải thông tin hồ sơ.</div>;
    }

    // --- Render Thông Tin Hồ Sơ ---
    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: '700px' }}>
            <h1 className="mb-4">Hồ sơ của bạn</h1>
            <div className="card">
                <div className="card-header">
                    Thông tin tài khoản
                </div>
                <div className="card-body">
                    <dl className="row"> {/* Dùng definition list cho đẹp */}
                        <dt className="col-sm-4">Tên đăng nhập:</dt>
                        <dd className="col-sm-8">{userInfo.tenDangNhap}</dd>

                        <dt className="col-sm-4">Họ và tên:</dt>
                        <dd className="col-sm-8">{`${userInfo.hoDem || ''} ${userInfo.ten || ''}`.trim() || '(Chưa cập nhật)'}</dd>

                        <dt className="col-sm-4">Email:</dt>
                        <dd className="col-sm-8">{userInfo.email}</dd>

                        {/* Thêm các thông tin khác nếu API trả về và DTO có */}
                        {/*
                         <dt className="col-sm-4">Số điện thoại:</dt>
                         <dd className="col-sm-8">{userInfo.soDienThoai || '(Chưa cập nhật)'}</dd>

                         <dt className="col-sm-4">Giới tính:</dt>
                         <dd className="col-sm-8">{userInfo.gioiTinh === 'F' ? 'Nữ' : userInfo.gioiTinh === 'M' ? 'Nam' : '(Chưa cập nhật)'}</dd>
                         */}

                        <dt className="col-sm-4">Quyền truy cập:</dt>
                        <dd className="col-sm-8">
                            {userInfo.roles?.map(role => (
                                // Hiển thị các quyền dưới dạng badge
                                <span key={role} className={`badge me-1 ${role.toLowerCase() === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                                    {role}
                                </span>
                            ))}
                        </dd>
                    </dl>

                    {/* TODO: Thêm nút/form Chỉnh sửa hồ sơ */}
                    {/* <button className="btn btn-primary mt-3">Chỉnh sửa hồ sơ</button> */}
                </div>
            </div>
        </div>
    );
};

export default TaiKhoanHoSo;