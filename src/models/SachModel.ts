class SachModel {

    maSach: number;
    tenSach?: string;
    giaNiemYet?: number; 
    giaBan?: number; 

    moTa?: string;
    soLuong?: number; 
    tenTacGia?: string;
    trungBinhXepHang?: number;
    
    constructor(maSach: number,tenSach?: string,giaNiemYet?: number,giaBan?:number, moTa?: string,soLuong?: number,tenTacGia?: string, trungBinhXepHang?: number,
    ){
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.giaNiemYet = giaNiemYet;
        this.giaBan=giaBan;
        this.moTa = moTa;
        this.soLuong = soLuong;
        this.tenTacGia = tenTacGia;
        this.trungBinhXepHang = trungBinhXepHang;
    }
}

export default SachModel;
