import { my_request } from "./Request";
import DanhGiaModel from "../models/DanhGiamodel";

// Loại bỏ import không sử dụng
// import React from "react";
// import HinhAnhModel from "../models/HinhAnhModel";

async function layDanhGiaCuaMotSach(duongDan: string): Promise<DanhGiaModel[]> {
    const ketQua: DanhGiaModel[] = [];

    // Gọi phương thức request
    const response = await my_request(duongDan);

    // Lấy ra json sach
    const responseData = response._embedded.suDanhGias;

    for (const key in responseData) {
        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            nhanXet: responseData[key].nhanXet,
            diemXepHang: responseData[key].diemXepHang,
            maNguoiDung: 0
        });
    }

    return ketQua;
}

export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {
    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia`;

    return layDanhGiaCuaMotSach(duongDan);
}

export async function lay1DanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {
    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia?sort=maDanhGia,asc&page=0&size=1&`;

    return layDanhGiaCuaMotSach(duongDan);
}

export async function DanhGiaInfoNguoiDungTheoMaDanhGia(maDanhGia: number): Promise<DanhGiaModel[]> {
    // Sửa lỗi kiểu dữ liệu bằng cách chuyển maDanhGia thành number
    const duongDan: string = `http://localhost:8080/su-danh-gia/${maDanhGia}/nguoiDung`;

    return layDanhGiaCuaMotSach(duongDan);
}
