// src/API/YeuThichAPI.ts
import SachModel from "../models/sachModel"; // Import SachModel

// Hàm lấy token tiện ích
const getToken = (): string | null => localStorage.getItem('token');

// Hàm tạo header Authorization
const authHeaders = (): HeadersInit => {
    const token = getToken();
    if (!token) {
        throw new Error("Yêu cầu đăng nhập."); // Ném lỗi nếu chưa đăng nhập
    }
    return { 'Authorization': `Bearer ${token}` };
};

// Hàm xử lý lỗi chung cho API Yêu thích
const handleApiError = async (response: Response, defaultMessage: string): Promise<Error> => {
    let errorMessage = defaultMessage;
    try {
        const errorData = await response.json();
        errorMessage = errorData.noiDung || errorData.message || JSON.stringify(errorData);
    } catch (e) {
        try {
            const errorText = await response.text();
            if (errorText) errorMessage = errorText;
        } catch (e2) { /* ignore */ }
    }
    // Ném lỗi 401 nếu chưa đăng nhập
    if (response.status === 401) {
        throw new Error("Yêu cầu đăng nhập.");
    }
    console.error(`API Yêu thích Lỗi ${response.status}:`, errorMessage);
    return new Error(`Lỗi ${response.status}: ${errorMessage}`);
};

/**
 * Lấy danh sách Sách yêu thích của người dùng hiện tại.
 * @returns Promise<SachModel[]> - Mảng các sách yêu thích.
 */
export const layDanhSachYeuThich = async (): Promise<SachModel[]> => {
    const url = 'http://localhost:8080/api/yeu-thich';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: authHeaders() // Yêu cầu đăng nhập
        });
        if (!response.ok) {
            throw await handleApiError(response, "Không thể tải danh sách yêu thích.");
        }
        return await response.json();
    } catch (error) {
        console.error("[API] Lỗi layDanhSachYeuThich:", error);
        throw error; // Ném lại lỗi để component xử lý
    }
};

/**
 * Thêm một sách vào danh sách yêu thích.
 * @param maSach ID của sách cần thêm.
 * @returns Promise<void> - Chỉ báo thành công/thất bại qua exception.
 */
export const themVaoYeuThich = async (maSach: number): Promise<void> => {
    const url = `http://localhost:8080/api/yeu-thich/them/${maSach}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: authHeaders() // Yêu cầu đăng nhập
        });
        if (!response.ok) {
            throw await handleApiError(response, "Không thể thêm vào yêu thích.");
        }
        // Không cần parse body nếu chỉ trả về thông báo
        console.log(`[API] Đã thêm sách ${maSach} vào yêu thích.`);
    } catch (error) {
        console.error("[API] Lỗi themVaoYeuThich:", error);
        throw error;
    }
};

/**
 * Xóa một sách khỏi danh sách yêu thích.
 * @param maSach ID của sách cần xóa.
 * @returns Promise<void> - Chỉ báo thành công/thất bại qua exception.
 */
export const xoaKhoiYeuThich = async (maSach: number): Promise<void> => {
    const url = `http://localhost:8080/api/yeu-thich/xoa/${maSach}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: authHeaders() // Yêu cầu đăng nhập
        });
        if (!response.ok) {
            throw await handleApiError(response, "Không thể xóa khỏi yêu thích.");
        }
        console.log(`[API] Đã xóa sách ${maSach} khỏi yêu thích.`);
        // API trả về 200 OK (với ThongBao) hoặc 204 No Content đều được coi là thành công
    } catch (error) {
        console.error("[API] Lỗi xoaKhoiYeuThich:", error);
        throw error;
    }
};

/**
 * Kiểm tra xem một sách có nằm trong danh sách yêu thích không.
 * @param maSach ID của sách cần kiểm tra.
 * @returns Promise<boolean> - true nếu có, false nếu không.
 */
export const kiemTraYeuThich = async (maSach: number): Promise<boolean> => {
    // API này không yêu cầu đăng nhập ở Backend, nhưng nên check ở Frontend
    const token = getToken();
    if (!token) {
        return false; // Chưa đăng nhập thì không thể yêu thích
    }

    const url = `http://localhost:8080/api/yeu-thich/kiem-tra/${maSach}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: authHeaders() // Gửi token để Backend biết user nào
        });
        if (!response.ok) {
            // Lỗi có thể xảy ra nếu user bị xóa nhưng token chưa hết hạn,... Bỏ qua lỗi và coi như false
            console.warn(`[API] Lỗi kiểm tra yêu thích sách ${maSach}: Status ${response.status}`);
            return false;
        }
        const data: { isInWishlist: boolean } = await response.json();
        return data.isInWishlist;
    } catch (error) {
        console.error("[API] Lỗi mạng khi kiemTraYeuThich:", error);
        return false; // Lỗi mạng cũng coi như false
    }
};