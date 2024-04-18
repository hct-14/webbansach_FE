import React from "react";
import Banner from "./component/Banner";
import Carousel from "./component/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";



function HomePage(){
    return(
        <div>
            <Banner />
            <Carousel />
            <DanhSachSanPham />
        </div>
    );
}

export default HomePage;