import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';

function App() {

  layToanBoSach().then().catch();
  return (
    <div className="App">
      
      <div>
        <Navbar />
      <HomePage />

        <Footer />
      </div>


    </div>
  );
}

export default App;
