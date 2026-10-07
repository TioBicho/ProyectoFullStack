// Catálogo oficial de 8 productos (Caso B: Level-Up Gamer)
const PRODUCTOS = [
  { id: 'JM001', nombre: 'Catan', categoria: 'Juegos de Mesa', precio: 29990, img: 'imagenes/catan.jpg' },
  { id: 'JM002', nombre: 'Carcassonne', categoria: 'Juegos de Mesa', precio: 24990, img: 'imagenes/carcassonne.jpg' },
  { id: 'AC001', nombre: 'Controlador Inalámbrico Xbox Series X', categoria: 'Accesorios', precio: 59990, img: 'imagenes/mando.jpg' },
  { id: 'AC002', nombre: 'Auriculares Gamer HyperX Cloud II', categoria: 'Accesorios', precio: 79990, img: 'imagenes/hyperxcloud2.jpg' },
  { id: 'CO001', nombre: 'PlayStation 5', categoria: 'Consolas', precio: 549990, img: 'imagenes/ps5.jpg' },
  { id: 'CG001', nombre: 'PC Gamer ASUS ROG Strix', categoria: 'Computadores', precio: 1299990, img: 'imagenes/asuspc.jpg' },
  { id: 'SG001', nombre: 'Silla Gamer Secretlab Titan', categoria: 'Sillas Gamers', precio: 349990, img: 'imagenes/silla.jpg' },
  { id: 'MS001', nombre: 'Mouse Gamer Logitech G502 HERO', categoria: 'Mouse', precio: 49990, img: 'imagenes/mouse.jpg' },
  { id: 'MP001', nombre: 'Mousepad Razer Goliathus', categoria: 'Mousepads', precio: 29990, img: 'imagenes/mousepad.jpg' }
];

// Obtener carrito desde localStorage
function getCarrito() {
  try {
    return JSON.parse(localStorage.getItem('cart_items')) || [];
  } catch (error) {
    return [];
  }
}

// Guardar carrito en localStorage
function saveCarrito(carrito) {
  localStorage.setItem('cart_items', JSON.stringify(carrito));
  actualizarContadorCart();
}

// Actualizar Cart (n) en el encabezado
function actualizarContadorCart() {
  const carrito = getCarrito();
  const total = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  const badges = document.querySelectorAll('#cart-count');
  badges.forEach(badge => {
    badge.textContent = total;
  });
}

// Agregar producto al carrito desde los botones "Agregar al carrito"
function agregarAlCarrito(productoId) {
  let carrito = getCarrito();
  const producto = PRODUCTOS.find(p => p.id === productoId);

  if (!producto) {
    alert('Producto no encontrado');
    return;
  }

  const existente = carrito.find(item => item.id === productoId);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      img: producto.img,
      cantidad: 1
    });
  }

  saveCarrito(carrito);
  alert(`"${producto.nombre}" agregado al carrito.`);
}

// Actualizar sesion si el usuario esta logueado
function actualizarMenuSesion() {
  try {
    const navUser = document.getElementById('nav-user');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && navUser) {
      const primerNombre = currentUser.nombre ? currentUser.nombre.split(' ')[0] : 'Usuario';
      navUser.textContent = `Hola, ${primerNombre}`;
      navUser.href = '#';

      navUser.onclick = (e) => {
        e.preventDefault();
        if (confirm('¿Deseas cerrar sesión?')) {
          localStorage.removeItem('currentUser');
          window.location.reload();
        }
      };
    }
  } catch (e) {
    console.error('Error al cargar sesión:', e);
  }
}

// Inicializacion
document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCart();
  actualizarMenuSesion();
});