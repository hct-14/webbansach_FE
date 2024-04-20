import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './models/layouts/about/About';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  // layToanBoSach().then().catch();
  return (
    <div className="App">
      
      <div>
        <BrowserRouter >
        <Navbar tuKhoaTimKiem = {tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />

        <Routes >    
        <Route path='/' element={<HomePage tuKhoaTimKiem = {tuKhoaTimKiem}   />}  />
        <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem = {tuKhoaTimKiem}   />}  />

        <Route path='/about' element={<About  />}  />


      </Routes>
        <Footer />
        </BrowserRouter>
      </div>

 
    </div>
  );
}

export default App;