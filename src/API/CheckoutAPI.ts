import { HinhThucGiaoHangModel, HinhThucThanhToanModel } from "../models/LookupModels"; // Sẽ tạo model này sau
import DonHangModel from "../models/DonHangModel";

const getToken = () => localStorage.getItem('token');

// Lấy danh sách hình thức giao hàng
export async function layHinhThucGiaoHang(): Promise<HinhThucGiaoHangModel[]> {
    const url = 'http://localhost:8080/api/lookup/shipping-methods';
    const response = await fetch(url); // Không cần token nếu API là public
    if (!response.ok) {
        throw new Error("Lỗi tải hình thức giao hàng");
    }
    return response.json();
}

// Lấy danh sách hình thức thanh toán
export async function layHinhThucThanhToan(): Promise<HinhThucThanhToanModel[]> {
    const url = 'http://localhost:8080/api/lookup/payment-methods';
    const response = await fetch(url); // Không cần token nếu API là public
    if (!response.ok) {
        throw new Error("Lỗi tải hình thức thanh toán");
    }
    return response.json();
}

// Dữ liệu gửi đi khi đặt hàng
export interface CheckoutRequestData {
    diaChiMuaHang: string;
    diaChiNhanHang: string;
    maHinhThucGiaoHang: number;
    maHinhThucThanhToan: number;
}

// Đặt hàng
export async function datHangAPI(checkoutData: CheckoutRequestData): Promise<DonHangModel> {
    const token = getToken();
    if (!token) {
        throw new Error("Bạn cần đăng nhập để đặt hàng.");
    }
    const url = 'http://localhost:8080/api/checkout/place-order';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(checkoutData)
    });

    if (!response.ok) {
        // Cố gắng đọc lỗi từ body
        try {
            const errorData = await response.json(); // Giả sử BE trả về JSON có message/noiDung
            throw new Error(errorData.noiDung || errorData.message || `Lỗi ${response.status}`);
        } catch (e) {
            // Nếu không đọc được JSON lỗi, trả về text
            const errorText = await response.text().catch(()=> response.statusText);
            throw new Error(errorText || `Lỗi ${response.status} khi đặt hàng.`);
        }
    }
    return response.json(); // Trả về đơn hàng đã tạo
}