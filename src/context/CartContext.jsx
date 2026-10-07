// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTOS } from '../data/productos';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart_items')) || [];
    } catch {
      return [];
    }
  });

  // Guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(carrito));
  }, [carrito]);

  // Equivalente a tu función agregarAlCarrito(productoId) de app.js
  const agregarAlCarrito = (productoId) => {
    const prodEncontrado = PRODUCTOS.find((p) => p.id === productoId);
    if (!prodEncontrado) {
      alert('Producto no encontrado');
      return;
    }

    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === productoId);
      if (existente) {
        return prev.map((item) =>
          item.id === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...prodEncontrado, cantidad: 1 }];
    });

    alert(`"${prodEncontrado.nombre}" agregado al carrito.`);
  };

  // Para carrito.html más adelante
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  // Contador total idéntico al reduce() de tu app.js
  const totalCartCount = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, cambiarCantidad, vaciarCarrito, totalCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);