import React, { useEffect, useState } from "react";
import DanhGiaSanPham from "./DanhGiaSanPham";
import DanhGiaModel from "../../models/DanhGiamodel";
import { DanhGiaInfoNguoiDungTheoMaDanhGia } from "../../api/DanhGiaAPI";

interface DanhGiaInfoProps {
    maDanhGia: number;
}

const DanhGiaInfo: React.FC<DanhGiaInfoProps> = (props) => {

    const { maDanhGia } = props;
    const [danhGiaInfo, setDanhGiaInfo] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null); // Specify the type for baoLoi

    useEffect(() => {
        DanhGiaInfoNguoiDungTheoMaDanhGia(maDanhGia)
            .then(
                danhGiaInfo => {
                    setDanhGiaInfo(danhGiaInfo);
                    setDangTaiDuLieu(false);
                }
            )
            .catch(
                (error) => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
    }, [maDanhGia]);
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

    return (
        <div className="container mt-2 mb-2 text-center">
        <h4>Đánh giá sản phẩm: </h4>
        {danhGiaInfo.map((danhGiaIn5, index) => (
<div key={index} className="row">
    <div className="col-4 text-end">
        <p>{danhGiaIn5.maNguoiDung}</p>
    </div>
    console.log("ma danh gia",{danhGiaIn5.maNguoiDung} )

</div>
))}


    </div>
);
}

export default DanhGiaInfo;
