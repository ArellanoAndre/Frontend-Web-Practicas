type Categoria = "todas" | "calzado" | "ropa" | "accesorios";

interface FiltrosProps {
  activa: Categoria;
  onCambiar: (categoria: Categoria) => void;
}

const categorias: Categoria[] = [
  "todas",
  "calzado",
  "ropa",
  "accesorios",
];

export function Filtros({ activa, onCambiar }: FiltrosProps) {
  return (
    <nav className="filtros">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          className={
            activa === categoria
              ? "filtros__boton filtros__boton--activo"
              : "filtros__boton"
          }
          onClick={() => onCambiar(categoria)}
        >
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </button>
      ))}
    </nav>
  );
}
