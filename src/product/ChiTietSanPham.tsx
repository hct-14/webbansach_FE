import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { error } from "console";
import SachModel from "../models/SachModel";
import { laySachTheoMaSach } from "../api/SachAPI";
import HinhAnhSanPham from "./component/HinhAnhSanPham";
import DanhGiaSanPham from "./component/DanhGiaSanPham";
import { Star, StarFill } from "react-bootstrap-icons";
import renderRating from "../utils/DanhGiaSao";


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
  const [baoLoi, setBaoLoi] = useState(null);


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
                              {sach.giaBan}
                          </h4>
                          <hr/>
                              <div dangerouslySetInnerHTML={{__html: (sach.moTa+'')}}/>
                          <hr/>
                      </div>
                      <div className="col-4">
                          
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