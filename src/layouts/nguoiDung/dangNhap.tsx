// src/layouts/nguoiDung/DangNhap.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Thêm Link và useNavigate
// import { jwtDecode } from "jwt-decode"; // Không cần decode ở đây

const DangNhap = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
            return;
        }
        setIsLoading(true);
        setError('');

        const loginRequest = { username: username, password: password };

        fetch('http://localhost:8080/tai-khoan/dang-nhap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginRequest)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        let errorMsg = `Lỗi ${response.status}: `;
                        try {
                            const errorJson = JSON.parse(text);
                            errorMsg += errorJson.message || errorJson.error || text;
                        } catch (e) {
                            errorMsg += text || "Sai tên đăng nhập hoặc mật khẩu.";
                        }
                        throw new Error(errorMsg);
                    });
                }
            })
            .then((data) => {
                const { jwt } = data;
                if (jwt) { // Kiểm tra có jwt không
                    localStorage.setItem('token', jwt); // Lưu token
                    // Bắn sự kiện báo đăng nhập thành công cho Navbar
                    window.dispatchEvent(new CustomEvent('loginSuccess'));
                    console.log("Dispatched loginSuccess event"); // Debug
                    // Chuyển hướng về trang chủ
                    navigate('/');
                } else {
                    // Trường hợp response ok nhưng không có jwt (bất thường)
                    throw new Error("Phản hồi đăng nhập không hợp lệ.");
                }
            })
            .catch((error: any) => {
                console.error('Đăng nhập thất bại: ', error);
                setError(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // --- JSX Đã Cải Thiện ---
    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4 text-center fw-normal">Đăng nhập</h1>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={(e)=>{ e.preventDefault(); handleLogin(); }}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Tên đăng nhập hoặc Email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="username">Tên đăng nhập hoặc Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                    <label htmlFor="inputPassword">Mật khẩu</label>
                                </div>
                                <div className="checkbox mb-3 text-start">
                                    {/* <label><input type="checkbox" value="remember-me" disabled={isLoading} /> Ghi nhớ tôi</label> */}
                                </div>
                                <button
                                    className="w-100 btn btn-lg btn-primary"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? ( /* ... spinner ... */ "Đang đăng nhập..." ) : ( "Đăng nhập" )}
                                </button>
                            </form>
                            <div className="mt-3 text-center">
                                <p>Chưa có tài khoản? <Link to="/dang-ky">Đăng ký tại đây</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DangNhap;