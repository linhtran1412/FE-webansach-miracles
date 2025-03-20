import React from "react";
import HocSinhModel from "../models/HocSinhModel";


export async function my_request(duongDan: string) {
    // Truy cấn đến đường dẫn
    const response = await fetch(duongDan);

    // Nếu bị trả về lỗi
    if (!response.ok) {
        throw new Error(`Không thể truy cập ${duongDan}`);
    }

    // Nếu trả về OK
    return response.json();
}

export async function layToanBoHocSinh(): Promise<HocSinhModel[]> {
    const ketQua: HocSinhModel[] = [];

    // Xác định endpoint
    const duongDan: string = 'http://localhost:8080/students';

    // Gọi phương thức request
    const response = await my_request(duongDan);
    console.log(response);

  // Lấy ra json sach
const responseData = response._embedded.students;


    for (const key in responseData) {
        console.log(responseData);
       ketQua.push({
      id: responseData[key].id,
           department: responseData[key].department,
         first_name: responseData[key].first_name,
   last_name: responseData[key].last_name,

      });
     }

    return ketQua;
}
