// import React from "react";
//
// function Footer() {
//     return (
//         <div className="container">
//             <footer className="py-5">
//                 <div className="row">
//                     <div className="col-6 col-md-2 mb-3">
//                         <h5>Hỗ trợ</h5>
//                         <ul className="nav flex-column">
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Chính sách đổi - trả - hoàn tiền</a></li>
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Chính sách vận chuyển</a></li>
//                         </ul>
//                     </div>
//
//                     <div className="col-6 col-md-2 mb-3">
//                         <h5>Dịch vụ</h5>
//                         <ul className="nav flex-column">
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Điều khoản sử dụng</a></li>
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Chính sách bảo mật thông tin cá nhân</a></li>
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Giới thiệu về YoungSan</a></li>
//                         </ul>
//                     </div>
//
//                     <div className="col-6 col-md-2 mb-3">
//                         <h5>Kết nối với chúng tôi</h5>
//                         <ul className="nav flex-column">
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
//                             <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
//                         </ul>
//                     </div>
//
//                     <div className="col-md-5 offset-md-1 mb-3">
//                         <form>
//                             <h5>Đăng ký để mà nhận thông tin sớm nhất từ chúng tôi</h5>
//                             <p>Nhanh tay đăng kí ngay ! </p>
//                             <div className="d-flex flex-column flex-sm-row w-100 gap-2">
//                                 <label  className="visually-hidden">Email address</label>
//                                 <input id="newsletter1" type="text" className="form-control" placeholder="Hãy nhập địa chỉ Email"/>
//                                 <button className="btn btn-primary" type="button">Đăng kí</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//
//
//                 <div className="text-start mt-4"> {/* Thêm text-start và có thể thêm khoảng cách trên mt-4 */}
//                     <p className="mb-1"> <b> Cửa hàng sách YoungSan </b> </p> {/* Giảm margin bottom của p */}
//                     <p className="small text-muted mb-0">314B Lê Văn Sỹ </p> {/* Thêm text-muted, giảm margin */}
//                 </div>
//
//                 <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
//                     <p>&copy; 2025 Company, Inc. All rights reserved.</p>
//                     <ul className="list-unstyled d-flex">
//                         <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-tweeter"></i></a></li>
//                         <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-instagram"></i></a></li>
//                         <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-facebook"></i></a></li>
//                     </ul>
//                 </div>
//
//
//
//
//             </footer>
//         </div>
//     );
// }
//
// export default Footer;



import React from "react";

function Footer() {
    // Thông tin liên hệ (giữ nguyên)
    const emailLienHe = "youngsan@gmail.com";
    const hotlineLienHe = "1900 6685"; // Thay số của bạn
    const gioMoCua = "8:00 - 22:00 (Thứ 2 - Chủ Nhật)";

    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                    {/* --- Cột Hỗ trợ - SỬA LINK HREF (Bỏ /pages/) --- */}
                    <div className="col-6 col-md-3 mb-3">
                        <h5>Hỗ trợ</h5>
                        <ul className="nav flex-column">
                            {/* Trỏ đến file HTML trong public/ */}
                            <li className="nav-item mb-2"><a href="/chinh-sach-doi-tra.html" className="nav-link p-0 text-body-secondary">Chính sách đổi - trả - hoàn tiền</a></li>
                            <li className="nav-item mb-2"><a href="/chinh-sach-van-chuyen.html" className="nav-link p-0 text-body-secondary">Chính sách vận chuyển</a></li>
                        </ul>
                    </div>

                    {/* --- Cột Dịch vụ - SỬA LINK HREF (Bỏ /pages/) --- */}
                    <div className="col-6 col-md-3 mb-3">
                        <h5>Dịch vụ</h5>
                        <ul className="nav flex-column">
                            {/* Trỏ đến file HTML trong public/ */}
                            <li className="nav-item mb-2"><a href="/dieu-khoan-su-dung.html" className="nav-link p-0 text-body-secondary">Điều khoản sử dụng</a></li>
                            <li className="nav-item mb-2"><a href="/chinh-sach-bao-mat.html" className="nav-link p-0 text-body-secondary">Chính sách bảo mật</a></li>
                            <li className="nav-item mb-2"><a href="/gioi-thieu.html" className="nav-link p-0 text-body-secondary">Giới thiệu về YoungSan</a></li>
                        </ul>
                    </div>

                    {/* --- Cột Thông tin liên hệ (Giữ nguyên) --- */}
                    <div className="col-12 col-md-3 mb-3">
                        <h5>Thông tin liên hệ</h5>
                        <div>
                            <p className="mb-2 small text-body-secondary">
                                Email: <a href={`mailto:${emailLienHe}`} className="text-body-secondary">{emailLienHe}</a>
                            </p>
                            <p className="mb-2 small text-body-secondary">
                                Hotline: <a href={`tel:${hotlineLienHe.replace(/\s/g, '')}`} className="text-body-secondary">{hotlineLienHe}</a>
                            </p>
                            <p className="mb-2 small text-body-secondary">
                                Giờ mở cửa: {gioMoCua}
                            </p>
                        </div>
                    </div>

                    {/* --- Cột Đăng ký nhận tin (Giữ nguyên) --- */}
                    <div className="col-12 col-md-3 mb-3">
                        <form>
                            <h5>Đăng ký nhận tin</h5>
                            <p className="small">Nhận thông tin sách mới và khuyến mãi.</p>
                            <div className="d-flex flex-column w-100 gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="email" className="form-control form-control-sm" placeholder="Địa chỉ Email"/>
                                <button className="btn btn-primary btn-sm" type="button">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Thông tin địa chỉ và bản quyền (Giữ nguyên) */}
                <div className="text-start mt-4">
                    <p className="mb-1"> <b> Cửa hàng sách YoungSan </b> </p>
                    <p className="small text-muted mb-0">314B Lê Văn Sỹ, Phường 10, Quận Tân Bình, TP.HCM</p>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2025 YoungSan Bookstore</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-body-emphasis" href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;