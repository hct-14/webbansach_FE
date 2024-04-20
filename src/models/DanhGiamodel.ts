class DanhGiaModel {
    maDanhGia: number;
    diemXepHang: number;
    nhanXet: string;
    maNguoiDung: number;

    constructor(
        maDanhGia: number,
        diemXepHang: number,
        nhanXet: string,
        maNguoiDung: number,

    ) {
        this.maDanhGia = maDanhGia;
        this.diemXepHang = diemXepHang;
        this.nhanXet = nhanXet;
        this.maNguoiDung = maNguoiDung;

    }
}

export default DanhGiaModel;