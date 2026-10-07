// src/pages/Home.jsx
import { PRODUCTOS } from '../data/productos';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { agregarAlCarrito } = useCart();

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert('¡Gracias por suscribirte!');
    e.target.reset();
  };

  return (
    <>
      <main className="container my-5">
        {/* Portada (Hero) a 2 Columnas */}
        <section className="row align-items-center py-4 mb-5 hero-section">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold mb-3 text-white brand-font">TIENDA ONLINE GAMER</h1>
            <p className="lead text-secondary mb-4">
              Equípate con el mejor hardware, accesorios de alto rendimiento y sillas ergonómicas en Chile. Sube de nivel tu experiencia de juego.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <img
              src="/imagenes/foto principal.jpg"
              alt="Setup gamer profesional con iluminación RGB de Level-Up Gamer"
              className="img-fluid rounded-3 border border-secondary shadow"
            />
          </div>
        </section>

        {/* Catálogo de Productos dinámico con .map() */}
        <section id="catalogo" className="my-5 pt-3">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white brand-font">Catálogo Destacado</h2>
            <p className="text-secondary">Selección oficial de productos para potenciar tu juego</p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {PRODUCTOS.map((prod) => (
              <div className="col" key={prod.id}>
                <article className="card h-100 p-3 card-gamer d-flex flex-column justify-content-between">
                  <img
                    src={prod.img}
                    alt={prod.nombre}
                    className="card-img-top rounded mb-3 foto-producto"
                  />
                  <div>
                    <h3 className="h6 text-white mb-2">{prod.nombre}</h3>
                    <p className="fs-5 fw-bold text-info mb-3">
                      ${prod.precio.toLocaleString('es-CL')} CLP
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => agregarAlCarrito(prod.id)}
                    className="btn btn-outline-primary w-100 fw-bold"
                  >
                    <i className="bi bi-cart-plus me-1"></i> Agregar
                  </button>
                </article>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer tal cual lo tenías */}
      <footer className="py-5 border-top border-secondary">
        <div className="container">
          <div className="row gy-4 align-items-start">
            <div className="col-12 col-md-4">
              <h4 className="brand-font text-white mb-2">LEVEL-UP GAMER</h4>
              <p className="text-secondary small">
                Tienda online especializada en hardware y accesorios gamer en Chile.
              </p>
            </div>

            <div className="col-12 col-md-4">
              <h5 className="text-white mb-3">Categorías</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#catalogo" className="text-secondary text-decoration-none">
                    Consolas & Computadores
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#catalogo" className="text-secondary text-decoration-none">
                    Periféricos & Accesorios
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#catalogo" className="text-secondary text-decoration-none">
                    Juegos de Mesa
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-4">
              <h5 className="text-secondary small">Suscríbete y recibe promociones exclusivas.</h5>
              <form className="d-flex gap-2" onSubmit={handleNewsletter}>
                <label htmlFor="newsletterEmail" className="visually-hidden">Correo electrónico</label>
                <input
                  type="email"
                  id="newsletterEmail"
                  className="form-control form-control-sm"
                  placeholder="Ingresa tu correo"
                  required
                />
                <button className="btn btn-success btn-sm px-3 fw-bold" type="submit">
                  Suscribir
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}