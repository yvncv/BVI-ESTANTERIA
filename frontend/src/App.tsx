import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaLibros from './components/ListaLibros';
import AgregarLibro from './components/AgregarLibro';
import BarraNavegacion from './components/BarraNavegacion';

function App() {
  return (
    <>
      <BarraNavegacion />
      <Router>
        <div className='container'>
          <Routes>
            <Route path="/" element={<ListaLibros />} />
            <Route path="/AgregarLibro" element={<AgregarLibro />} />
            <Route path="/edit/:id" element={<AgregarLibro />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;