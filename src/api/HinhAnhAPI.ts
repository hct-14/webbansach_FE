import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import { my_request } from "./Request";

async function layAnhCuaMotSach(duongDan: string): Promise<HinhAnhModel[]> {
  try {
    const response = await my_request(duongDan);
    const responseData = response._embedded.hinhAnhs;

    const ketQua: HinhAnhModel[] = responseData.map((anh: any) => ({
      maHinhAnh: anh.maHinhAnh,
      tenHinhAnh: anh.tenHinhAnh,
      laIcon: anh.laIcon,
      duongDan: anh.duongDan,
      duLieuAnh: anh.duLieuAnh,
    }));

    return ketQua;
  } catch (error) {
    // Xử lý lỗi ở đây nếu cần
    console.error("Đã xảy ra lỗi khi lấy ảnh của sách:", error);
    throw error;
  }
}

export async function layToanBoAnhCuaSach(maSach: number): Promise<HinhAnhModel[]> {
  const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
  return layAnhCuaMotSach(duongDan);
}

export async function layMotAnhCuaSach(maSach: number): Promise<HinhAnhModel[]> {
  const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
  return layAnhCuaMotSach(duongDan);
}
