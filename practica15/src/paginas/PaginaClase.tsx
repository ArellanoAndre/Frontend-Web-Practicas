import { Link, useNavigate, useParams } from 'react-router-dom';
import { useClase } from '../hooks/useClase.ts';
import { urlImagen } from '../servicios/api.ts';

export function PaginaClase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clase, cargando, error } = useClase(id);

  if (cargando) return <div className="cargando">Cargando clase...</div>;

  if (error || !clase) {
    return (
      <div className="error">
        <p>{error ?? 'Clase no encontrada.'}</p>
        <Link className="boton" to="/clases">Volver a clases</Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/clases" className="detalle__volver">
        ← Todas las clases
      </Link>

      <article className="detalle">
        <img
          className="detalle__imagen"
          src={urlImagen(clase.imagen)}
          alt={clase.nombre}
        />

        <div className="detalle__datos">
          <span className={`etiqueta etiqueta--${clase.categoria}`}>
            {clase.categoria}
          </span>

          <h1>{clase.nombre}</h1>

          <p className="pagina__bajada">
            {clase.descripcion} · {clase.duracionMin} min
          </p>

          <h2>Horarios</h2>

          <ul className="horarios">
            {clase.horarios.map((h) => (
              <li className="horario" key={h.id}>
                <div>
                  <div className="horario__dia">
                    {h.dia} · {h.horaInicio}
                  </div>
                  <div className="horario__meta">
                    {h.entrenador} · {h.disponibles} de {h.cupoMaximo} lugares
                  </div>
                </div>

                {h.disponibles === 0 ? (
                  <span className="horario__lleno">Lleno</span>
                ) : (
                  <button
                    className="boton boton--chico"
                    onClick={() => navigate('/entrar')}
                  >
                    Inscribirme
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
