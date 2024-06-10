import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaLibros from './pages/ListaLibros';
import AgregarLibro from './pages/AgregarLibro';
import BarraNavegacion from './components/BarraNavegacion';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setLoggedInUser(null); // Set logged-in user to null
  };
  return (
    <>
      <BarraNavegacion />
      <Router>
        <div className='container'>
          {loggedInUser ? (
            <div>
              <Routes>
                <Route path="/" element={<ListaLibros />} />
                <Route path="/AgregarLibro" element={<AgregarLibro />} />
                <Route path="/Login" element={<Login setLoggedInUser={setLoggedInUser} />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/edit/:id" element={<AgregarLibro />} />
              </Routes>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Register />
              <Login setLoggedInUser={setLoggedInUser} />
            </div>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;