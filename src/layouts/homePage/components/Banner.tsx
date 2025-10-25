import React from "react";

function Banner() {
    return (
        <div className="p-2 mb-2 bg-dark">
            <div className="container-fluid py-5 text-white d-flex
                justify-content-center align-items-center" >
                <div>
                    <h3 className="display-5 fw-bold">
                        Sách là một kho tàng tri thức <br/> quy báu cho nhân loại
                    </h3>
                    <p className=""></p>
                    <button className="btn btn-primary btn-lg text-white float-end">Khám phá ngay</button>
                </div>
            </div>
        </div>
    );
}
export default Banner;








// import React from "react";
// import { Link } from "react-router-dom";
// // Import ảnh từ thư mục src/images (Đảm bảo đường dẫn và đuôi .jpg đúng)
// import bannerImageUrl from '../../../images/abc.jpg'; // <<<=== Đảm bảo đường dẫn đúng
//
// function Banner() {
//     return (
//         // Container giữ banner
//         // mb-3 để tạo khoảng cách dưới
//         // Bạn có thể thêm class khác nếu muốn có nền hoặc padding
//         <div className="container-fluid p-0 mb-3">
//             <Link to="/">
//                 <img
//                     src={bannerImageUrl}
//                     className="img-fluid w-100" // Giữ lại để ảnh co theo chiều rộng
//                     alt="Miracles Bookstore Banner"
//                     // Thêm style để giới hạn chiều cao tối đa
//                     style={{
//                         display: 'block', // Giữ lại
//                         maxHeight: '200px', // <<<=== THAY ĐỔI CON SỐ NÀY ĐỂ CHỈNH CHIỀU CAO
//                         objectFit: 'cover' // <<<=== THÊM CÁI NÀY QUAN TRỌNG
//                         // object-position: 'center center' // Tùy chọn: Căn giữa ảnh nếu nó bị cắt
//                     }}
//                 />
//             </Link>
//         </div>
//     );
// }
//
// export default Banner;