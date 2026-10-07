document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorCorreo = document.getElementById('error-correo');
  const errorPass = document.getElementById('error-password');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar errores previos
    errorCorreo.textContent = '';
    errorPass.textContent = '';

    const correoInput = document.getElementById('correo').value.trim();
    const passInput = document.getElementById('password').value;

    let esValido = true;

    // 1. Campo Correo obligatorio y con formato
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoInput) {
      errorCorreo.textContent = 'El correo electrónico es obligatorio.';
      esValido = false;
    } else if (!regEmail.test(correoInput)) {
      errorCorreo.textContent = 'Ingrese un formato de correo válido.';
      esValido = false;
    }

    // Campo Contraseña obligatorio
    if (!passInput) {
      errorPass.textContent = 'La contraseña es obligatoria.';
      esValido = false;
    }

    if (!esValido) return;

    // Comprobar con localStorage 
    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioEncontrado = usuarios.find(
      u => u.correo.toLowerCase() === correoInput.toLowerCase()
    );

    // error cuenta inexistente
    if (!usuarioEncontrado) {
      errorCorreo.textContent = 'No existe una cuenta registrada con este correo.';
      return;
    }

    // error contraseña incorrecta
    if (usuarioEncontrado.password !== passInput) {
      errorPass.textContent = 'La contraseña ingresada es incorrecta.';
      return;
    }

    // Autenticacion correcta: Guardar sesión activa en localStorage
    localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));
    alert(`¡Bienvenido de vuelta, ${usuarioEncontrado.nombre}!`);
    window.location.href = 'index.html';
  });
});