import { request } from "./request";
import DonHangModel from "../models/DonHangModel";

// Lấy tất cả đơn hàng (Admin)
export async function layToanBoDonHang(): Promise<DonHangModel[]> {
    return request("http://localhost:8080/don-hang");
}

// Lấy đơn hàng theo người dùng (User)
// export async function layDonHangTheoNguoiDung(maNguoiDung: number): Promise<DonHangModel[]> {
//     return request(`http://localhost:8080/don-hang/nguoi-dung/${maNguoiDung}`);
// }
export async function layDonHangTheoNguoiDung(maNguoiDung: number): Promise<DonHangModel[]> {
    console.log(`📤 Gửi yêu cầu lấy đơn hàng của user ID: ${maNguoiDung}`);
    return fetch(`http://localhost:8080/don-hang/nguoi-dung/${maNguoiDung}`)
        .then(response => response.json())
        .then(data => {
            console.log("✅ Dữ liệu đơn hàng nhận về:", data);
            return data;
        })
        .catch(error => {
            console.error("❌ Lỗi khi lấy đơn hàng của user:", error);
            return [];
        });
}

// Thêm mới đơn hàng
export async function themDonHang(donHang: DonHangModel) {
    console.log("📤 Gửi yêu cầu thêm đơn hàng:", donHang);
    return fetch("http://localhost:8080/don-hang", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donHang),
    })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Server trả về:", data);
            return data;
        })
        .catch(error => {
            console.error("❌ Lỗi API themDonHang:", error);
            throw error;
        });
}

// Cập nhật đơn hàng
export async function capNhatDonHang(donHang: DonHangModel) {
    console.log("📤 Gửi yêu cầu cập nhật đơn hàng:", donHang);
    return fetch(`http://localhost:8080/don-hang/${donHang.maDonHang}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donHang),
    })
        .then(response => response.json())
        .then(data => {
            console.log("✅ Server trả về:", data);
            return data;
        })
        .catch(error => {
            console.error("❌ Lỗi API capNhatDonHang:", error);
            throw error;
        });
}

// Xóa đơn hàng
export async function xoaDonHang(maDonHang: number) {
    console.log("📤 Gửi yêu cầu xóa đơn hàng:", maDonHang);
    return fetch(`http://localhost:8080/don-hang/${maDonHang}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) throw new Error("Lỗi khi xóa đơn hàng");
            console.log("✅ Đơn hàng đã xóa:", maDonHang);
        })
        .catch(error => {
            console.error("❌ Lỗi API xoaDonHang:", error);
            throw error;
        });
}




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