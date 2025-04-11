import React, { useState, useEffect } from "react"; // Đã thêm lại useEffect nếu cần sau này
import { Link } from "react-router-dom"; // Thêm Link để tạo liên kết Đăng nhập

function DangKyNguoiDung() {

    // --- State cho các trường input ---
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, setHoDem] = useState(""); // Sửa tên state từ setHoDen
    const [ten, setTen] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('M'); // Mặc định là 'M' (Nam)
    const [avatar, setAvatar] = useState<File | null>(null); // State cho file avatar

    // --- State cho thông báo lỗi và trạng thái xử lý ---
    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
    const [thongBao, setThongBao] = useState(""); // Thông báo chung (thành công/lỗi submit)
    const [dangXuLy, setDangXuLy] = useState(false); // Trạng thái disable nút submit

    // --- Hàm chuyển đổi file sang Base64 ---
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            // Trả về chuỗi base64 đầy đủ (bao gồm cả tiền tố data:...)
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // --- ĐỊNH NGHĨA CÁC HÀM KIỂM TRA (VALIDATION) ---

    // KIỂM TRA TÊN ĐĂNG NHẬP (Đã tồn tại chưa?) - async
    const kiemTraTenDangNhapDaTonTai = async (tdn: string): Promise<boolean> => {
        if (!tdn) {
            setErrorTenDangNhap("Tên đăng nhập không được để trống.");
            return true; // Có lỗi
        }
        // Thêm kiểm tra định dạng cơ bản nếu muốn (ví dụ: không chứa ký tự đặc biệt, độ dài...)
        // const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        // if (!usernameRegex.test(tdn)) {
        //     setErrorTenDangNhap("Tên đăng nhập chỉ chứa chữ, số, dấu gạch dưới, từ 3-20 ký tự.");
        //     return true;
        // }

        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${encodeURIComponent(tdn)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API check username failed: ${response.status}`);
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap("Tên đăng nhập này đã được sử dụng!");
                return true; // Lỗi: đã tồn tại
            }
            setErrorTenDangNhap(""); // Hợp lệ
            return false; // Không lỗi
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
            setErrorTenDangNhap("Lỗi kết nối khi kiểm tra tên đăng nhập.");
            return true; // Coi như lỗi để ngăn submit
        }
    }

    // KIỂM TRA EMAIL (Định dạng + Đã tồn tại chưa?) - async
    const kiemTraEmailDaTonTai = async (eml: string): Promise<boolean> => {
        if (!eml) {
            setErrorEmail("Email không được để trống.");
            return true; // Lỗi
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(eml)) {
            setErrorEmail("Định dạng email không hợp lệ.");
            return true; // Lỗi định dạng
        }

        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${encodeURIComponent(eml)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API check email failed: ${response.status}`);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email này đã được sử dụng!");
                return true; // Lỗi: đã tồn tại
            }
            setErrorEmail(""); // Hợp lệ
            return false; // Không lỗi
        } catch (error) {
            console.error("Lỗi khi kiểm tra email:", error);
            setErrorEmail("Lỗi kết nối khi kiểm tra email.");
            return true; // Coi như lỗi
        }
    }

    // KIỂM TRA MẬT KHẨU (Độ phức tạp) - sync
    const kiemTraMatKhau = (mk: string): boolean => {
        if (!mk) {
            setErrorMatKhau("Mật khẩu không được để trống.");
            return true; // Lỗi
        }
        // Yêu cầu: Ít nhất 8 ký tự, bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)
        const passwordRegex = /^(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(mk)) {
            setErrorMatKhau("Mật khẩu phải ít nhất 8 ký tự và chứa 1 ký tự đặc biệt (!@#$%^&*).");
            return true; // Lỗi
        }
        setErrorMatKhau(""); // Hợp lệ
        return false; // Không lỗi
    }

    // KIỂM TRA MẬT KHẨU LẶP LẠI (Khớp chưa?) - sync
    const kiemTraMatKhauLapLai = (mklp: string, mkGoc: string = matKhau): boolean => {
        if (!mklp) {
            setErrorMatKhauLapLai("Vui lòng nhập lại mật khẩu.");
            return true; // Lỗi
        }
        if (mklp !== mkGoc) {
            setErrorMatKhauLapLai("Mật khẩu không trùng khớp.");
            return true; // Lỗi
        }
        setErrorMatKhauLapLai(""); // Hợp lệ
        return false; // Không lỗi
    }

    // --- CÁC HÀM XỬ LÝ SỰ KIỆN THAY ĐỔI INPUT (handle...Change) ---

    const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(e.target.value);
        if (errorTenDangNhap) setErrorTenDangNhap(''); // Xóa lỗi khi người dùng bắt đầu gõ lại
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errorEmail) setErrorEmail('');
    }
    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setMatKhau(newValue);
        kiemTraMatKhau(newValue); // Kiểm tra ngay khi gõ
        // Kiểm tra lại mật khẩu lặp lại nếu nó đã được nhập
        if (matKhauLapLai) {
            kiemTraMatKhauLapLai(matKhauLapLai, newValue); // Truyền mật khẩu mới vào để so sánh
        }
    }
    const handleMatKhauLapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setMatKhauLapLai(newValue);
        kiemTraMatKhauLapLai(newValue, matKhau); // Kiểm tra ngay khi gõ
    }
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Optional: Add file size/type validation here
            const maxSize = 2 * 1024 * 1024; // 2MB example limit
            if (file.size > maxSize) {
                alert("Kích thước ảnh không được vượt quá 2MB.");
                e.target.value = ''; // Reset input
                setAvatar(null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                alert("Định dạng ảnh không được hỗ trợ (chỉ chấp nhận JPG, PNG, GIF).");
                e.target.value = ''; // Reset input
                setAvatar(null);
                return;
            }
            setAvatar(file);
        } else {
            setAvatar(null);
        }
    };

    // --- CÁC HÀM XỬ LÝ KHI RỜI KHỎI Ô INPUT (handle...Blur) ---
    // Mục đích: Kiểm tra username/email tồn tại khi người dùng nhập xong và rời đi
    const handleTenDangNhapBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) { // Chỉ kiểm tra nếu có giá trị
            kiemTraTenDangNhapDaTonTai(e.target.value);
        }
    }
    const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) { // Chỉ kiểm tra nếu có giá trị
            kiemTraEmailDaTonTai(e.target.value);
        }
    }


    // --- HÀM XỬ LÝ KHI SUBMIT FORM ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn submit form mặc định
        setThongBao("");    // Xóa thông báo cũ

        // --- Thực hiện lại validation lần cuối trước khi submit ---
        let hasError = false;
        // Sử dụng Promise.all để chạy kiểm tra async song song (nhanh hơn)
        const results = await Promise.all([
            kiemTraTenDangNhapDaTonTai(tenDangNhap),
            kiemTraEmailDaTonTai(email)
        ]);
        // Kiểm tra kết quả async và các kiểm tra sync
        if (results[0] || results[1] || kiemTraMatKhau(matKhau) || kiemTraMatKhauLapLai(matKhauLapLai, matKhau)) {
            hasError = true;
        }
        // Kiểm tra các trường bắt buộc khác (Tên)
        if (!ten.trim()) {
            // Có thể thêm state lỗi riêng cho Tên hoặc đánh dấu lỗi chung
            hasError = true;
        }


        // Nếu có lỗi, dừng lại
        if (hasError) {
            setThongBao("Vui lòng kiểm tra lại các thông tin bắt buộc và các báo lỗi.");
            // Focus vào trường lỗi đầu tiên (tùy chọn)
            // document.getElementById('tenDangNhap')?.focus(); // Ví dụ
            return;
        }

        // --- Nếu không có lỗi validation -> Tiến hành submit ---
        setDangXuLy(true); // Bắt đầu xử lý
        setThongBao("Đang xử lý đăng ký...");

        let base64Avatar = null;
        if (avatar) {
            try {
                base64Avatar = await getBase64(avatar);
            } catch (error) {
                console.error("Lỗi chuyển đổi avatar sang base64:", error);
                setThongBao("Lỗi xử lý ảnh đại diện. Vui lòng thử lại hoặc bỏ qua ảnh.");
                setDangXuLy(false);
                return; // Dừng nếu lỗi ảnh
            }
        }


        try {
            const url = 'http://localhost:8080/tai-khoan/dang-ky';
            const userData = {
                tenDangNhap: tenDangNhap.trim(), // Trim() để loại bỏ khoảng trắng thừa
                email: email.trim(),
                matKhau: matKhau, // BE sẽ mã hóa
                hoDem: hoDem.trim(),
                ten: ten.trim(),
                soDienThoai: soDienThoai.trim(),
                gioiTinh: gioiTinh,
                avatar: base64Avatar // Gửi base64 hoặc null
            };
            // console.log("Sending data:", JSON.stringify(userData, null, 2)); // Log dữ liệu gửi đi

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(userData)
            });

            // Xử lý phản hồi từ Backend
            if (response.ok) {
                const successMessage = await response.text();
                setThongBao(successMessage + ", vui lòng kiểm tra email để kích hoạt!");
                // Reset form sau khi thành công (tùy chọn)
                // setTenDangNhap(""); setEmail(""); setHoDem(""); setTen(""); setSoDienThoai("");
                // setMatKhau(""); setMatKhauLapLai(""); setGioiTinh('M'); setAvatar(null);
                // setErrorTenDangNhap(""); setErrorEmail(""); setErrorMatKhau(""); setErrorMatKhauLapLai("");
            } else {
                const errorText = await response.text();
                console.error("Backend error response (text):", errorText);
                let displayError = `Lỗi ${response.status}: `;
                try {
                    const errorJson = JSON.parse(errorText);
                    displayError += errorJson.noiDung || JSON.stringify(errorJson);
                } catch (parseError) {
                    if (errorText.toLowerCase().includes('<html') || errorText.length > 200) {
                        displayError += "Lỗi từ máy chủ. Vui lòng thử lại hoặc kiểm tra logs backend.";
                    } else if (errorText.trim()) {
                        displayError += errorText;
                    } else {
                        displayError += response.statusText || "Lỗi không xác định.";
                    }
                }
                setThongBao(displayError);
            }
        } catch (error: any) {
            console.error("Fetch/Client-side error:", error);
            setThongBao("Không thể kết nối đến máy chủ đăng ký. Vui lòng thử lại sau.");
        } finally {
            setDangXuLy(false); // Kết thúc xử lý
        }
    } // Kết thúc hàm handleSubmit


    // --- JSX ---
    return (
        <div className="container mb-5"> {/* Thêm margin bottom */}
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h1 className="mt-4 mb-4 text-center">Đăng ký tài khoản</h1>
                    {/* Hiển thị thông báo chung */}
                    {thongBao && (
                        <div className={`alert ${thongBao.startsWith('Lỗi') ? 'alert-danger' : 'alert-success'}`} role="alert">
                            {thongBao}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Tên đăng nhập */}
                        <div className="mb-3">
                            <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="tenDangNhap"
                                className={`form-control ${errorTenDangNhap ? 'is-invalid' : ''}`}
                                value={tenDangNhap}
                                onChange={handleTenDangNhapChange}
                                onBlur={handleTenDangNhapBlur}
                                required
                                disabled={dangXuLy} // Disable khi đang xử lý
                            />
                            <div className="invalid-feedback">
                                {errorTenDangNhap || "Vui lòng nhập tên đăng nhập."}
                            </div>
                        </div>
                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${errorEmail ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                required
                                disabled={dangXuLy}
                            />
                            <div className="invalid-feedback">
                                {errorEmail || "Vui lòng nhập địa chỉ email hợp lệ."}
                            </div>
                        </div>
                        {/* Mật khẩu */}
                        <div className="mb-3">
                            <label htmlFor="matKhau" className="form-label">Mật khẩu <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                id="matKhau"
                                className={`form-control ${errorMatKhau ? 'is-invalid' : ''}`}
                                value={matKhau}
                                onChange={handleMatKhauChange}
                                required
                                disabled={dangXuLy}
                            />
                            <div className="invalid-feedback">
                                {errorMatKhau || "Vui lòng nhập mật khẩu."}
                            </div>
                            {!errorMatKhau && <div className="form-text">Ít nhất 8 ký tự, bao gồm 1 ký tự đặc biệt (!@#$%^&*).</div>}
                        </div>
                        {/* Nhập lại mật khẩu */}
                        <div className="mb-3">
                            <label htmlFor="matKhauLapLai" className="form-label">Nhập lại mật khẩu <span className="text-danger">*</span></label>
                            <input
                                type="password"
                                id="matKhauLapLai"
                                className={`form-control ${errorMatKhauLapLai ? 'is-invalid' : ''}`}
                                value={matKhauLapLai}
                                onChange={handleMatKhauLapLaiChange}
                                required
                                disabled={dangXuLy}
                            />
                            <div className="invalid-feedback">
                                {errorMatKhauLapLai || "Vui lòng nhập lại mật khẩu."}
                            </div>
                        </div>
                        {/* Họ đệm */}
                        <div className="mb-3">
                            <label htmlFor="hoDem" className="form-label">Họ đệm</label>
                            <input
                                type="text"
                                id="hoDem"
                                className="form-control"
                                value={hoDem}
                                onChange={(e) => setHoDem(e.target.value)} // Sửa lại setHoDem
                                disabled={dangXuLy}
                            />
                        </div>
                        {/* Tên */}
                        <div className="mb-3">
                            <label htmlFor="ten" className="form-label">Tên <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="ten"
                                className="form-control"
                                value={ten}
                                onChange={(e) => setTen(e.target.value)}
                                required
                                disabled={dangXuLy}
                            />
                            {/* Không cần invalid-feedback nếu chỉ dùng required của HTML,
                                 nhưng nếu muốn báo lỗi rõ hơn khi submit mà trống thì cần state lỗi riêng */}
                        </div>
                        {/* Số điện thoại */}
                        <div className="mb-3">
                            <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                            <input
                                type="tel"
                                id="soDienThoai"
                                className="form-control"
                                value={soDienThoai}
                                onChange={(e) => setSoDienThoai(e.target.value)}
                                disabled={dangXuLy}
                            />
                        </div>
                        {/* Giới tính */}
                        <div className="mb-3">
                            <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                            <select
                                id="gioiTinh"
                                className="form-select"
                                value={gioiTinh}
                                onChange={(e) => setGioiTinh(e.target.value)}
                                disabled={dangXuLy} >
                                <option value="M">Nam</option>
                                <option value="F">Nữ</option>
                                {/* <option value="O">Khác</option>  */}
                                {/* Backend đang là char, có thể chỉ nhận M/F */}
                            </select>
                        </div>
                        {/* Avatar */}
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Ảnh đại diện (Avatar)</label>
                            <input
                                type="file"
                                id="avatar"
                                className="form-control"
                                accept="image/png, image/jpeg, image/gif"
                                onChange={handleAvatarChange}
                                disabled={dangXuLy}
                            />
                            {avatar && (
                                <div className="mt-2">
                                    <img src={URL.createObjectURL(avatar)} alt="Xem trước avatar" style={{maxWidth: '100px', maxHeight: '100px', objectFit: 'cover', borderRadius: '50%'}} />
                                    <button type="button" className="btn btn-sm btn-link text-danger" onClick={() => {setAvatar(null); (document.getElementById('avatar') as HTMLInputElement).value = '';}} title="Xóa ảnh đã chọn">Xóa ảnh</button>
                                </div>
                            )}
                        </div>
                        {/* Nút Submit */}
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={dangXuLy}>
                                {dangXuLy ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Đang đăng ký...
                                    </>
                                ) : ( "Đăng Ký" )}
                            </button>
                        </div>
                    </form>
                    {/* Link đăng nhập */}
                    <div className="text-center mt-3 py-3">
                        <p className="mb-0">Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập tại đây</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangKyNguoiDung;