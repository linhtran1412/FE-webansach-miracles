import React from 'react';
import logo from './logo.svg';
import './App.css';
import NarBar from "./layouts/header-footer/NarBar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homePage/hompage";

function App() {
  return (
    <div className="App">
       <NarBar/>
        <HomePage/>
        <Footer/>
    </div>
  );
}

export default App;
