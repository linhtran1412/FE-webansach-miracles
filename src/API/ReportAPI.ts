const getToken = () => localStorage.getItem('token');

export interface SeriesPoint {
    date: string;     // yyyy-MM-dd (string)
    value: number;    // doanh thu
}
export interface ReportSummaryDTO {
    revenue: number;
    orders: number;
    byStatus: Record<string, number>;
    revenueSeries: SeriesPoint[];
    topBooks: Array<{name: string; quantity: number}>;
}

function authHeaders() {
    const tk = getToken();
    if (!tk) throw new Error("Bạn cần đăng nhập với quyền admin.");
    return { 'Authorization': `Bearer ${tk}` };
}

export async function getSummary(from: string, to: string): Promise<ReportSummaryDTO> {
    const url = `http://localhost:8080/api/admin/reports/summary?from=${from}&to=${to}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function downloadCsv(from: string, to: string): Promise<Blob> {
    const url = `http://localhost:8080/api/admin/reports/export.csv?from=${from}&to=${to}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.blob(); // text/csv
}

export async function downloadPdf(from: string, to: string): Promise<Blob> {
    const url = `http://localhost:8080/api/admin/reports/export.pdf?from=${from}&to=${to}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.blob(); // application/pdf
}
