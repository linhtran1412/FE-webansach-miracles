// src/dto/UserInfoDTO.ts
export interface UserInfoDTO {
    maNguoiDung: number;
    tenDangNhap: string;
    email: string;
    hoDem?: string; // Dùng ? nếu có thể null hoặc không có
    ten?: string;   // Dùng ? nếu có thể null hoặc không có
    roles: string[]; // Mảng các tên quyền
    // Thêm các trường khác nếu API /tai-khoan/thongtin trả về
}