import React, { useEffect, useState } from "react";
import SachModel from "../models/SachModel";
import SachProps from "./component/SachProps";
import { layToanBoSach, timKiemSach } from "../api/SachAPI";
import { error } from "console";
import PhanTrang from "../utils/PhanTrang";

interface DanhSachSanPhamProps{
    tuKhoaTimKiem:string;
    maTheLoai:number;
}

function DanhSachSanPham ({tuKhoaTimKiem, maTheLoai}:DanhSachSanPhamProps){

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setSoSach] = useState(0);


    console.log("trang hien tai", trangHienTai);
    console.log("ma the loai",maTheLoai);


    useEffect(() => {
        if (tuKhoaTimKiem === '' && maTheLoai==0) {
            layToanBoSach(trangHienTai - 1).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }else{
            timKiemSach(tuKhoaTimKiem, maTheLoai).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
        
    }, 
    [trangHienTai, tuKhoaTimKiem, maTheLoai]);

    const phanTrang = (trangHienTai: number) => {
        setTrangHienTai(trangHienTai);
    };


    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    if(danhSachQuyenSach.length===0){
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    <h1>mày tìm cái đéo gì thế</h1>
                </div>
                {/* <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/> */}
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map((sach) => (
                        <SachProps key={sach.maSach} sach={sach} />
                    )
                    )
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </div>
    );
}

export default DanhSachSanPham;