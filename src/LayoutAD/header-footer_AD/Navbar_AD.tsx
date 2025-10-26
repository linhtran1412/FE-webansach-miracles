// import React from "react";
// import {Link, NavLink} from "react-router-dom";
//
// const NavBarAD: React.FC = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
//             <div className="container-fluid">
//                 <NavLink className="navbar-brand" to="/admin">
//                     Admin
//                 </NavLink>
//
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarNav"
//                     aria-controls="navbarNav"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <Link className="nav-link active" aria-current="page" to="/" end>
//                                 Xem trang chủ
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/add-students">
//                                 Add New
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };
//
// export default NavBarAD;


// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom"; // Thêm useNavigate
//
// const NavBarAD: React.FC = () => {
//     // Dùng hook useNavigate để chuyển trang sau khi logout
//     const navigate = useNavigate();
//
//     // Hàm xử lý đăng xuất (giống như trong Navbar thường)
//     const handleLogout = () => {
//         localStorage.removeItem('token');       // Xóa token
//         localStorage.removeItem('userRoles');  // Xóa roles
//         window.dispatchEvent(new Event('authChange')); // Bắn sự kiện báo thay đổi
//         navigate("/"); // Chuyển về trang chủ
//         console.log("Admin logged out."); // Debug
//     };
//
//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
//             <div className="container-fluid">
//                 {/* Link Brand Admin */}
//                 <NavLink className="navbar-brand" to="/admin">
//                     Admin
//                 </NavLink>
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarNavAdminFinal" // Đổi ID
//                     aria-controls="navbarNavAdminFinal"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNavAdminFinal">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0"> {/* Thêm me-auto mb-2 mb-lg-0 */}
//                         {/* Link về Trang chủ User */}
//                         <li className="nav-item">
//                             <NavLink className="nav-link" aria-current="page" to="/" end>
//                                 Xem Trang Chủ
//                             </NavLink>
//                         </li>
//                         {/* Có thể thêm các link quản lý khác ở đây nếu cần */}
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/admin/bao-cao">
//                                 Báo cáo
//                             </NavLink>
//                         </li>
//                     </ul>
//
//                     {/* === THÊM NÚT ĐĂNG XUẤT === */}
//                     <ul className="navbar-nav"> {/* Dùng navbar-nav để căn chỉnh */}
//                         <li className="nav-item">
//                             <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
//                                 Đăng xuất
//                             </button>
//                         </li>
//                     </ul>
//                     {/* === KẾT THÚC NÚT ĐĂNG XUẤT === */}
//
//                 </div>
//             </div>
//         </nav>
//     );
// };
//
// export default NavBarAD;



import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBarAD: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRoles');
        window.dispatchEvent(new Event('authChange'));
        navigate("/");
        console.log("Admin logged out.");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5 sticky-top"> {/* Thêm sticky-top */}
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/admin">
                    Admin Dashboard
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAdminFinal"
                    aria-controls="navbarNavAdminFinal"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAdminFinal">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/" end>
                                Xem Trang Chủ
                            </NavLink>
                        </li>
                        {/* Link Quản lý Sách (trang /admin mặc định) */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin" end> {/* Thêm 'end' */}
                                Quản lý Sách
                            </NavLink>
                        </li>

                        {/* === THÊM LINK QUẢN LÝ ĐƠN HÀNG === */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/don-hang">
                                Quản lý Đơn hàng
                            </NavLink>
                        </li>
                        {/* === KẾT THÚC THÊM LINK === */}

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/bao-cao">
                                Báo cáo
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBarAD;

