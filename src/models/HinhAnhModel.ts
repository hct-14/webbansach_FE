class HinhAnhModel{
    maHinhAnh: string;
    tenHinhAnh?: string;
    laIcon?:boolean;
    duongDan?:string;
    duLieuAnh?:string;


constructor(maHinhAnh:string, tenHinhAnh:string, laIcon:boolean, duongDan:string, duLieuAnh:string){
    this.maHinhAnh=maHinhAnh;
    this.tenHinhAnh=tenHinhAnh;
    this.laIcon=laIcon;
    this.duongDan=duongDan;
    this.duLieuAnh=duLieuAnh;
}
}
export default HinhAnhModel;
