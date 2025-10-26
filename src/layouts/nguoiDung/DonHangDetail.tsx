// // src/layouts/nguoiDung/DonHangDetail.tsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { isLoggedIn } from "../Utils/authCheck";
// import {
//     layChiTietDonHangCuaToi,
//     type DonHangDetailDTO,
//     type ChiTietDonHangDTO,
// } from "../../API/DonHangAPI"; // <<< dùng type từ API
// import dinhDangSo from "../Utils/dinhDangSo";
//
// const DonHangDetail: React.FC = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//
//     const [data, setData] = useState<DonHangDetailDTO | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         if (!isLoggedIn()) {
//             alert("Vui lòng đăng nhập.");
//             navigate("/dang-nhap", { replace: true, state: { from: location.pathname } });
//             return;
//         }
//
//         const load = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const res = await layChiTietDonHangCuaToi(Number(id));
//                 setData(res); // OK: cùng kiểu DonHangDetailDTO
//             } catch (e: any) {
//                 setError(e?.message || "Lỗi tải chi tiết đơn hàng.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         void load(); // tránh warning "Promise returned ..."
//     }, [id, navigate]);
//
//     if (loading) return <div className="container mt-4 text-center"><h5>Đang tải chi tiết đơn hàng...</h5></div>;
//     if (error)   return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
//     if (!data)   return null;
//
//     const badge =
//         data.trangThai === "Đã hủy" ? "bg-danger" :
//             data.trangThai === "Đã giao hàng" ? "bg-success" :
//                 data.trangThai === "Đang giao hàng" ? "bg-info" :
//                     data.trangThai === "Đang xử lý" ? "bg-warning text-dark" :
//                         "bg-secondary";
//
//     return (
//         <div className="container mt-4 mb-5">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3>Đơn hàng #{data.maDonHang}</h3>
//                 <Link to="/tai-khoan/don-hang" className="btn btn-outline-secondary btn-sm">← Quay lại</Link>
//             </div>
//
//             <div className="mb-2">
//                 <span className={`badge rounded-pill ${badge}`}>{data.trangThai || "Chưa xác định"}</span>
//             </div>
//
//             <div className="row g-3">
//                 <div className="col-md-8">
//                     <div className="card shadow-sm">
//                         <div className="card-header fw-semibold">Sản phẩm</div>
//                         <ul className="list-group list-group-flush">
//                             {data.chiTiet.map((i: ChiTietDonHangDTO, idx: number) => (
//                                 <li key={idx} className="list-group-item d-flex align-items-center">
//                                     <img
//                                         src={i.hinhAnhDaiDien || "/images/book/Youngsan.jpg"}
//                                         onError={(e) => { (e.target as HTMLImageElement).src = "/images/book/Youngsan.jpg"; }}
//                                         alt={i.tenSach}
//                                         style={{ width: 60, height: 60, objectFit: "cover" }}
//                                         className="me-3 rounded"
//                                     />
//                                     <div className="flex-grow-1">
//                                         <div className="fw-semibold">{i.tenSach}</div>
//                                         <div className="small text-muted">
//                                             SL: {i.soLuong} × {dinhDangSo(i.giaBan)} đ
//                                         </div>
//                                     </div>
//                                     <div className="fw-bold text-danger">{dinhDangSo(i.thanhTien)} đ</div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//
//                 <div className="col-md-4">
//                     <div className="card shadow-sm mb-3">
//                         <div className="card-header fw-semibold">Thông tin</div>
//                         <div className="card-body">
//                             <div className="mb-2">
//                                 <span className="text-muted">Ngày đặt: </span>
//                                 {data.ngayTao ? new Date(data.ngayTao).toLocaleDateString("vi-VN") : "N/A"}
//                             </div>
//                             <div className="mb-2"><span className="text-muted">Thanh toán: </span>{data.hinhThucThanhToan || "N/A"}</div>
//                             <div className="mb-2"><span className="text-muted">Giao hàng: </span>{data.hinhThucGiaoHang || "N/A"}</div>
//                             <div className="mb-2"><span className="text-muted">Địa chỉ nhận: </span>{data.diaChiNhanHang || "N/A"}</div>
//                             <hr />
//                             {/* Nếu muốn hiển thị breakdown phí: */}
//                             {/* <div className="d-flex justify-content-between"><span>Tiền SP</span><span>{dinhDangSo(data.tongTienSanPham)} đ</span></div>
//               <div className="d-flex justify-content-between"><span>Phí giao hàng</span><span>{dinhDangSo(data.chiPhiGiaoHang)} đ</span></div>
//               <div className="d-flex justify-content-between"><span>Phí thanh toán</span><span>{dinhDangSo(data.chiPhiThanhToan)} đ</span></div>
//               <hr /> */}
//                             <div className="d-flex justify-content-between">
//                                 <span className="fw-semibold">Tổng tiền</span>
//                                 <span className="fw-bold text-danger">{dinhDangSo(data.tongTien)} đ</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default DonHangDetail;

// src/layouts/nguoiDung/DonHangDetail.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { isLoggedIn } from "../Utils/authCheck";
import {
    layChiTietDonHangCuaToi,
    type DonHangDetailDTO,
    type ChiTietDonHangDTO,
} from "../../API/DonHangAPI";
import dinhDangSo from "../Utils/dinhDangSo";

const DonHangDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loc = useLocation();

    const [data, setData] = useState<DonHangDetailDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoggedIn()) {
            alert("Vui lòng đăng nhập.");
            navigate("/dang-nhap", { replace: true, state: { from: loc.pathname } });
            return;
        }

        const ac = new AbortController();

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderId = Number(id);
                if (!orderId || Number.isNaN(orderId)) {
                    throw new Error("Mã đơn hàng không hợp lệ.");
                }
                const res = await layChiTietDonHangCuaToi(orderId);
                if (!ac.signal.aborted) setData(res);
            } catch (e: any) {
                if (!ac.signal.aborted) setError(e?.message || "Lỗi tải chi tiết đơn hàng.");
            } finally {
                if (!ac.signal.aborted) setLoading(false);
            }
        };

        void load();
        return () => ac.abort();
    }, [id, navigate, loc.pathname]);

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <h5>Đang tải chi tiết đơn hàng...</h5>
            </div>
        );
    }
    if (error) {
        return <div className="container mt-4 alert alert-danger">Lỗi: {error}</div>;
    }
    if (!data) return null;

    const badge =
        data.trangThai === "Đã hủy"
            ? "bg-danger"
            : data.trangThai === "Đã giao hàng"
                ? "bg-success"
                : data.trangThai === "Đang giao hàng"
                    ? "bg-info"
                    : data.trangThai === "Đang xử lý"
                        ? "bg-warning text-dark"
                        : "bg-secondary";

    const fmtDate = (s?: string) =>
        s ? new Date(s).toLocaleDateString("vi-VN") : "N/A";

    return (
        <div className="container mt-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Đơn hàng #{data.maDonHang}</h3>
                <Link to="/tai-khoan/don-hang" className="btn btn-outline-secondary btn-sm">
                    ← Quay lại
                </Link>
            </div>

            <div className="mb-2">
        <span className={`badge rounded-pill ${badge}`}>
          {data.trangThai || "Chưa xác định"}
        </span>
            </div>

            <div className="row g-3">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header fw-semibold">Sản phẩm</div>
                        <ul className="list-group list-group-flush">
                            {data.chiTiet?.length ? (
                                data.chiTiet.map((i: ChiTietDonHangDTO, idx: number) => (
                                    <li key={idx} className="list-group-item d-flex align-items-center">
                                        <img
                                            src={i.hinhAnhDaiDien || "/images/book/Youngsan.jpg"}
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src =
                                                    "/images/book/Youngsan.jpg";
                                            }}
                                            alt={i.tenSach}
                                            style={{ width: 60, height: 60, objectFit: "cover" }}
                                            className="me-3 rounded"
                                        />
                                        <div className="flex-grow-1">
                                            <div className="fw-semibold">{i.tenSach}</div>
                                            <div className="small text-muted">
                                                SL: {i.soLuong} × {dinhDangSo(i.giaBan)} đ
                                            </div>
                                        </div>
                                        <div className="fw-bold text-danger">
                                            {dinhDangSo(i.thanhTien)} đ
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">
                                    Không có sản phẩm trong đơn này.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm mb-3">
                        <div className="card-header fw-semibold">Thông tin</div>
                        <div className="card-body">
                            <div className="mb-2">
                                <span className="text-muted">Ngày đặt: </span>
                                {fmtDate(data.ngayTao)}
                            </div>
                            <div className="mb-2">
                                <span className="text-muted">Thanh toán: </span>
                                {data.hinhThucThanhToan || "N/A"}
                            </div>
                            <div className="mb-2">
                                <span className="text-muted">Giao hàng: </span>
                                {data.hinhThucGiaoHang || "N/A"}
                            </div>
                            <div className="mb-2">
                                <span className="text-muted">Địa chỉ nhận: </span>
                                {data.diaChiNhanHang || "N/A"}
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span className="fw-semibold">Tổng tiền</span>
                                <span className="fw-bold text-danger">
                  {dinhDangSo(data.tongTien)} đ
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonHangDetail;
