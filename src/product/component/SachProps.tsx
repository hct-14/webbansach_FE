import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import HinhAnhModel from "../../models/HinhAnhModel";
import { layMotAnhCuaSach, layToanBoAnhCuaSach } from "../../api/HinhAnhAPI";
import { error } from "console";
import { Link } from "react-router-dom";
import renderRating from "../../utils/DanhGiaSao";
import dinhDangSo from "../../utils/DinhDangSo";


interface SachPropsInterface{
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {

    const maSach: number = props.sach.maSach;

    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layMotAnhCuaSach(maSach).then(
            hinhAnhData =>{
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [] // Chi goi mot lan
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

    let duLieuAnh:string="";
    if(danhSachAnh[0] && danhSachAnh[0].duLieuAnh){
        duLieuAnh=danhSachAnh[0].duLieuAnh;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/sach/${props.sach.maSach}`}  >
                    <img
                        src={duLieuAnh}
                        className="card-img-top"
                        alt={props.sach.tenSach}
                        style={{ height: '200px' }}
                    />
                </Link>
                <div className="card-body">
                    <Link to={`/sach/${props.sach.maSach}`} style={{textDecoration:'none'}}>
                        <h5 className="card-title">{props.sach.tenSach}</h5>
                        </Link>
                        <p className="card-text">{props.sach.moTa}</p>
                   
                    <div className="price">
                        <span className="original-price col-6 text-end" >
                            <del>{dinhDangSo(props.sach.giaNiemYet)}</del>
                        </span>
                        <span className="discounted-price col-6">
                            <strong>{dinhDangSo(props.sach.giaBan)} đ</strong>
                        </span>
                
                    </div>
                    <span className="discounted-price">
                            <strong>{renderRating(props.sach.trungBinhXepHang?props.sach.trungBinhXepHang:0)}</strong>
                        </span>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;