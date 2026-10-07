// Dataset de regiones y comunas chilenas (cumple con mínimo 3 regiones y 2 comunas c/u)
const REGIONES_DATA = {
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
  "Región Metropolitana": ["Santiago", "Providencia", "Las Condes", "Ñuñoa"],
  "Región del Biobío": ["Concepción", "Talcahuano", "San Pedro de la Paz"]
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');

  // Poblar Select de Regiones
  Object.keys(REGIONES_DATA).forEach(reg => {
    const opt = document.createElement('option');
    opt.value = reg;
    opt.textContent = reg;
    selectRegion.appendChild(opt);
  });

  // Evento dependiente: Cargar comunas al elegir region
  selectRegion.addEventListener('change', () => {
    selectComuna.innerHTML = '<option value="">Seleccione su comuna</option>';
    const regionSeleccionada = selectRegion.value;

    if (regionSeleccionada && REGIONES_DATA[regionSeleccionada]) {
      selectComuna.disabled = false;
      REGIONES_DATA[regionSeleccionada].forEach(com => {
        const opt = document.createElement('option');
        opt.value = com;
        opt.textContent = com;
        selectComuna.appendChild(opt);
      });
    } else {
      selectComuna.disabled = true;
    }
  });

  // Validaciones al presionar submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let esValido = true;

    // Limpiar mensajes de error previos
    document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');

    // Captura de valores
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const confirmarCorreo = document.getElementById('confirmarCorreo').value.trim();
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const telefono = document.getElementById('telefono').value.trim();
    const region = selectRegion.value;
    const comuna = selectComuna.value;

    // 1. Validacion de Nombre
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombre) {
      document.getElementById('error-nombre').textContent = 'El nombre completo es obligatorio.';
      esValido = false;
    } else if (nombre.length > 50) {
      document.getElementById('error-nombre').textContent = 'El nombre no puede superar los 50 caracteres.';
      esValido = false;
    } else if (!regexNombre.test(nombre)) {
      document.getElementById('error-nombre').textContent = 'El nombre sólo debe contener letras y espacios.';
      esValido = false;
    }

    // 2. Validacion de Correo 
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usuariosRegistrados = JSON.parse(localStorage.getItem('users')) || [];

    if (!correo) {
      document.getElementById('error-correo').textContent = 'El correo electrónico es obligatorio.';
      esValido = false;
    } else if (!regexEmail.test(correo)) {
      document.getElementById('error-correo').textContent = 'Ingrese un formato de correo válido (ej: usuario@mail.com).';
      esValido = false;
    } else {
      const existe = usuariosRegistrados.some(u => u.correo.toLowerCase() === correo.toLowerCase());
      if (existe) {
        document.getElementById('error-correo').textContent = 'Este correo ya se encuentra registrado.';
        esValido = false;
      }
    }

    // 3. Validacion de Confirmar Correo
    if (!confirmarCorreo) {
      document.getElementById('error-confirmarCorreo').textContent = 'Debe confirmar su correo.';
      esValido = false;
    } else if (correo !== confirmarCorreo) {
      document.getElementById('error-confirmarCorreo').textContent = 'Los correos ingresados no coinciden.';
      esValido = false;
    }

    // 4. Validacion de Contraseña
    // Mínimo 8 car, 1 mayús, 1 minús, 1 num y 1 símbolo (@#$!%*?&.)
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&.])[A-Za-z\d@#$!%*?&.]{8,}$/;
    if (!password) {
      document.getElementById('error-password').textContent = 'La contraseña es obligatoria.';
      esValido = false;
    } else if (!regexPass.test(password)) {
      document.getElementById('error-password').textContent = 'Debe tener mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.';
      esValido = false;
    }

    // 5. Validacion de Confirmar Contraseña
    if (!confirmarPassword) {
      document.getElementById('error-confirmarPassword').textContent = 'Debe confirmar su contraseña.';
      esValido = false;
    } else if (password !== confirmarPassword) {
      document.getElementById('error-confirmarPassword').textContent = 'Las contraseñas no coinciden.';
      esValido = false;
    }

    // 6. Validacion de Teléfono (opcional, móvil chileno)
    const regexTel = /^(\+?56\s?9\s?\d{4}\s?\d{4}|9\d{8})$/;
    if (telefono !== '') {
      const telLimpio = telefono.replace(/\s+/g, '');
      if (!regexTel.test(telLimpio)) {
        document.getElementById('error-telefono').textContent = 'Formato inválido. Ejemplo: +56 9 1234 5678 o 912345678.';
        esValido = false;
      }
    }

    // 7. Validacion de Región y Comuna
    if (!region) {
      document.getElementById('error-region').textContent = 'Debe seleccionar una región.';
      esValido = false;
    }
    if (!comuna) {
      document.getElementById('error-comuna').textContent = 'Debe seleccionar una comuna.';
      esValido = false;
    }

    // Si todo es valido persistir en localStorage y redirigir
    if (esValido) {
      const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        password: password,
        telefono: telefono || 'No especificado',
        region: region,
        comuna: comuna
      };

      usuariosRegistrados.push(nuevoUsuario);
      localStorage.setItem('users', JSON.stringify(usuariosRegistrados));

      alert('¡Usuario registrado exitosamente!');
      window.location.href = 'login.html';
    }
  });
});