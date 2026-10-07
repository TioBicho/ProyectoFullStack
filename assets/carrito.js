let tasaDescuento = 0;

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('cart_items')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('cart_items', JSON.stringify(carrito));
  // Funcion global definida en app.js para actualizar contador Cart (n)
  if (typeof actualizarContadorCart === 'function') {
    actualizarContadorCart();
  }
}

function renderizarCarrito() {
  const contenedor = document.getElementById('lista-carrito');
  const carrito = obtenerCarrito();

  // Caso: Carrito Vacio
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="card-gamer p-5 text-center border border-secondary rounded-3">
        <i class="bi bi-cart-x display-2 text-secondary"></i>
        <h3 class="text-white mt-3">Tu carrito está vacío</h3>
        <p class="text-secondary">Parece que aún no has agregado periféricos o juegos a tu compra.</p>
        <a href="index.html#catalogo" class="btn btn-outline-primary mt-3 px-4 fw-bold">
          <i class="bi bi-arrow-left me-1"></i> Volver al Catálogo
        </a>
      </div>
    `;
    actualizarTotales(0);
    return;
  }

  // Caso: Con items
  contenedor.innerHTML = '';
  carrito.forEach(prod => {
    const subtotalItem = prod.precio * prod.cantidad;
    const itemHTML = `
      <article class="card-gamer p-3 mb-3 border border-secondary rounded-3 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
        <div class="d-flex align-items-center gap-3">
          <img src="${prod.img}" alt="${prod.nombre}" class="rounded" style="width: 85px; height: 85px; object-fit: cover;">
          <div>
            <h3 class="h6 text-white mb-1">${prod.nombre}</h3>
            <span class="badge bg-secondary mb-1">${prod.categoria}</span>
            <div class="text-secondary small">$${prod.precio.toLocaleString('es-CL')} CLP c/u</div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <!-- Controles de Cantidad -->
          <div class="d-flex align-items-center border border-secondary rounded overflow-hidden">
            <button class="btn btn-sm btn-dark text-white px-2" onclick="cambiarCantidad('${prod.id}', -1)">
              <i class="bi bi-dash"></i>
            </button>
            <span class="px-3 fw-bold text-white">${prod.cantidad}</span>
            <button class="btn btn-sm btn-dark text-white px-2" onclick="cambiarCantidad('${prod.id}', 1)">
              <i class="bi bi-plus"></i>
            </button>
          </div>

          <!-- Total de este producto -->
          <div class="text-end" style="min-width: 110px;">
            <span class="fs-5 fw-bold text-info">$${subtotalItem.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </article>
    `;
    contenedor.innerHTML += itemHTML;
  });

  const subtotalTotal = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
  actualizarTotales(subtotalTotal);
}

function cambiarCantidad(id, cambio) {
  let carrito = obtenerCarrito();
  const producto = carrito.find(p => p.id === id);

  if (!producto) return;

  producto.cantidad += cambio;

  // Si la cantidad llega a 0 se elimina de la lista
  if (producto.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

function actualizarTotales(subtotal) {
  const descuento = subtotal * tasaDescuento;
  const total = Math.max(0, subtotal - descuento);

  document.getElementById('subtotal-monto').textContent = `$${subtotal.toLocaleString('es-CL')} CLP`;
  document.getElementById('total-monto').textContent = `$${Math.round(total).toLocaleString('es-CL')} CLP`;

  const filaDescuento = document.getElementById('fila-descuento');
  const descuentoMonto = document.getElementById('descuento-monto');

  if (tasaDescuento > 0 && subtotal > 0) {
    filaDescuento.style.setProperty('display', 'flex', 'important');
    descuentoMonto.textContent = `-$${Math.round(descuento).toLocaleString('es-CL')} CLP`;
  } else {
    filaDescuento.style.setProperty('display', 'none', 'important');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();

  // Validacion de Cupon de Descuento
  const btnCupon = document.getElementById('btn-aplicar-cupon');
  btnCupon.addEventListener('click', () => {
    const inputCupon = document.getElementById('cuponInput');
    const codigo = inputCupon.value.trim().toUpperCase();
    const errorMsg = document.getElementById('error-cupon');
    const exitoMsg = document.getElementById('exito-cupon');

    errorMsg.textContent = '';
    exitoMsg.textContent = '';

    if (!codigo) {
      errorMsg.textContent = 'Ingrese un código de cupón.';
      return;
    }

    if (codigo === 'DUOC20') {
      tasaDescuento = 0.20;
      exitoMsg.textContent = '¡Cupón DUOC20 aplicado con éxito (20% de descuento)!';
      renderizarCarrito();
    } else {
      tasaDescuento = 0;
      errorMsg.textContent = 'El cupón ingresado no es válido o está vencido.';
      renderizarCarrito();
    }
  });

  // Boton pagar
  const btnPagar = document.getElementById('btn-pagar');
  btnPagar.addEventListener('click', () => {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      alert('Error: No puedes realizar el pago porque el carrito no tiene productos.');
      return;
    }

    alert('¡Pago realizado con éxito! Gracias por tu compra en Level-Up Gamer.');
    localStorage.removeItem('cart_items');
    tasaDescuento = 0;
    guardarCarrito([]);
    renderizarCarrito();
  });
});