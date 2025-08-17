import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/CSS/allPage.css'; 
import './components/CSS/characterPage.css';
import './components/CSS/navbar.css';


import HomePage from './components/pages/homePage';
import CharacterPage from './components/pages/characterPage';
import BestiaryPage from './components/pages/bestiaryPage';
import Navbar from './components/navBar/navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <header className="App-header">
          <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character" element={<CharacterPage />} />
        <Route path="/bestiary" element={<BestiaryPage />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
