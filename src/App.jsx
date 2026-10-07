// src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    if (confirm('¿Deseas cerrar sesión?')) {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      window.location.reload();
    }
  };

  return (
    <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </CartProvider>
  );
}