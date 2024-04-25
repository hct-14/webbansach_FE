import React, { useState } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import Navbar from './layouts/Navbar';
import HomePage from './homepage/HomePage';
import Footer from './layouts/Footer';
import ChiTietSanPham from './product/ChiTietSanPham';
import DangKyNguoiDung from './user/DangKyNguoiDung';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar tuKhoaTimKiem={tuKhoaTimKiem}  setTuKhoaTimKiem={setTuKhoaTimKiem}/>
        <Routes>
             <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
             <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
             <Route path='/about' element={<About />} />
             <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
             <Route path='/dangky' element={<DangKyNguoiDung />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;