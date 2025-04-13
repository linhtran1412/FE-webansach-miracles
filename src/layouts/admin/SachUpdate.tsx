import React, { FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SachUpdate: React.FC = () => {
    const { maSach } = useParams(); // Lấy mã sách từ URL
    const navigate = useNavigate();

    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        isbn: '',
        trungBinhXepHang: 0,
    });

    // Gọi API lấy thông tin sách khi có maSach
    useEffect(() => {
        if (maSach) {
            fetch(`http://localhost:8080/sach/${maSach}`)
                .then(res => res.json())
                .then(data => setSach(data))
                .catch(err => console.error("Lỗi khi tải sách:", err));
        }
    }, [maSach]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const method = maSach ? 'PUT' : 'POST';
        const url = maSach
            ? `http://localhost:8080/sach/${maSach}`
            : 'http://localhost:8080/sach';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sach),
        }).then((response) => {
            if (response.ok) {
                alert(maSach ? 'Cập nhật sách thành công!' : 'Thêm sách thành công!');
                navigate('/admin/'); // chuyển về danh sách sau khi lưu
            } else {
                alert("Gặp lỗi trong quá trình lưu sách!");
            }
        });
    };

    return (
        <div className='container row d-flex align-items-center justify-content-center'>
            <div className=''>
                <h1>{maSach ? 'CẬP NHẬT SÁCH' : 'THÊM SÁCH'}</h1>
                <form onSubmit={handleSubmit} className='form'>

                    <label htmlFor='tenSach'>Tên sách</label>
                    <input
                        className='form-control'
                        type='text'
                        value={sach.tenSach}
                        onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                        required
                    />

                    <label htmlFor='giaBan'>Giá bán</label>
                    <input
                        className='form-control'
                        type='number'
                        value={sach.giaBan}
                        onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}
                        required
                    />

                    <label htmlFor='giaNiemYet'>Giá niêm yết</label>
                    <input
                        className='form-control'
                        type='number'
                        value={sach.giaNiemYet}
                        onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}
                        required
                    />

                    <label htmlFor='soLuong'>Số lượng</label>
                    <input
                        className='form-control'
                        type='number'
                        value={sach.soLuong}
                        onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
                        required
                    />

                    <label htmlFor='tenTacGia'>Tên tác giả</label>
                    <input
                        className='form-control'
                        type='text'
                        value={sach.tenTacGia}
                        onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                        required
                    />

                    <label htmlFor='moTa'>Mô tả</label>
                    <textarea
                        className='form-control'
                        value={sach.moTa}
                        onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                        required
                    />

                    <label htmlFor='isbn'>ISBN</label>
                    <input
                        className='form-control'
                        type='text'
                        value={sach.isbn}
                        onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
                        required
                    />

                    <button type='submit' className='btn btn-success mt-2'>
                        {maSach ? 'Cập nhật' : 'Lưu'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SachUpdate;
