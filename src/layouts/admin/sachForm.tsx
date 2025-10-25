// import React, { FormEvent, useState } from 'react';
//
//
// const SachForm: React.FC = () => {
//     const [sach, setSach] = useState({
//         maSach: 0,
//         tenSach: '',
//         giaBan: 0,
//         giaNiemYet: 0,
//         moTa: '',
//         soLuong: 0,
//         tenTacGia: '',
//         trungBinhXepHang: 0,
//     })
//
//     const handleSubmit = (event: FormEvent) => {
//         event.preventDefault();
//         const token = localStorage.getItem('token');
//         fetch(  'http://localhost:8080/sach',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type' : 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(sach)
//             }
//         ).then((reponse)=>{
//             if(reponse.ok){
//                 alert("Đã thêm sách thành công!");
//                 setSach({
//                     maSach: 0,
//                     tenSach: '',
//                     giaBan: 0,
//                     giaNiemYet: 0,
//                     moTa: '',
//                     soLuong: 0,
//                     tenTacGia: '',
//                     trungBinhXepHang: 0,
//                 })
//             }else{
//                 alert("Gặp lỗi trong quá trình thêm sách!");
//             }
//         })
//     }
//
//     return (
//         <div className='container row d-flex align-items-center justify-content-center'>
//             <div className=''>
//                 <h1>THÊM SÁCH</h1>
//                 <form onSubmit={handleSubmit} className='form'>
//                     <input
//                         type='hidden'
//                         id='maSach'
//                         value={sach.maSach}
//                     />
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
//                     <label htmlFor='soLuong'>soLuong</label>
//                     <input
//                         className='form-control'
//                         type='number'
//                         value={sach.soLuong}
//                         onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
//                         required
//                     />
//
//                     <label htmlFor='tenSach'>Tên tác giả</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         value={sach.tenTacGia}
//                         onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
//                         required
//                     />
//
//                     <label htmlFor='moTa'>Mô tả</label>
//                     <input
//                         className='form-control'
//                         type='moTa'
//                         value={sach.moTa}
//                         onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
//                         required
//                     />
//
//
//                     <button type='submit' className='btn btn-success mt-2'>Lưu</button>
//                 </form>
//             </div>
//         </div>
//     )
// }
//
// export default SachForm;


import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SachForm: React.FC = () => {
    const navigate = useNavigate();
    const [sach, setSach] = useState({
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        isbn: '', // Thêm ISBN
    });
    const [hinhAnh, setHinhAnh] = useState<File | null>(null);
    const [dangLuu, setDangLuu] = useState(false);
    const [thongBao, setThongBao] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // Optional: Thêm kiểm tra kích thước, loại file
            const maxSize = 5 * 1024 * 1024; // Giới hạn 5MB
            if (file.size > maxSize) {
                alert("Kích thước ảnh quá lớn (tối đa 5MB).");
                event.target.value = ''; // Reset input
                setHinhAnh(null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                alert("Chỉ chấp nhận file ảnh JPG, PNG, GIF.");
                event.target.value = ''; // Reset input
                setHinhAnh(null);
                return;
            }
            setHinhAnh(file);
        } else {
            setHinhAnh(null);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setDangLuu(true);
        setThongBao('');

        const token = localStorage.getItem('token');
        if (!token) {
            alert("Vui lòng đăng nhập lại.");
            setDangLuu(false);
            navigate('/dang-nhap');
            return;
        }

        const formData = new FormData();
        const sachDataToSend = {
            ...sach,
            giaBan: parseFloat(sach.giaBan.toString()) || 0,
            giaNiemYet: parseFloat(sach.giaNiemYet.toString()) || 0,
            soLuong: parseInt(sach.soLuong.toString()) || 0,
        };
        formData.append('sach', JSON.stringify(sachDataToSend));

        if (hinhAnh) {
            formData.append('file', hinhAnh);
        }

        try {
            const response = await fetch('http://localhost:8080/api/admin/sach', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                alert("Đã thêm sách thành công!");
                setSach({ tenSach: '', giaBan: 0, giaNiemYet: 0, moTa: '', soLuong: 0, tenTacGia: '', isbn: '' });
                setHinhAnh(null);
                const fileInput = document.getElementById('hinhAnh') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
                navigate('/admin');
            } else {
                const errorText = await response.text();
                setThongBao(`Lỗi ${response.status}: ${errorText || 'Không thể thêm sách.'}`);
                console.error("Lỗi thêm sách:", errorText);
            }
        } catch (error) {
            console.error("Lỗi mạng khi thêm sách:", error);
            setThongBao("Lỗi kết nối máy chủ. Vui lòng thử lại.");
        } finally {
            setDangLuu(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSach(prevSach => ({
            ...prevSach,
            [name]: value
        }));
    };

    return (
        <div className='container mt-4 mb-5'>
            <h1>THÊM SÁCH MỚI</h1>
            {thongBao && <div className={`alert ${thongBao.startsWith('Lỗi') ? 'alert-danger' : 'alert-warning'}`}>{thongBao}</div>}
            <form onSubmit={handleSubmit} className='form'>
                <div className="mb-3">
                    <label htmlFor='tenSach' className="form-label">Tên sách (*)</label>
                    <input className='form-control' type='text' id='tenSach' name='tenSach' value={sach.tenSach} onChange={handleChange} required disabled={dangLuu} />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor='giaBan' className="form-label">Giá bán (*)</label>
                        <input className='form-control' type='number' id='giaBan' name='giaBan' value={sach.giaBan} onChange={handleChange} required disabled={dangLuu} step="1000" min="0"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor='giaNiemYet' className="form-label">Giá niêm yết</label>
                        <input className='form-control' type='number' id='giaNiemYet' name='giaNiemYet' value={sach.giaNiemYet} onChange={handleChange} disabled={dangLuu} step="1000" min="0"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor='soLuong' className="form-label">Số lượng (*)</label>
                    <input className='form-control' type='number' id='soLuong' name='soLuong' value={sach.soLuong} onChange={handleChange} required disabled={dangLuu} min="0" step="1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor='tenTacGia' className="form-label">Tên tác giả (*)</label>
                    <input className='form-control' type='text' id='tenTacGia' name='tenTacGia' value={sach.tenTacGia} onChange={handleChange} required disabled={dangLuu} />
                </div>
                <div className="mb-3">
                    <label htmlFor='isbn' className="form-label">ISBN</label>
                    <input className='form-control' type='text' id='isbn' name='isbn' value={sach.isbn} onChange={handleChange} disabled={dangLuu} />
                </div>
                <div className="mb-3">
                    <label htmlFor='moTa' className="form-label">Mô tả</label>
                    <textarea className='form-control' id='moTa' name='moTa' value={sach.moTa} onChange={handleChange} disabled={dangLuu} rows={4}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="hinhAnh" className="form-label">Ảnh đại diện</label>
                    <input
                        className="form-control"
                        type="file"
                        id="hinhAnh"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleFileChange}
                        disabled={dangLuu}
                    />
                    {hinhAnh && <img src={URL.createObjectURL(hinhAnh)} alt="Preview" style={{maxWidth: '100px', marginTop: '10px'}}/>}
                </div>
                <button type='submit' className='btn btn-success mt-2' disabled={dangLuu}>
                    {dangLuu ? 'Đang lưu...' : 'Lưu Sách'}
                </button>
                <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => navigate('/admin')} disabled={dangLuu}>
                    Hủy
                </button>
            </form>
        </div>
    )
}

export default SachForm;
