// /**
//  * Kiểm tra xem người dùng đã đăng nhập hay chưa (dựa vào sự tồn tại của token).
//  * @returns {boolean} true nếu đã đăng nhập, false nếu chưa.
//  */
// export function isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
// }
//
// /**
//  * Kiểm tra xem người dùng hiện tại có quyền ADMIN hay không.
//  * Đọc thông tin quyền từ localStorage.
//  * @returns {boolean} true nếu có quyền ADMIN, false nếu không hoặc có lỗi.
//  */
// export function checkAdminRole(): boolean {
//     const rolesString = localStorage.getItem('userRoles'); // Lấy chuỗi roles đã lưu
//     if (!rolesString) {
//         // console.log("checkAdminRole: No roles found in localStorage."); // Debug
//         return false; // Không có -> chắc chắn không phải admin
//     }
//     try {
//         // Chuyển chuỗi JSON thành mảng các quyền (vd: ["USER", "ADMIN"])
//         const roles: string[] = JSON.parse(rolesString);
//         // Kiểm tra xem trong mảng có quyền "admin" không
//         const isAdmin = roles.includes('admin');
//         // console.log(`checkAdminRole: Roles = ${roles}, isAdmin = ${isAdmin}`); // Debug
//         return isAdmin;
//     } catch (error) {
//         // Nếu lỗi khi parse JSON (dữ liệu sai định dạng)
//         console.error("Lỗi parse userRoles từ localStorage:", error);
//         localStorage.removeItem('userRoles'); // Xóa dữ liệu bị lỗi đi
//         return false;
//     }
// }

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa (dựa vào sự tồn tại của token).
 * @returns {boolean} true nếu đã đăng nhập, false nếu chưa.
 */
export function isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
}

/**
 * Kiểm tra xem người dùng hiện tại có quyền ADMIN hay không.
 * Đọc thông tin quyền từ localStorage.
 * @returns {boolean} true nếu có quyền ADMIN, false nếu không hoặc có lỗi.
 */
export function checkAdminRole(): boolean {
    const rolesString = localStorage.getItem('userRoles'); // Lấy chuỗi roles đã lưu
    if (!rolesString) {
        // console.log("checkAdminRole: No roles found in localStorage."); // Debug
        return false; // Không có -> chắc chắn không phải admin
    }
    try {
        // Chuyển chuỗi JSON thành mảng các quyền (vd: ["USER", "ADMIN"])
        const roles: string[] = JSON.parse(rolesString);
        // Kiểm tra xem trong mảng có quyền "admin" không (chuyển về chữ thường để không phân biệt hoa thường)
        const isAdmin = roles.map(role => role.toLowerCase()).includes('admin');
        // console.log(`checkAdminRole: Roles = ${roles}, isAdmin = ${isAdmin}`); // Debug
        return isAdmin;
    } catch (error) {
        // Nếu lỗi khi parse JSON (dữ liệu sai định dạng)
        console.error("Lỗi parse userRoles từ localStorage:", error);
        localStorage.removeItem('userRoles'); // Xóa dữ liệu bị lỗi đi
        return false;
    }
}


/**
 * Kiểm tra xem người dùng hiện tại có quyền ADMIN hoặc STAFF hay không.
 * Đọc thông tin quyền từ localStorage.
 * @returns {boolean} true nếu có quyền ADMIN hoặc STAFF, false nếu không hoặc có lỗi.
 */
export function checkAdminOrStaffRole(): boolean {
    const rolesString = localStorage.getItem('userRoles');
    if (!rolesString) {
        return false;
    }
    try {
        const roles: string[] = JSON.parse(rolesString);
        // Chuyển sang chữ thường để kiểm tra không phân biệt hoa thường
        const lowerCaseRoles = roles.map(role => role.toLowerCase());
        const hasPermission = lowerCaseRoles.includes('admin') || lowerCaseRoles.includes('staff');
        // console.log(`checkAdminOrStaffRole: Roles = ${roles}, hasPermission = ${hasPermission}`); // Debug
        return hasPermission;
    } catch (error) {
        console.error("Lỗi parse userRoles từ localStorage:", error);
        localStorage.removeItem('userRoles');
        return false;
    }
}