// import React, { FormEvent, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
//
// const SachUpdate: React.FC = () => {
//     const { maSach } = useParams(); // Lấy mã sách từ URL
//     const navigate = useNavigate();
//
//     const [sach, setSach] = useState({
//         maSach: 0,
//         tenSach: '',
//         giaBan: 0,
//         giaNiemYet: 0,
//         moTa: '',
//         soLuong: 0,
//         tenTacGia: '',
//         isbn: '',
//         trungBinhXepHang: 0,
//     });
//
//     // Gọi API lấy thông tin sách khi có maSach
//     useEffect(() => {
//         if (maSach) {
//             fetch(`http://localhost:8080/sach/${maSach}`)
//                 .then(res => res.json())
//                 .then(data => setSach(data))
//                 .catch(err => console.error("Lỗi khi tải sách:", err));
//         }
//     }, [maSach]);
//
//     const handleSubmit = (event: FormEvent) => {
//         event.preventDefault();
//
//         const method = maSach ? 'PUT' : 'POST';
//         const url = maSach
//             ? `http://localhost:8080/sach/${maSach}`
//             : 'http://localhost:8080/sach';
//
//         fetch(url, {
//             method: method,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(sach),
//         }).then((response) => {
//             if (response.ok) {
//                 alert(maSach ? 'Cập nhật sách thành công!' : 'Thêm sách thành công!');
//                 navigate('/admin/'); // chuyển về danh sách sau khi lưu
//             } else {
//                 alert("Gặp lỗi trong quá trình lưu sách!");
//             }
//         });
//     };
//
//     return (
//         <div className='container row d-flex align-items-center justify-content-center'>
//             <div className=''>
//                 <h1>{maSach ? 'CẬP NHẬT SÁCH' : 'THÊM SÁCH'}</h1>
//                 <form onSubmit={handleSubmit} className='form'>
//
//                     <label htmlFor='tenSach'>Tên sách</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         value={sach.tenSach}
//                         onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
//                         required
//                     />
//
//                     <label htmlFor='giaBan'>Giá bán</label>
//                     <input
//                         className='form-control'
//                         type='number'
//                         value={sach.giaBan}
//                         onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}
//                         required
//                     />
//
//                     <label htmlFor='giaNiemYet'>Giá niêm yết</label>
//                     <input
//                         className='form-control'
//                         type='number'
//                         value={sach.giaNiemYet}
//                         onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}
//                         required
//                     />
//
//                     <label htmlFor='soLuong'>Số lượng</label>
//                     <input
//                         className='form-control'
//                         type='number'
//                         value={sach.soLuong}
//                         onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
//                         required
//                     />
//
//                     <label htmlFor='tenTacGia'>Tên tác giả</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         value={sach.tenTacGia}
//                         onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
//                         required
//                     />
//
//                     <label htmlFor='moTa'>Mô tả</label>
//                     <textarea
//                         className='form-control'
//                         value={sach.moTa}
//                         onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
//                         required
//                     />
//
//                     <label htmlFor='isbn'>ISBN</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         value={sach.isbn}
//                         onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
//                         required
//                     />
//
//                     <button type='submit' className='btn btn-success mt-2'>
//                         {maSach ? 'Cập nhật' : 'Lưu'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default SachUpdate;


import React, { FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Interface cho dữ liệu sách nhận từ API GET /sach/{id}
interface SachDataFromAPI {
    maSach: number;
    tenSach?: string;
    giaBan?: number;
    giaNiemYet?: number;
    moTa?: string;
    soLuong?: number;
    tenTacGia?: string;
    isbn?: string;
    trungBinhXepHang?: number;
    danhSachHinhAnh?: { maHinhAnh: number; duLieuAnh?: string; laIcon?: boolean }[];
}


const SachUpdate: React.FC = () => {
    const { maSach } = useParams();
    const navigate = useNavigate();
    const [sach, setSach] = useState<SachDataFromAPI | null>(null);
    const [hinhAnh, setHinhAnh] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const [dangTai, setDangTai] = useState(true);
    const [dangLuu, setDangLuu] = useState(false);
    const [thongBao, setThongBao] = useState('');

    useEffect(() => {
        if (maSach) {
            setDangTai(true);
            setThongBao('');
            fetch(`http://localhost:8080/sach/${maSach}`)
                .then(res => {
                    if (!res.ok) { throw new Error(`Không thể tải dữ liệu sách (Status: ${res.status})`); }
                    return res.json();
                })
                .then((data: SachDataFromAPI) => {
                    setSach(data);
                    const iconImage = data.danhSachHinhAnh?.find(img => img.laIcon);
                    if (iconImage && iconImage.duLieuAnh) {
                        setCurrentImageUrl(iconImage.duLieuAnh);
                    }
                    setDangTai(false);
                })
                .catch(err => {
                    console.error("Lỗi khi tải sách:", err);
                    setThongBao(`Lỗi tải dữ liệu sách: ${err.message}`);
                    setDangTai(false);
                });
        } else {
            setDangTai(false);
            setThongBao("Mã sách không hợp lệ.");
        }
    }, [maSach]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // Optional: Thêm kiểm tra kích thước, loại file
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert("Kích thước ảnh quá lớn (tối đa 5MB).");
                event.target.value = '';
                setHinhAnh(null);
                const oldIcon = sach?.danhSachHinhAnh?.find(img => img.laIcon);
                setCurrentImageUrl(oldIcon?.duLieuAnh || null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                alert("Chỉ chấp nhận file ảnh JPG, PNG, GIF.");
                event.target.value = '';
                setHinhAnh(null);
                const oldIcon = sach?.danhSachHinhAnh?.find(img => img.laIcon);
                setCurrentImageUrl(oldIcon?.duLieuAnh || null);
                return;
            }
            setHinhAnh(file);
            setCurrentImageUrl(URL.createObjectURL(event.target.files[0])); // Preview ảnh mới
        } else {
            setHinhAnh(null);
            const oldIcon = sach?.danhSachHinhAnh?.find(img => img.laIcon);
            setCurrentImageUrl(oldIcon?.duLieuAnh || null); // Reset về ảnh cũ
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!sach) {
            setThongBao("Dữ liệu sách chưa được tải.");
            return;
        }

        setDangLuu(true);
        setThongBao('');

        const token = localStorage.getItem('token');
        if (!token) {
            alert("Vui lòng đăng nhập lại.");
            setDangLuu(false);
            navigate('/dang-nhap');
            return;
        }

        const url = `http://localhost:8080/api/admin/sach/${maSach}`;

        const formData = new FormData();
        const sachDataToSend = {
            tenSach: sach.tenSach || '',
            giaBan: parseFloat(sach.giaBan?.toString() || '0') || 0,
            giaNiemYet: parseFloat(sach.giaNiemYet?.toString() || '0') || 0,
            moTa: sach.moTa || '',
            soLuong: parseInt(sach.soLuong?.toString() || '0') || 0,
            tenTacGia: sach.tenTacGia || '',
            isbn: sach.isbn || '',
        };
        formData.append('sach', JSON.stringify(sachDataToSend));

        if (hinhAnh) {
            formData.append('file', hinhAnh);
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                alert('Cập nhật sách thành công!');
                navigate('/admin');
            } else {
                const errorText = await response.text();
                setThongBao(`Lỗi ${response.status}: ${errorText || 'Không thể cập nhật sách.'}`);
                console.error("Lỗi cập nhật sách:", errorText);
            }
        } catch (error) {
            console.error("Lỗi mạng khi cập nhật sách:", error);
            setThongBao("Lỗi kết nối máy chủ. Vui lòng thử lại.");
        } finally {
            setDangLuu(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSach(prevSach => {
            if (!prevSach) return null;
            return { ...prevSach, [name]: value };
        });
    };

    if (dangTai) { return <div className='container mt-4'>Đang tải thông tin sách...</div>; }
    if (!sach && !thongBao) { return <div className='container mt-4 alert alert-warning'>Không tìm thấy sách.</div>; }
    if (thongBao && !sach) { return <div className='container mt-4 alert alert-danger'>{thongBao}</div>; }

    return (
        <div className='container mt-4 mb-5'>
            <h1>CẬP NHẬT SÁCH #{maSach}</h1>
            {thongBao && <div className={`alert ${thongBao.startsWith('Lỗi') ? 'alert-danger' : 'alert-warning'}`}>{thongBao}</div>}
            {sach && (
                <form onSubmit={handleSubmit} className='form'>
                    <div className="mb-3">
                        <label htmlFor='tenSach' className="form-label">Tên sách (*)</label>
                        <input className='form-control' type='text' id='tenSach' name='tenSach' value={sach.tenSach || ''} onChange={handleChange} required disabled={dangLuu} />
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor='giaBan' className="form-label">Giá bán (*)</label>
                            <input className='form-control' type='number' id='giaBan' name='giaBan' value={sach.giaBan ?? ''} onChange={handleChange} required disabled={dangLuu} step="1000" min="0"/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor='giaNiemYet' className="form-label">Giá niêm yết</label>
                            <input className='form-control' type='number' id='giaNiemYet' name='giaNiemYet' value={sach.giaNiemYet ?? ''} onChange={handleChange} disabled={dangLuu} step="1000" min="0"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='soLuong' className="form-label">Số lượng (*)</label>
                        <input className='form-control' type='number' id='soLuong' name='soLuong' value={sach.soLuong ?? ''} onChange={handleChange} required disabled={dangLuu} min="0" step="1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='tenTacGia' className="form-label">Tên tác giả (*)</label>
                        <input className='form-control' type='text' id='tenTacGia' name='tenTacGia' value={sach.tenTacGia || ''} onChange={handleChange} required disabled={dangLuu} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='isbn' className="form-label">ISBN</label>
                        <input className='form-control' type='text' id='isbn' name='isbn' value={sach.isbn || ''} onChange={handleChange} disabled={dangLuu} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='moTa' className="form-label">Mô tả</label>
                        <textarea className='form-control' id='moTa' name='moTa' value={sach.moTa || ''} onChange={handleChange} disabled={dangLuu} rows={4}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hinhAnh" className="form-label">Ảnh đại diện (Chọn ảnh mới để thay thế)</label>
                        <input
                            className="form-control"
                            type="file"
                            id="hinhAnh"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={handleFileChange}
                            disabled={dangLuu}
                        />
                        {currentImageUrl && (
                            <div className="mt-2">
                                <p>Ảnh hiện tại / Ảnh mới xem trước:</p>
                                <img src={currentImageUrl} alt="Ảnh sách" style={{maxWidth: '150px', maxHeight: '150px', objectFit: 'contain'}}/>
                            </div>
                        )}
                    </div>
                    <button type='submit' className='btn btn-success mt-2' disabled={dangLuu}>
                        {dangLuu ? 'Đang cập nhật...' : 'Cập nhật Sách'}
                    </button>
                    <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => navigate('/admin')} disabled={dangLuu}>
                        Hủy
                    </button>
                </form>
            )}
        </div>
    );
};

export default SachUpdate;