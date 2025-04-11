import React from "react";

function Footer() {
    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-2 mb-3">
                        <h5>Hỗ trợ</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Chính sách đổi - trả - hoàn tiền</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Chính sách vận chuyển</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Dịch vụ</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Điều khoản sử dụng</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Chính sách bảo mật thông tin cá nhân</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Giới thiệu về YoungSan</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Kết nối với chúng tôi</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
                        </ul>
                    </div>

                    <div className="col-md-5 offset-md-1 mb-3">
                        <form>
                            <h5>Đăng ký để mà nhận thông tin sớm nhất từ chúng tôi</h5>
                            <p>Nhanh tay đăng kí ngay ! </p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label  className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Hãy nhập địa chỉ Email"/>
                                <button className="btn btn-primary" type="button">Đăng kí</button>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="text-start mt-4"> {/* Thêm text-start và có thể thêm khoảng cách trên mt-4 */}
                    <p className="mb-1"> <b> Cửa hàng sách YoungSan </b> </p> {/* Giảm margin bottom của p */}
                    <p className="small text-muted mb-0">314B Lê Văn Sỹ </p> {/* Thêm text-muted, giảm margin */}
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2023 Company, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-tweeter"></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-instagram"></i></a></li>
                        <li className="ms-3"><a className="link-body-emphasis" href="#"> <i className="fas fa-facebook"></i></a></li>
                    </ul>
                </div>




            </footer>
        </div>
    );
}

export default Footer;