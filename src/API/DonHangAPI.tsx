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


// import DonHangModel from "../models/DonHangModel";
//
// const getToken = () => localStorage.getItem('token');
//
// // Hàm cho USER xem đơn hàng của mình
// export async function layDonHangCuaToi(): Promise<DonHangModel[]> {
//     const token = getToken();
//     if (!token) throw new Error("Bạn cần đăng nhập để xem đơn hàng.");
//     const url = 'http://localhost:8080/don-hang/my-orders';
//     try {
//         const response = await fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }});
//         if (!response.ok) {
//             const errorText = await response.text().catch(() => `Lỗi ${response.status}`);
//             throw new Error(errorText || `Lỗi ${response.status} khi lấy lịch sử đơn hàng`);
//         }
//         const data: DonHangModel[] = await response.json();
//         return data;
//     } catch(error) {
//         console.error("[API] layDonHangCuaToi fetch/parse error:", error);
//         throw error;
//     }
// }
//
// // === CÁC HÀM CHO ADMIN ===
//
// // Lấy tất cả đơn hàng (Admin)
// export async function layToanBoDonHangAdmin(): Promise<DonHangModel[]> { // <<< DÙNG TÊN NÀY
//     const token = getToken();
//     if (!token) throw new Error("Yêu cầu quyền Admin.");
//     const url = "http://localhost:8080/don-hang";
//     try {
//         const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
//         if (!response.ok) throw new Error(`Lỗi ${response.status} khi lấy tất cả đơn hàng.`);
//         const data = await response.json();
//         return data._embedded?.donHangs || (Array.isArray(data) ? data : []);
//     } catch(error) {
//         console.error("[API] layToanBoDonHangAdmin fetch/parse error:", error);
//         throw error;
//     }
// }
//
// // Cập nhật trạng thái đơn hàng (Admin/Staff) - Ví dụ
// export async function capNhatTrangThaiDonHangAdmin(maDonHang: number, trangThaiMoi: string): Promise<DonHangModel> { // <<< DÙNG TÊN NÀY (Hoặc tên hàm cập nhật khác bạn tạo)
//     const token = getToken();
//     if (!token) throw new Error("Yêu cầu quyền Admin/Staff.");
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     try {
//         const response = await fetch(url, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
//             body: JSON.stringify({ trangThai: trangThaiMoi }),
//         });
//         if (!response.ok) {
//             const errorData = await response.json().catch(()=>({message: `Lỗi ${response.status}`}));
//             throw new Error(errorData.noiDung || errorData.message || `Lỗi ${response.status} khi cập nhật đơn hàng.`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("[API] capNhatTrangThaiDonHangAdmin fetch/parse error:", error);
//         throw error;
//     }
// }
//
// // Xóa đơn hàng (Admin)
// export async function xoaDonHangAdmin(maDonHang: number): Promise<void> { // <<< DÙNG TÊN NÀY
//     const token = getToken();
//     if (!token) throw new Error("Yêu cầu quyền Admin.");
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     try {
//         const response = await fetch(url, {
//             method: "DELETE",
//             headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (!response.ok && response.status !== 204) {
//             const errorData = await response.json().catch(()=>({message: `Lỗi ${response.status}`}));
//             throw new Error(errorData.noiDung || errorData.message || `Lỗi ${response.status} khi xóa đơn hàng.`);
//         }
//     } catch (error) {
//         console.error("[API] xoaDonHangAdmin fetch error:", error);
//         throw error;
//     }
// }

// import DonHangModel from "../models/DonHangModel";
//
// const getToken = () => localStorage.getItem("token");
// const authHeaders = (): HeadersInit => {
//     const t = getToken();
//     if (!t) throw new Error("Bạn cần đăng nhập.");
//     return { Authorization: `Bearer ${t}`, "Content-Type": "application/json" };
// };
//
// /* ========================= USER ========================= */
//
// // Lịch sử đơn hàng của user hiện tại
// export async function layDonHangCuaToi(): Promise<DonHangModel[]> {
//     const url = "http://localhost:8080/don-hang/my-orders"; // <-- giữ nguyên theo BE của bạn
//     const res = await fetch(url, { method: "GET", headers: authHeaders() });
//     if (!res.ok) {
//         const txt = await res.text().catch(() => `Lỗi ${res.status}`);
//         throw new Error(txt || `Lỗi ${res.status} khi lấy lịch sử đơn hàng`);
//     }
//     const data = (await res.json()) as DonHangModel[];
//     // sort mới nhất lên đầu (nếu BE chưa sort)
//     data.sort((a, b) => (b.maDonHang ?? 0) - (a.maDonHang ?? 0));
//     return data;
// }
//
// // (tuỳ chọn) chi tiết 1 đơn cho user
// export async function layChiTietDonHang(maDonHang: number): Promise<DonHangModel> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     const res = await fetch(url, { method: "GET", headers: authHeaders() });
//     if (!res.ok) {
//         const txt = await res.text().catch(() => `Lỗi ${res.status}`);
//         throw new Error(txt || `Không tải được chi tiết đơn`);
//     }
//     return (await res.json()) as DonHangModel;
// }
//
// /* ========================= ADMIN ========================= */
//
// // Lấy tất cả đơn hàng (Admin)
// export async function layToanBoDonHangAdmin(): Promise<DonHangModel[]> {
//     const url = "http://localhost:8080/don-hang";
//     const res = await fetch(url, { headers: authHeaders() });
//     if (!res.ok) throw new Error(`Lỗi ${res.status} khi lấy tất cả đơn hàng.`);
//     const data = await res.json();
//     // Nếu BE trả HAL (_embedded), rút mảng ra; nếu trả array thì trả thẳng
//     return data?._embedded?.donHangs || (Array.isArray(data) ? data : []);
// }
//
// // Cập nhật trạng thái đơn (Admin/Staff)
// export async function capNhatTrangThaiDonHangAdmin(
//     maDonHang: number,
//     trangThaiMoi: string
// ): Promise<DonHangModel> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     const res = await fetch(url, {
//         method: "PUT",
//         headers: authHeaders(),
//         body: JSON.stringify({ trangThai: trangThaiMoi }),
//     });
//     if (!res.ok) {
//         const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
//         throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi cập nhật đơn hàng.`);
//     }
//     return (await res.json()) as DonHangModel;
// }
//
// // Xoá đơn (Admin)
// export async function xoaDonHangAdmin(maDonHang: number): Promise<void> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     const res = await fetch(url, { method: "DELETE", headers: authHeaders() });
//     if (!res.ok && res.status !== 204) {
//         const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
//         throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi xóa đơn hàng.`);
//     }
// }



// // src/API/DonHangAPI.tsx
// import DonHangModel from "../models/DonHangModel";
//
// /* ========= Types cho trang CHI TIẾT đơn hàng (DTO BE trả về) ========= */
// export interface ChiTietDonHangDTO {
//     maSach: number;
//     tenSach: string;
//     soLuong: number;
//     giaBan: number;        // đơn giá tại thời điểm mua
//     thanhTien: number;     // soLuong * giaBan
//     hinhAnhDaiDien?: string;
// }
//
// export interface DonHangDetailDTO {
//     maDonHang: number;
//     ngayTao?: string;          // ISO hoặc yyyy-MM-dd
//     diaChiMuaHang?: string;
//     diaChiNhanHang?: string;
//     hinhThucThanhToan?: string;
//     hinhThucGiaoHang?: string;
//     tongTienSanPham: number;
//     chiPhiGiaoHang: number;
//     chiPhiThanhToan: number;
//     tongTien: number;
//     trangThai?: string;
//     chiTiet: ChiTietDonHangDTO[];
// }
//
// /* ========================= TOKEN / HEADERS ========================= */
// const getToken = () => localStorage.getItem("token");
// const authHeaders = (): HeadersInit => {
//     const t = getToken();
//     if (!t) throw new Error("Bạn cần đăng nhập.");
//     // Content-Type chỉ cần khi có body JSON (POST/PUT). GET/DELETE không bắt buộc.
//     return { Authorization: `Bearer ${t}` };
// };
// const authJsonHeaders = (): HeadersInit => ({
//     ...authHeaders(),
//     "Content-Type": "application/json",
// });
//
// /* ========================= USER ========================= */
//
// /** Lịch sử đơn hàng của user hiện tại (DTO list) */
// export async function layDonHangCuaToi(): Promise<DonHangModel[]> {
//     const url = "http://localhost:8080/don-hang/my-orders"; // BE của bạn
//     const res = await fetch(url, { method: "GET", headers: authHeaders() });
//     if (!res.ok) {
//         const txt = await res.text().catch(() => `Lỗi ${res.status}`);
//         throw new Error(txt || `Lỗi ${res.status} khi lấy lịch sử đơn hàng`);
//     }
//     const data = (await res.json()) as DonHangModel[];
//     // sort mới nhất lên đầu (phòng khi BE chưa sort)
//     data.sort((a, b) => (b.maDonHang ?? 0) - (a.maDonHang ?? 0));
//     return data;
// }
//
// /** 🔹 Chi tiết 1 đơn của CHÍNH USER (an toàn quyền sở hữu) */
// export async function layChiTietDonHangCuaToi(
//     maDonHang: number
// ): Promise<DonHangDetailDTO> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}/my-detail`;
//     const res = await fetch(url, { method: "GET", headers: authHeaders() });
//     if (!res.ok) {
//         const txt = await res.text().catch(() => `Lỗi ${res.status}`);
//         throw new Error(txt || `Không tải được chi tiết đơn`);
//     }
//     return (await res.json()) as DonHangDetailDTO;
// }
//
// /** (Tuỳ chọn) Chi tiết bằng endpoint admin (KHÔNG khuyến nghị cho user) */
// export async function layChiTietDonHang_AdminView(
//     maDonHang: number
// ): Promise<DonHangModel> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     const res = await fetch(url, { method: "GET", headers: authHeaders() });
//     if (!res.ok) {
//         const txt = await res.text().catch(() => `Lỗi ${res.status}`);
//         throw new Error(txt || `Không tải được chi tiết đơn (admin view)`);
//     }
//     return (await res.json()) as DonHangModel;
// }
//
// /* ========================= ADMIN ========================= */
//
// /** Lấy tất cả đơn hàng (Admin) */
// export async function layToanBoDonHangAdmin(): Promise<DonHangModel[]> {
//     const url = "http://localhost:8080/don-hang";
//     const res = await fetch(url, { headers: authHeaders() });
//     if (!res.ok) throw new Error(`Lỗi ${res.status} khi lấy tất cả đơn hàng.`);
//     const data = await res.json();
//     // Nếu BE trả HAL (_embedded), rút mảng ra; nếu trả array thì trả thẳng
//     return data?._embedded?.donHangs || (Array.isArray(data) ? data : []);
// }
//
// /** Cập nhật trạng thái đơn (Admin/Staff) */
// export async function capNhatTrangThaiDonHangAdmin(
//     maDonHang: number,
//     trangThaiMoi: string
// ): Promise<DonHangModel> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     const res = await fetch(url, {
//         method: "PUT",
//         headers: authJsonHeaders(),
//         body: JSON.stringify({ trangThai: trangThaiMoi }),
//     });
//     if (!res.ok) {
//         const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
//         throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi cập nhật đơn hàng.`);
//     }
//     return (await res.json()) as DonHangModel;
// }
//
// /** Xoá đơn (Admin) */
// export async function xoaDonHangAdmin(maDonHang: number): Promise<void> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}`;
//     const res = await resTry(url);
//     if (!res.ok && res.status !== 204) {
//         const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
//         throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi xóa đơn hàng.`);
//     }
// }
//
// /* ========================= Helpers ========================= */
// async function resTry(url: string) {
//     return fetch(url, { method: "DELETE", headers: authHeaders() });
// }


// import DonHangModel from "../models/DonHangModel";
//
// /* ========= Types cho trang CHI TIẾT đơn hàng (DTO BE trả về) ========= */
// export interface ChiTietDonHangDTO {
//     maSach: number;
//     tenSach: string;
//     soLuong: number;
//     giaBan: number;
//     thanhTien: number;
//     hinhAnhDaiDien?: string;
// }
//
// export interface DonHangDetailDTO {
//     maDonHang: number;
//     ngayTao?: string;
//     diaChiMuaHang?: string;
//     diaChiNhanHang?: string;
//     hinhThucThanhToan?: string;
//     hinhThucGiaoHang?: string;
//     tongTienSanPham: number;
//     chiPhiGiaoHang: number;
//     chiPhiThanhToan: number;
//     tongTien: number;
//     trangThai?: string;
//     chiTiet: ChiTietDonHangDTO[];
// }
//
// /* ========================= TOKEN / HEADERS ========================= */
// const getToken = () => localStorage.getItem("token");
// const authHeaders = (): HeadersInit => {
//     const t = getToken();
//     if (!t) throw new Error("Bạn cần đăng nhập.");
//     return { Authorization: `Bearer ${t}` };
// };
// const authJsonHeaders = (): HeadersInit => ({
//     ...authHeaders(),
//     "Content-Type": "application/json",
// });
//
// /* ========================= USER ========================= */
//
// // Lịch sử đơn hàng của user hiện tại
// export async function layDonHangCuaToi(): Promise<DonHangModel[]> {
//     const url = "http://localhost:8080/don-hang/my-orders";
//     const res = await fetch(url, { method: "GET", headers: authHeaders() });
//     if (!res.ok) {
//         const txt = await res.text().catch(() => `Lỗi ${res.status}`);
//         throw new Error(txt || `Lỗi ${res.status} khi lấy lịch sử đơn hàng`);
//     }
//     const data = (await res.json()) as DonHangModel[];
//     data.sort((a, b) => (b.maDonHang ?? 0) - (a.maDonHang ?? 0));
//     return data;
// }
//
// // Chi tiết 1 đơn của CHÍNH USER
// export async function layChiTietDonHangCuaToi(maDonHang: number): Promise<DonHangDetailDTO> {
//     const url = `http://localhost:8080/don-hang/${maDonHang}/my-detail`;
//     const res = await fetch(url, { method: "GET", headers: authHeaders() });
//     if (!res.ok) {
//         const txt = await res.text().catch(() => `Lỗi ${res.status}`);
//         throw new Error(txt || `Không tải được chi tiết đơn`);
//     }
//     return (await res.json()) as DonHangDetailDTO;
// }
//
// /* ========================= ADMIN ========================= */
//
// // Lấy tất cả đơn hàng (ép size lớn + sort để tránh phân trang)
// export async function layToanBoDonHangAdmin(): Promise<DonHangModel[]> {
//     //const url = "http://localhost:8080/don-hang?size=1000&sort=maDonHang,desc";
//     const url = `http://localhost:8080/api/admin/don-hang`;
//     const res = await fetch(url, { headers: authHeaders() });
//     if (!res.ok) throw new Error(`Lỗi ${res.status} khi lấy tất cả đơn hàng.`);
//     const data = await res.json();
//     const list: DonHangModel[] = data?._embedded?.donHangs || (Array.isArray(data) ? data : []);
//     list.sort((a, b) => (b.maDonHang ?? 0) - (a.maDonHang ?? 0));
//     return list;
// }
//
// // Cập nhật trạng thái đơn (Admin/Staff)
// export async function capNhatTrangThaiDonHangAdmin(
//     maDonHang: number,
//     trangThaiMoi: string
// ): Promise<DonHangModel> {
//     const url = `http://localhost:8080/api/admin/don-hang/${maDonHang}`;
//     const res = await fetch(url, {
//         method: "PUT",
//         headers: authJsonHeaders(),
//         body: JSON.stringify({ trangThai: trangThaiMoi }),
//     });
//     if (!res.ok) {
//         const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
//         throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi cập nhật đơn hàng.`);
//     }
//     return (await res.json()) as DonHangModel;
// }
//
// // Xoá đơn (Admin)
// export async function xoaDonHangAdmin(maDonHang: number): Promise<void> {
//     const url = `http://localhost:8080/api/admin/don-hang/${maDonHang}`;
//     const res = await fetch(url, { method: "DELETE", headers: authHeaders() });
//     if (!res.ok && res.status !== 204) {
//         const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
//         throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi xóa đơn hàng.`);
//     }
// }




import DonHangModel from "../models/DonHangModel";

/* ========= Types cho trang CHI TIẾT đơn hàng (DTO BE trả về) ========= */
export interface ChiTietDonHangDTO {
    maSach: number;
    tenSach: string;
    soLuong: number;
    giaBan: number;
    thanhTien: number;
    hinhAnhDaiDien?: string;
}

export interface DonHangDetailDTO {
    maDonHang: number;
    ngayTao?: string;
    diaChiMuaHang?: string;
    diaChiNhanHang?: string;
    hinhThucThanhToan?: string;
    hinhThucGiaoHang?: string;
    tongTienSanPham: number;
    chiPhiGiaoHang: number;
    chiPhiThanhToan: number;
    tongTien: number;
    trangThai?: string;
    chiTiet: ChiTietDonHangDTO[];
}

/* ========================= TOKEN / HEADERS ========================= */
const getToken = () => localStorage.getItem("token");
const authHeaders = (): HeadersInit => {
    const t = getToken();
    if (!t) throw new Error("Bạn cần đăng nhập.");
    return { Authorization: `Bearer ${t}`, Accept: "application/json" };
};
const authJsonHeaders = (): HeadersInit => ({
    ...authHeaders(),
    "Content-Type": "application/json",
});

/* ========================= USER ========================= */

// Lịch sử đơn hàng của user hiện tại
export async function layDonHangCuaToi(): Promise<DonHangModel[]> {
    const url = "http://localhost:8080/don-hang/my-orders";
    const res = await fetch(url, { method: "GET", headers: authHeaders() });
    if (!res.ok) {
        const txt = await res.text().catch(() => `Lỗi ${res.status}`);
        throw new Error(txt || `Lỗi ${res.status} khi lấy lịch sử đơn hàng`);
    }
    const data = (await res.json()) as DonHangModel[];
    data.sort((a, b) => (b.maDonHang ?? 0) - (a.maDonHang ?? 0));
    return data;
}

// Chi tiết 1 đơn của CHÍNH USER
export async function layChiTietDonHangCuaToi(maDonHang: number): Promise<DonHangDetailDTO> {
    const url = `http://localhost:8080/don-hang/${maDonHang}/my-detail`;
    const res = await fetch(url, { method: "GET", headers: authHeaders() });
    if (!res.ok) {
        const txt = await res.text().catch(() => `Lỗi ${res.status}`);
        throw new Error(txt || `Không tải được chi tiết đơn`);
    }
    return (await res.json()) as DonHangDetailDTO;
}

/* ========================= ADMIN ========================= */

// Lấy tất cả đơn hàng (BE trả mảng thuần; vẫn fallback HAL nếu sau này đổi ý)
export async function layToanBoDonHangAdmin(): Promise<DonHangModel[]> {
    const url = `http://localhost:8080/api/admin/don-hang`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error(`Lỗi ${res.status} khi lấy tất cả đơn hàng.`);
    const data = await res.json();
    const list: DonHangModel[] = Array.isArray(data) ? data : (data?._embedded?.donHangs || []);
    list.sort((a, b) => (b.maDonHang ?? 0) - (a.maDonHang ?? 0));
    return list;
}

// Cập nhật trạng thái đơn (Admin/Staff)
export async function capNhatTrangThaiDonHangAdmin(
    maDonHang: number,
    trangThaiMoi: string
): Promise<DonHangModel> {
    const url = `http://localhost:8080/api/admin/don-hang/${maDonHang}`;
    const res = await fetch(url, {
        method: "PUT",
        headers: authJsonHeaders(),
        body: JSON.stringify({ trangThai: trangThaiMoi }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
        throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi cập nhật đơn hàng.`);
    }
    return (await res.json()) as DonHangModel;
}

// Xoá đơn (Admin)
export async function xoaDonHangAdmin(maDonHang: number): Promise<void> {
    const url = `http://localhost:8080/api/admin/don-hang/${maDonHang}`;
    const res = await fetch(url, { method: "DELETE", headers: authHeaders() });
    if (!res.ok && res.status !== 204) {
        const err = await res.json().catch(() => ({ message: `Lỗi ${res.status}` }));
        throw new Error(err.noiDung || err.message || `Lỗi ${res.status} khi xóa đơn hàng.`);
    }
}
