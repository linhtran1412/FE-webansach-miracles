// import { request } from "./request";
// import DonHangModel from "../models/DonHangModel";
//
// // Lấy tất cả đơn hàng (Admin)
// export async function layToanBoDonHang(): Promise<DonHangModel[]> {
//     return request("http://localhost:8080/don-hang");
// }
//
// // Lấy đơn hàng theo người dùng (User)
// // export async function layDonHangTheoNguoiDung(maNguoiDung: number): Promise<DonHangModel[]> {
// //     return request(`http://localhost:8080/don-hang/nguoi-dung/${maNguoiDung}`);
// // }
// export async function layDonHangTheoNguoiDung(maNguoiDung: number): Promise<DonHangModel[]> {
//     console.log(`📤 Gửi yêu cầu lấy đơn hàng của user ID: ${maNguoiDung}`);
//     return fetch(`http://localhost:8080/don-hang/nguoi-dung/${maNguoiDung}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log("✅ Dữ liệu đơn hàng nhận về:", data);
//             return data;
//         })
//         .catch(error => {
//             console.error("❌ Lỗi khi lấy đơn hàng của user:", error);
//             return [];
//         });
// }
//
// // Thêm mới đơn hàng
// export async function themDonHang(donHang: DonHangModel) {
//     console.log("📤 Gửi yêu cầu thêm đơn hàng:", donHang);
//     return fetch("http://localhost:8080/don-hang", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(donHang),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log("✅ Server trả về:", data);
//             return data;
//         })
//         .catch(error => {
//             console.error("❌ Lỗi API themDonHang:", error);
//             throw error;
//         });
// }
//
// // Cập nhật đơn hàng
// export async function capNhatDonHang(donHang: DonHangModel) {
//     console.log("📤 Gửi yêu cầu cập nhật đơn hàng:", donHang);
//     return fetch(`http://localhost:8080/don-hang/${donHang.maDonHang}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(donHang),
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log("✅ Server trả về:", data);
//             return data;
//         })
//         .catch(error => {
//             console.error("❌ Lỗi API capNhatDonHang:", error);
//             throw error;
//         });
// }
//
// // Xóa đơn hàng
// export async function xoaDonHang(maDonHang: number) {
//     console.log("📤 Gửi yêu cầu xóa đơn hàng:", maDonHang);
//     return fetch(`http://localhost:8080/don-hang/${maDonHang}`, {
//         method: "DELETE"
//     })
//         .then(response => {
//             if (!response.ok) throw new Error("Lỗi khi xóa đơn hàng");
//             console.log("✅ Đơn hàng đã xóa:", maDonHang);
//         })
//         .catch(error => {
//             console.error("❌ Lỗi API xoaDonHang:", error);
//             throw error;
//         });
// }
//
//


// // src/API/DonHangAPI.ts (hoặc .tsx)
//
// // Bỏ DonHangModel nếu không dùng nữa trong các hàm khác
// import DonHangModel from "../models/DonHangModel";
//
// // <<< SỬA ĐƯỜNG DẪN IMPORT DTO Ở ĐÂY >>>
// import { DonHangDTO } from "../dto/DonHangDTO"; // Chỉ cần ../ để đi từ API ra src rồi vào dto
//
// // Hàm tiện ích lấy token
// const getToken = () => localStorage.getItem('token');
//
// // Hàm lấy đơn hàng của User (đã đúng)
// export async function layDonHangCuaToi(): Promise<DonHangDTO[]> {
//     const token = getToken();
//     if (!token) {
//         throw new Error("Bạn cần đăng nhập để xem đơn hàng.");
//     }
//     const url = 'http://localhost:8080/api/don-hang/my-orders';
//     console.log(`[DonHangAPI] Fetching my orders: GET ${url}`);
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (!response.ok) {
//             let errorMsg = `Lỗi ${response.status} khi lấy lịch sử đơn hàng`;
//             try {
//                 const errorData = await response.json().catch(() => response.text());
//                 if (typeof errorData === 'string') { errorMsg = `${errorMsg}: ${errorData}`; }
//                 else if (errorData && (errorData.message || errorData.noiDung)) { errorMsg = errorData.noiDung || errorData.message;}
//             } catch (e) { /* ignore */ }
//             throw new Error(errorMsg);
//         }
//         const data: DonHangDTO[] = await response.json();
//         console.log("✅ Dữ liệu đơn hàng cá nhân nhận về (DTO):", data);
//         return data;
//     } catch (error) {
//         console.error("[DonHangAPI] layDonHangCuaToi error:", error);
//         throw error;
//     }
// }
//
// // --- Các hàm cũ cho Admin/Staff (Giữ nguyên nhưng cần review sau) ---
//
// export async function layToanBoDonHang(): Promise<DonHangModel[]> { // Tạm giữ Model
//     const token = getToken();
//     try {
//         const response = await fetch("http://localhost:8080/api/don-hang", {
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (!response.ok) throw new Error("Lỗi tải toàn bộ đơn hàng");
//         return response.json();
//     } catch (error) {
//         console.error("Lỗi API layToanBoDonHang:", error);
//         throw error;
//     }
// }
//
// export async function themDonHang(donHang: DonHangModel) {
//     const token = getToken();
//     console.log("📤 Gửi yêu cầu thêm đơn hàng:", donHang);
//     try {
//         const response = await fetch("http://localhost:8080/api/don-hang", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(donHang),
//         });
//         if (!response.ok) throw new Error("Lỗi thêm đơn hàng");
//         return response.json();
//     } catch (error) {
//         console.error("❌ Lỗi API themDonHang:", error);
//         throw error;
//     }
// }
//
// export async function capNhatDonHang(donHang: DonHangModel) { // Tạm giữ Model
//     const token = getToken();
//     console.log("📤 Gửi yêu cầu cập nhật đơn hàng:", donHang);
//     try {
//         const response = await fetch(`http://localhost:8080/api/don-hang/${donHang.maDonHang}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(donHang),
//         });
//         if (!response.ok) throw new Error("Lỗi cập nhật đơn hàng");
//         return response.json();
//     } catch (error) {
//         console.error("❌ Lỗi API capNhatDonHang:", error);
//         throw error;
//     }
// }
//
// export async function xoaDonHang(maDonHang: number) {
//     const token = getToken();
//     console.log("📤 Gửi yêu cầu xóa đơn hàng:", maDonHang);
//     try {
//         const response = await fetch(`http://localhost:8080/api/don-hang/${maDonHang}`, {
//             method: "DELETE",
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (!response.ok) {
//             const errorText = await response.text().catch(() => response.statusText);
//             throw new Error(`Lỗi ${response.status} khi xóa đơn hàng: ${errorText}`);
//         }
//         console.log("✅ Đơn hàng đã xóa:", maDonHang);
//     } catch (error) {
//         console.error("❌ Lỗi API xoaDonHang:", error);
//         throw error;
//     }
// }
//
// /*
// // Hàm cũ đã comment hoặc xóa
// export async function layDonHangTheoNguoiDung(maNguoiDung: number): Promise<DonHangModel[]> {
//     // ... code cũ ...
// }
// */






// // src/API/DonHangAPI.ts
// import DonHangModel from "../models/DonHangModel"; // Đảm bảo import đúng model
//
// // Hàm tiện ích lấy token (nếu chưa có ở file dùng chung nào khác)
// const getToken = () => localStorage.getItem('token');
//
// // --- HÀM LẤY ĐƠN HÀNG CỦA USER HIỆN TẠI ---
// /**
//  * Gọi API để lấy danh sách đơn hàng của người dùng đang đăng nhập.
//  * Yêu cầu người dùng phải đăng nhập (có token).
//  * @returns Promise<DonHangModel[]> Mảng các đơn hàng của user.
//  */
// export async function layDonHangCuaToi(): Promise<DonHangModel[]> {
//     const token = getToken();
//     if (!token) {
//         console.error("[layDonHangCuaToi] Lỗi: Không tìm thấy token.");
//         throw new Error("Bạn cần đăng nhập để xem đơn hàng.");
//     }
//
//     // URL đúng của API đã tạo ở Backend (GET /don-hang/my-orders)
//     const url = 'http://localhost:8080/don-hang/my-orders';
//     console.log(`[DonHangAPI] Fetching my orders: GET ${url}`); // Debug
//
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}` // Gửi kèm token
//             }
//         });
//
//         if (!response.ok) {
//             const errorText = await response.text().catch(() => `Lỗi ${response.status}`);
//             console.error(`[layDonHangCuaToi] Lỗi ${response.status}:`, errorText);
//             // Ném lỗi để component DonHangList có thể bắt và hiển thị
//             throw new Error(errorText || `Lỗi ${response.status} khi lấy lịch sử đơn hàng`);
//         }
//
//         const data: DonHangModel[] = await response.json();
//         console.log("✅ Dữ liệu đơn hàng cá nhân nhận về:", data); // Debug
//         return data; // Trả về mảng DonHangModel
//
//     } catch (error) {
//         console.error("[DonHangAPI] layDonHangCuaToi fetch/parse error:", error);
//         throw error; // Ném lỗi ra để component xử lý
//     }
// }
//
// // --- CÁC HÀM API KHÁC CHO ADMIN (NẾU CẦN) ---
// // Lưu ý: Các hàm này cũng cần kiểm tra và gửi token nếu API Backend yêu cầu
//
// // Lấy tất cả đơn hàng (Admin)
// export async function layToanBoDonHangAdmin(): Promise<DonHangModel[]> {
//     const token = getToken();
//     if (!token) throw new Error("Yêu cầu quyền Admin."); // Cần token admin
//     // URL có thể là /don-hang hoặc /api/admin/don-hang tùy bạn đặt
//     const url = "http://localhost:8080/don-hang";
//     const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
//     if (!response.ok) throw new Error(`Lỗi ${response.status} khi lấy tất cả đơn hàng.`);
//     return await response.json();
// }
//
// // Thêm mới đơn hàng (Thường không gọi trực tiếp từ FE)
// // export async function themDonHang(donHang: DonHangModel) { ... }
//
// // Cập nhật đơn hàng (Admin/Staff)
// export async function capNhatDonHangAdmin(donHang: DonHangModel): Promise<DonHangModel> {
//     const token = getToken();
//     if (!token) throw new Error("Yêu cầu quyền Admin/Staff.");
//     console.log("📤 Gửi yêu cầu cập nhật đơn hàng:", donHang);
//     const url = `http://localhost:8080/don-hang/${donHang.maDonHang}`; // URL đúng
//     const response = await fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${token}` // Thêm token
//         },
//         body: JSON.stringify(donHang), // Chỉ gửi những trường cần cập nhật, vd: { trangThai: "..." }
//     });
//     if (!response.ok) {
//         const errorData = await response.json().catch(()=>({message: `Lỗi ${response.status}`}));
//         throw new Error(errorData.noiDung || errorData.message || `Lỗi ${response.status} khi cập nhật đơn hàng.`);
//     }
//     return await response.json();
// }
//
// // Xóa đơn hàng (Admin)
// export async function xoaDonHangAdmin(maDonHang: number): Promise<void> {
//     const token = getToken();
//     if (!token) throw new Error("Yêu cầu quyền Admin.");
//     console.log("📤 Gửi yêu cầu xóa đơn hàng:", maDonHang);
//     const url = `http://localhost:8080/don-hang/${maDonHang}`; // URL đúng
//     const response = await fetch(url, {
//         method: "DELETE",
//         headers: { 'Authorization': `Bearer ${token}` } // Thêm token
//     });
//     if (!response.ok && response.status !== 204) { // 204 là thành công không có nội dung
//         const errorData = await response.json().catch(()=>({message: `Lỗi ${response.status}`}));
//         throw new Error(errorData.noiDung || errorData.message || `Lỗi ${response.status} khi xóa đơn hàng.`);
//     }
//     console.log("✅ Đơn hàng đã xóa:", maDonHang);
// }
//
// // Bỏ hàm layDonHangTheoNguoiDung cũ đi vì không dùng endpoint đó
//
//
//
//


import DonHangModel from "../models/DonHangModel";

const getToken = () => localStorage.getItem('token');

// Hàm cho USER xem đơn hàng của mình
export async function layDonHangCuaToi(): Promise<DonHangModel[]> {
    const token = getToken();
    if (!token) throw new Error("Bạn cần đăng nhập để xem đơn hàng.");
    const url = 'http://localhost:8080/don-hang/my-orders';
    try {
        const response = await fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }});
        if (!response.ok) {
            const errorText = await response.text().catch(() => `Lỗi ${response.status}`);
            throw new Error(errorText || `Lỗi ${response.status} khi lấy lịch sử đơn hàng`);
        }
        const data: DonHangModel[] = await response.json();
        return data;
    } catch(error) {
        console.error("[API] layDonHangCuaToi fetch/parse error:", error);
        throw error;
    }
}

// === CÁC HÀM CHO ADMIN ===

// Lấy tất cả đơn hàng (Admin)
export async function layToanBoDonHangAdmin(): Promise<DonHangModel[]> { // <<< DÙNG TÊN NÀY
    const token = getToken();
    if (!token) throw new Error("Yêu cầu quyền Admin.");
    const url = "http://localhost:8080/don-hang";
    try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) throw new Error(`Lỗi ${response.status} khi lấy tất cả đơn hàng.`);
        const data = await response.json();
        return data._embedded?.donHangs || (Array.isArray(data) ? data : []);
    } catch(error) {
        console.error("[API] layToanBoDonHangAdmin fetch/parse error:", error);
        throw error;
    }
}

// Cập nhật trạng thái đơn hàng (Admin/Staff) - Ví dụ
export async function capNhatTrangThaiDonHangAdmin(maDonHang: number, trangThaiMoi: string): Promise<DonHangModel> { // <<< DÙNG TÊN NÀY (Hoặc tên hàm cập nhật khác bạn tạo)
    const token = getToken();
    if (!token) throw new Error("Yêu cầu quyền Admin/Staff.");
    const url = `http://localhost:8080/don-hang/${maDonHang}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ trangThai: trangThaiMoi }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({message: `Lỗi ${response.status}`}));
            throw new Error(errorData.noiDung || errorData.message || `Lỗi ${response.status} khi cập nhật đơn hàng.`);
        }
        return await response.json();
    } catch (error) {
        console.error("[API] capNhatTrangThaiDonHangAdmin fetch/parse error:", error);
        throw error;
    }
}

// Xóa đơn hàng (Admin)
export async function xoaDonHangAdmin(maDonHang: number): Promise<void> { // <<< DÙNG TÊN NÀY
    const token = getToken();
    if (!token) throw new Error("Yêu cầu quyền Admin.");
    const url = `http://localhost:8080/don-hang/${maDonHang}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok && response.status !== 204) {
            const errorData = await response.json().catch(()=>({message: `Lỗi ${response.status}`}));
            throw new Error(errorData.noiDung || errorData.message || `Lỗi ${response.status} khi xóa đơn hàng.`);
        }
    } catch (error) {
        console.error("[API] xoaDonHangAdmin fetch error:", error);
        throw error;
    }
}

// --- Bỏ các hàm không dùng hoặc sai ---