import React from "react";
import SachModel from "../models/SachModel";

//truy van den duong dan
async function request(duongDan:string) {
    const response = await fetch(duongDan);

    if( !response.ok){
        throw new Error(`khong the truy cap duong dan nay ${duongDan}`)
    }
    return response.json();


    
}

export async function layToanBoSach():Promise<SachModel[]> {
    const ketQua:SachModel[] = [];
    const duongDan:string= 'http://localhost:8080/sach'

    // const request(duongDan).then().catch();
    const response = await request(duongDan);

    // console.log(response);
    const responseData = response._embedded.saches;
        console.log(responseData);

        for(const key in responseData){
            ketQua.push({
            maSach: responseData[key].maSach,
            tenSach:    responseData[key].tenSach,
            giaNiemYet: responseData[key].giaNiemYet,
            giaBan: responseData[key].giaBan,
            moTa:responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang:responseData[key].trungBinhXepHang
            });
        }
    


    return ketQua;
}