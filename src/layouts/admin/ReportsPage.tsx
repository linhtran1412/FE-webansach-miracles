import React, {useState} from "react";
import {getSummary, downloadCsv, downloadPdf, ReportSummaryDTO} from "../../API/ReportAPI";

function formatVND(n?: number) {
    if (n == null) return "0 đ";
    return n.toLocaleString("vi-VN") + " đ";
}

const ReportsPage: React.FC = () => {
    // mặc định chọn 7 ngày gần nhất
    const today = new Date();
    const toDefault = today.toISOString().slice(0,10);
    const fromDefault = new Date(today.getTime() - 6*86400000).toISOString().slice(0,10);

    const [from, setFrom] = useState(fromDefault);
    const [to, setTo] = useState(toDefault);
    const [data, setData] = useState<ReportSummaryDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const handleView = async () => {
        setErr(null); setLoading(true);
        try {
            const res = await getSummary(from, to);
            setData(res);
        } catch (e:any) {
            setErr(e.message || "Lỗi tải báo cáo");
        } finally { setLoading(false); }
    };

    const doDownload = async (kind: "csv"|"pdf") => {
        try {
            const blob = kind === "csv" ? await downloadCsv(from,to) : await downloadPdf(from,to);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `report_${from}_${to}.${kind}`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (e:any) {
            alert(e.message || `Lỗi tải ${kind.toUpperCase()}`);
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Báo cáo doanh thu</h1>
            </div>

            {/* Bộ lọc ngày */}
            <div className="row g-2 mb-3">
                <div className="col-sm-3">
                    <label className="form-label">Từ ngày</label>
                    <input type="date" className="form-control" value={from} onChange={e=>setFrom(e.target.value)} />
                </div>
                <div className="col-sm-3">
                    <label className="form-label">Đến ngày</label>
                    <input type="date" className="form-control" value={to} onChange={e=>setTo(e.target.value)} />
                </div>
                <div className="col-sm-6 d-flex align-items-end gap-2">
                    <button className="btn btn-primary" onClick={handleView} disabled={loading}>
                        {loading ? "Đang tải..." : "Xem thống kê"}
                    </button>
                    <button className="btn btn-outline-secondary" onClick={()=>doDownload("csv")} disabled={!data}>Xuất CSV</button>
                    <button className="btn btn-outline-dark" onClick={()=>doDownload("pdf")} disabled={!data}>Xuất PDF</button>
                </div>
            </div>

            {err && <div className="alert alert-danger">{err}</div>}

            {/* Tổng quan */}
            {data && (
                <>
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="text-muted">Tổng doanh thu</div>
                                    <div className="h4">{formatVND(data.revenue)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="text-muted">Tổng số đơn</div>
                                    <div className="h4">{data.orders?.toLocaleString("vi-VN")}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="text-muted">Theo trạng thái</div>
                                    <div>
                                        {Object.entries(data.byStatus || {}).map(([k,v])=>(
                                            <span key={k} className="badge bg-secondary me-2">{k}: {v}</span>
                                        ))}
                                        {(!data.byStatus || Object.keys(data.byStatus).length===0) && <span className="text-muted">—</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bảng doanh thu theo ngày */}
                    <div className="card shadow-sm">
                        <div className="card-header">Doanh thu theo ngày</div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-striped mb-0">
                                    <thead>
                                    <tr><th className="w-25">Ngày</th><th className="text-end">Doanh thu</th></tr>
                                    </thead>
                                    <tbody>
                                    {(data.revenueSeries || []).map((p, idx)=>(
                                        <tr key={idx}>
                                            <td>{p.date}</td>
                                            <td className="text-end">{formatVND(p.value)}</td>
                                        </tr>
                                    ))}
                                    {(!data.revenueSeries || data.revenueSeries.length===0) && (
                                        <tr><td colSpan={2} className="text-center text-muted">Không có dữ liệu</td></tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default ReportsPage;
