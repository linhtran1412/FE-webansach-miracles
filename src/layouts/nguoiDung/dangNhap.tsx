// // src/layouts/nguoiDung/DangNhap.tsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; // Thêm Link và useNavigate
// // import { jwtDecode } from "jwt-decode"; // Không cần decode ở đây
//
// const DangNhap = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//
//     const handleLogin = () => {
//         if (!username || !password) {
//             setError("Vui lòng nhập tên đăng nhập và mật khẩu.");
//             return;
//         }
//         setIsLoading(true);
//         setError('');
//
//         const loginRequest = { username: username, password: password };
//
//         fetch('http://localhost:8080/tai-khoan/dang-nhap', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(loginRequest)
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 } else {
//                     return response.text().then(text => {
//                         let errorMsg = `Lỗi ${response.status}: `;
//                         try {
//                             const errorJson = JSON.parse(text);
//                             errorMsg += errorJson.message || errorJson.error || text;
//                         } catch (e) {
//                             errorMsg += text || "Sai tên đăng nhập hoặc mật khẩu.";
//                         }
//                         throw new Error(errorMsg);
//                     });
//                 }
//             })
//             .then((data) => {
//                 const { jwt } = data;
//                 if (jwt) { // Kiểm tra có jwt không
//                     localStorage.setItem('token', jwt); // Lưu token
//                     // Bắn sự kiện báo đăng nhập thành công cho Navbar
//                     window.dispatchEvent(new CustomEvent('loginSuccess'));
//                     console.log("Dispatched loginSuccess event"); // Debug
//                     // Chuyển hướng về trang chủ
//                     navigate('/');
//                 } else {
//                     // Trường hợp response ok nhưng không có jwt (bất thường)
//                     throw new Error("Phản hồi đăng nhập không hợp lệ.");
//                 }
//             })
//             .catch((error: any) => {
//                 console.error('Đăng nhập thất bại: ', error);
//                 setError(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
//             })
//             .finally(() => {
//                 setIsLoading(false);
//             });
//     }
//
//     // --- JSX Đã Cải Thiện ---
//     return (
//         <div className="container mt-4 mb-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 col-lg-5">
//                     <div className="card shadow-sm">
//                         <div className="card-body p-4">
//                             <h1 className="h3 mb-4 text-center fw-normal">Đăng nhập</h1>
//                             {error && (
//                                 <div className="alert alert-danger" role="alert">
//                                     {error}
//                                 </div>
//                             )}
//                             <form onSubmit={(e)=>{ e.preventDefault(); handleLogin(); }}>
//                                 <div className="form-floating mb-3">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="username"
//                                         placeholder="Tên đăng nhập hoặc Email"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                         required
//                                         disabled={isLoading}
//                                     />
//                                     <label htmlFor="username">Tên đăng nhập hoặc Email</label>
//                                 </div>
//                                 <div className="form-floating mb-3">
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         id="inputPassword"
//                                         placeholder="Password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                         disabled={isLoading}
//                                     />
//                                     <label htmlFor="inputPassword">Mật khẩu</label>
//                                 </div>
//                                 <div className="checkbox mb-3 text-start">
//                                     {/* <label><input type="checkbox" value="remember-me" disabled={isLoading} /> Ghi nhớ tôi</label> */}
//                                 </div>
//                                 <button
//                                     className="w-100 btn btn-lg btn-primary"
//                                     type="submit"
//                                     disabled={isLoading}
//                                 >
//                                     {isLoading ? ( /* ... spinner ... */ "Đang đăng nhập..." ) : ( "Đăng nhập" )}
//                                 </button>
//                             </form>
//                             <div className="mt-3 text-center">
//                                 <p>Chưa có tài khoản? <Link to="/dang-ky">Đăng ký tại đây</Link></p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default DangNhap;



// src/layouts/nguoiDung/DangNhap.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
        setError(''); // Xóa lỗi cũ

        const loginRequest = { username: username, password: password };

        // 1. Gọi API đăng nhập
        fetch('http://localhost:8080/tai-khoan/dang-nhap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginRequest)
        })
            .then((response) => {
                // Xử lý phản hồi từ API đăng nhập
                if (response.ok) {
                    return response.json(); // Lấy jwt nếu thành công
                } else {
                    // Xử lý lỗi từ API đăng nhập
                    return response.text().then(text => {
                        let errorMsg = `Lỗi ${response.status}: `;
                        try {
                            const errorJson = JSON.parse(text);
                            // Ưu tiên lấy noiDung nếu có (từ ThongBao DTO của bạn)
                            errorMsg += errorJson.noiDung || errorJson.message || errorJson.error || text;
                        } catch (e) {
                            errorMsg += text || "Sai tên đăng nhập hoặc mật khẩu.";
                        }
                        throw new Error(errorMsg); // Ném lỗi để .catch() bắt
                    });
                }
            })
            .then((data) => {
                // 2. Xử lý khi có JWT
                const { jwt } = data;
                if (jwt) {
                    setError('Đăng nhập thành công! Đang lấy thông tin quyền...'); // Thông báo tạm
                    localStorage.setItem('token', jwt); // Lưu token

                    // 3. Gọi API /tai-khoan/thongtin để lấy roles
                    fetch('http://localhost:8080/tai-khoan/thongtin', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${jwt}` // Gửi kèm token
                        }
                    })
                        .then(async res => { // Dùng async để đợi
                            if (!res.ok) {
                                const errorText = await res.text().catch(() => `Status ${res.status}`);
                                console.error('Lỗi fetch user info:', errorText);
                                localStorage.removeItem('userRoles'); // Xóa roles nếu lỗi
                                setError('Đăng nhập thành công nhưng không lấy được thông tin quyền.'); // Cập nhật lỗi
                                return null; // Báo hiệu lỗi
                            }
                            return await res.json(); // Lấy user info
                        })
                        .then(userInfo => {
                            // Biến để kiểm tra xem có cần navigate không
                            let shouldNavigate = true;

                            if (userInfo && userInfo.roles && Array.isArray(userInfo.roles)) {
                                // 4. Lưu roles vào localStorage nếu thành công
                                localStorage.setItem('userRoles', JSON.stringify(userInfo.roles));
                                console.log("Đã lưu user roles vào localStorage:", userInfo.roles); // Debug
                                setError(''); // Xóa thông báo chờ/lỗi
                            } else {
                                // API trả về thành công nhưng không có roles hoặc lỗi ở bước trước (userInfo=null)
                                if (userInfo !== null) { // Chỉ log nếu userInfo không phải null (tức là API /thongtin trả về 200 OK)
                                    console.warn("API /thongtin không trả về roles hợp lệ:", userInfo);
                                    setError('Đăng nhập thành công nhưng thiếu thông tin quyền.');
                                }
                                localStorage.removeItem('userRoles'); // Đảm bảo xóa roles
                            }

                            // 5. Bắn sự kiện báo trạng thái auth đã thay đổi (luôn bắn ra)
                            window.dispatchEvent(new Event('authChange'));
                            console.log("Đã bắn sự kiện authChange."); // Debug

                            // 6. Chuyển hướng về trang chủ (nếu không có lỗi nghiêm trọng ở fetch /thongtin)
                            if (shouldNavigate) {
                                navigate('/');
                            }
                            // Tắt loading ở đây sau khi mọi thứ hoàn tất (kể cả navigate)
                            setIsLoading(false);


                        })
                        .catch(err => { // Bắt lỗi của fetch /thongtin (lỗi mạng...)
                            console.error("Lỗi mạng khi fetch/lưu user info:", err);
                            localStorage.removeItem('userRoles'); // Dọn dẹp
                            setError('Lỗi kết nối khi lấy thông tin người dùng.');
                            window.dispatchEvent(new Event('authChange')); // Vẫn bắn sự kiện
                            setIsLoading(false); // Nhớ tắt loading ở đây
                            // Không chuyển hướng khi có lỗi mạng
                        });

                } else {
                    // Trường hợp API /dang-nhap trả về 200 OK nhưng không có jwt
                    setIsLoading(false); // Tắt loading
                    throw new Error("Phản hồi đăng nhập không hợp lệ (thiếu jwt).");
                }
            })
            .catch((error: any) => { // Bắt lỗi của fetch /dang-nhap hoặc lỗi ném ra từ .then()
                console.error('Xử lý đăng nhập thất bại: ', error);
                setError(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
                setIsLoading(false); // Tắt loading khi có lỗi
            });
    }

    // --- Phần JSX giữ nguyên ---
    return (
        <div className="container mt-4 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4 text-center fw-normal">Đăng nhập</h1>
                            {/* Hiển thị lỗi hoặc thông báo chờ */}
                            {error && (
                                <div className={`alert ${error.includes('Lỗi') || error.includes('Sai') || error.includes('thất bại') ? 'alert-danger' : 'alert-info'}`} role="alert">
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
                                <button
                                    className="w-100 btn btn-lg btn-primary"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Đang xử lý...
                                        </>
                                    ) : ( "Đăng nhập" )}
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