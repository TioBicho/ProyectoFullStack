// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ currentUser, onLogout }) {
  const { totalCartCount } = useCart();

  return (
    <header className="py-3 sticky-top top-header">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        {/* Logotipo */}
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none text-white brand-font fs-4"
        >
          <i className="bi bi-controller text-primary fs-3"></i>
          <span>LEVEL-UP <span className="text-success">GAMER</span></span>
        </Link>

        {/* Navegación */}
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link px-3 text-white" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3 text-white" href="#catalogo">Productos</a>
            </li>
            {currentUser ? (
              <li className="nav-item">
                <button
                  onClick={onLogout}
                  className="btn btn-link nav-link px-3 text-success text-decoration-none"
                  id="nav-user"
                >
                  Hola, {currentUser.nombre ? currentUser.nombre.split(' ')[0] : 'Usuario'} (Salir)
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link px-3 text-white" to="/login" id="nav-user">
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Carrito */}
        <div>
          <Link to="/carrito" className="btn btn-outline-light d-flex align-items-center gap-2">
            <i className="bi bi-cart3"></i>
            <span>Cart (<span id="cart-count">{totalCartCount}</span>)</span>
          </Link>
        </div>
      </div>
    </header>
  );
}