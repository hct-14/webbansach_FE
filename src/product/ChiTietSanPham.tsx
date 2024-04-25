import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { error } from "console";
import SachModel from "../models/SachModel";
import { laySachTheoMaSach } from "../api/SachAPI";
import HinhAnhSanPham from "./component/HinhAnhSanPham";
import DanhGiaSanPham from "./component/DanhGiaSanPham";
import { Star, StarFill } from "react-bootstrap-icons";
import renderRating from "../utils/DanhGiaSao";
import dinhDangSo from "../utils/DinhDangSo";


const ChiTietSanPham: React.FC = () => {
  // Lấy mã sách từ URL
  const { maSach } = useParams();

  let maSachNumber = 0;
  try {
      maSachNumber = parseInt(maSach + '');
      if (Number.isNaN(maSachNumber))
          maSachNumber = 0;
  } catch (error) {
      maSachNumber = 0;
      console.error("Error", error);
  }

  // Khai báo
  const [sach, setSach] = useState<SachModel | null>(null);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi]  = useState(null);
  const [soLuong, setSoLuong] = useState(1);
  const tangSoLuong = () =>{

   const soLuongTrongKho = (sach&&sach?.soLuong?sach.soLuong:0);

    if(soLuong < soLuongTrongKho)
    setSoLuong(soLuong+1);
  }
  const giamSoLuong= () =>{
    if(soLuong>2){
        setSoLuong(soLuong-1);
    }
  }
  const handleSoLuong = (Event: React.ChangeEvent<HTMLInputElement>) => {
    const soLuongMoi = parseInt(Event?.target.value);

    // Giả sử soLuongTrongKho đã được định nghĩa ở nơi khác trong phạm vi component.
    const soLuongTrongKho = (sach && sach?.soLuong ? sach.soLuong : 0);

    if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTrongKho) {
        setSoLuong(soLuongMoi);
    }
}
const handleMuaNgay = () => {

}
const handleThemVaoGioHang = () => {

}



  useEffect(() => {
      laySachTheoMaSach(maSachNumber)
          .then((sach) => {
              setSach(sach);
              setDangTaiDuLieu(false);
          }
          )
          .catch((error) => {
              setBaoLoi(error.message);
              setDangTaiDuLieu(false);
          })
  }, [maSach]
  )

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

  if (!sach) {
      return (
          <div>
              <h1>Sách không tồn tại!</h1>
          </div>
      );
  }

  
//   const renderRating = (diem:number)=>{
//     const stars = [];
//     for(let i =1; i<=5; i++){
//         if(i<=diem){
//             stars.push(<StarFill key={i} className="text-warning" />);
//         }else{
//             stars.push(<Star key={i}  className="text-secondary" />);
//         }
//     }
//     return stars;
// }


  return (
      <div className="container">
          <div className="row mt-4 mb-4">
              <div className="col-4">
                  <HinhAnhSanPham maSach={maSachNumber}/>

              </div>
              <div className="col-8">
                  <div className="row">
                      <div className="col-8">
                          <h1>
                              {sach.tenSach}
                          </h1>
                          <h4>
                              {renderRating(sach.trungBinhXepHang?sach.trungBinhXepHang:0)}
                          </h4>
                          <h4>
                              {dinhDangSo(sach.giaBan) +" VND"}
                          </h4>
                          <hr/>
                              <div dangerouslySetInnerHTML={{__html: (sach.moTa+'')}}/>
                          <hr/>
                      </div>
                      <div className="col-4">
                          <div className="mb-2">
                                so luong trong kho {sach.soLuong}
                          </div>
                          <div className="d-flex align-items-center">
                          <button className="btn btn-ouline-secondary"  onClick={giamSoLuong}>-</button>
                                <input className="form-control text-center" type="numbert" value={soLuong} min={1} onChange={handleSoLuong}/> 
                          <button className="btn btn-ouline-secondary" onClick={tangSoLuong}>+</button>
                            
                          </div>
                          {
                                sach.giaBan&&(
                                    <div className="mt-2 text-center">so tien tam tinh: {dinhDangSo(soLuong*sach.giaBan)} đ</div>

                           
                                )
                            }


                                
                                        
                      </div>

                      <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger mt-3" onClick={handleMuaNgay}>Mua ngay</button>
                                    <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleThemVaoGioHang}>Thêm vào giỏ hàng</button>
                  </div>
              </div>
          </div>
          </div>
          <div className="row mt-4 mb-4">
              <DanhGiaSanPham maSach={maSachNumber} />
          </div>
     
      </div>
  );
}
export default ChiTietSanPham;