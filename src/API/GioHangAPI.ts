import GioHangModel from "../models/GioHangModel"; // Đảm bảo import đúng model

// Hàm tiện ích để lấy token
const getToken = () => localStorage.getItem('token');

// Lấy giỏ hàng hiện tại
export async function layGioHang(): Promise<GioHangModel | null> {
    const token = getToken();
    if (!token) {
        // console.warn("User not logged in. Cannot fetch cart.");
        return null; // Không lỗi nếu chưa đăng nhập, trả về null
    }

    const url = 'http://localhost:8080/gio-hang'; // URL chuẩn cho GET
    console.log(`[GioHangAPI] Fetching cart: GET ${url}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(`[GioHangAPI] GET /gio-hang status: ${response.status}`);

        if (!response.ok) {
            let errorMsg = `Lỗi ${response.status} khi lấy giỏ hàng`;
            try {
                const errorData = await response.json();
                errorMsg = errorData.noiDung || errorData.message || JSON.stringify(errorData);
            } catch (e) {
                try {
                    const errorText = await response.text();
                    if (errorText) errorMsg = errorText;
                } catch (e2) { /* ignore */ }
            }
            throw new Error(errorMsg);
        }
        return await response.json();
    } catch (error) {
        console.error("[GioHangAPI] layGioHang error:", error);
        throw error;
    }
}

// Thêm sách vào giỏ
export async function themSachVaoGioHangAPI(maSach: number, soLuong: number): Promise<GioHangModel> {
    const token = getToken();
    if (!token) throw new Error("Bạn cần đăng nhập để thêm vào giỏ hàng");
    if (soLuong <= 0) throw new Error("Số lượng thêm vào giỏ phải lớn hơn 0"); // Thêm kiểm tra số lượng

    // --- URL ĐÃ SỬA ĐÚNG ---
    const url = `http://localhost:8080/gio-hang/them-sach?maSach=${maSach}&soLuong=${soLuong}`;
    console.log(`[GioHangAPI] Adding to cart: POST ${url}`); // Log URL đúng

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(`[GioHangAPI] POST /them-sach status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[GioHangAPI] Error adding to cart: ${response.status} - ${errorText}`);
            throw new Error(`Lỗi ${response.status} khi thêm: ${errorText || response.statusText}`);
        }
        // Chỉ parse JSON nếu thành công
        const data: GioHangModel = await response.json();
        // Phát sự kiện để Navbar cập nhật số lượng
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        console.log("[GioHangAPI] Dispatched cartUpdated event after adding.");
        return data;
    } catch (error) {
        console.error("[GioHangAPI] themSachVaoGioHangAPI fetch error:", error);
        throw error;
    }
}

// // Xóa sách khỏi giỏ
// export async function xoaSachKhoiGioHangAPI(maSach: number): Promise<GioHangModel> {
//     const token = getToken();
//     if (!token) throw new Error("Bạn cần đăng nhập để xóa sản phẩm");
//
//     const url = `http://localhost:8080/gio-hang/xoa-sach?maSach=${maSach}`; // URL này đã đúng
//     console.log(`[GioHangAPI] Removing from cart: DELETE ${url}`);
//
//     try {
//         const response = await fetch(url, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         console.log(`[GioHangAPI] DELETE /xoa-sach status: ${response.status}`);
//
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error(`[GioHangAPI] Error removing from cart: ${response.status} - ${errorText}`);
//             throw new Error(`Lỗi ${response.status} khi xóa: ${errorText || response.statusText}`);
//         }
//         const data: GioHangModel = await response.json();
//         // Phát sự kiện để Navbar cập nhật số lượng
//         window.dispatchEvent(new CustomEvent('cartUpdated'));
//         console.log("[GioHangAPI] Dispatched cartUpdated event after removing.");
//         return data;
//     } catch (error) {
//         console.error("[GioHangAPI] xoaSachKhoiGioHangAPI fetch error:", error);
//         throw error;
//     }
// }

export async function xoaSachKhoiGioHangAPI(maSach: number): Promise<GioHangModel | null> { // Trả về giỏ hàng mới hoặc null
    const token = getToken();
    if (!token) throw new Error("Bạn cần đăng nhập để xóa sản phẩm");
    const url = `http://localhost:8080/gio-hang/xoa-sach?maSach=${maSach}`;
    console.log(`[GioHangAPI] Removing from cart: DELETE ${url}`);
    try {
        const response = await fetch(url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        console.log(`[GioHangAPI] DELETE /xoa-sach status: ${response.status}`);
        // Chỉ cần kiểm tra OK (200 hoặc 204 No Content)
        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText);
            console.error(`[GioHangAPI] Error removing: ${response.status} - ${errorText}`);
            throw new Error(`Lỗi ${response.status} khi xóa: ${errorText}`);
        }
        // Nếu xóa thành công (200 hoặc 204), gọi lại layGioHang để lấy giỏ hàng mới
        console.log("[GioHangAPI] Delete request successful. Fetching updated cart...");
        window.dispatchEvent(new CustomEvent('cartUpdated')); // Vẫn bắn event cho Navbar
        return await layGioHang(); // Trả về giỏ hàng mới nhất
    } catch (error) {
        console.error("[GioHangAPI] xoaSachKhoiGioHangAPI error:", error);
        throw error;
    }
}

// Cập nhật số lượng
export async function capNhatSoLuongAPI(maSach: number, soLuongMoi: number): Promise<GioHangModel> {
    const token = getToken();
    if (!token) throw new Error("Bạn cần đăng nhập để cập nhật giỏ hàng");
    // Backend đã xử lý soLuongMoi <= 0, không cần check ở đây

    // --- URL ĐÃ SỬA ĐÚNG ---
    const url = `http://localhost:8080/gio-hang/cap-nhat-so-luong?maSach=${maSach}&soLuongMoi=${soLuongMoi}`;
    console.log(`[GioHangAPI] Updating quantity: PUT ${url}`);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(`[GioHangAPI] PUT /cap-nhat-so-luong status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[GioHangAPI] Error updating quantity: ${response.status} - ${errorText}`);
            throw new Error(`Lỗi ${response.status} khi cập nhật: ${errorText || response.statusText}`);
        }
        const data: GioHangModel = await response.json();
        // Phát sự kiện để Navbar cập nhật số lượng
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        console.log("[GioHangAPI] Dispatched cartUpdated event after updating quantity.");
        return data;
    } catch (error) {
        console.error("[GioHangAPI] capNhatSoLuongAPI fetch error:", error);
        throw error;
    }
}