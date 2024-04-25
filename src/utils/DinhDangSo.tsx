function dinhDangSo(x:number | undefined){
    if(x===undefined){
        return 0;
    }if(isNaN(x)){
        return 0;
    }
    //su dung ham tolocaleString de dinh dang so
    return x.toLocaleString("vn-VN");
}

export default dinhDangSo;