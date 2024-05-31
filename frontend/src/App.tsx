import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import ListaLibros from './components/ListaLibros';
import AgregarLibro from './components/AgregarLibro';

function App() {
  return (
    <Router>
      <div className="">
        <Navegacion />
        <div className='container p-4'>
          <Routes>
            <Route path="/" element={<ListaLibros />} />
            <Route path="/AgregarLibro" element={<AgregarLibro />} />
            <Route path="/edit/:id" element={<AgregarLibro />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;