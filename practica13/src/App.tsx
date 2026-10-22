import { useState } from "react";
import { Layout } from "./Layout";
import { Encabezado } from "./Encabezado";
import { PiePagina } from "./PiePagina";
import { Catalogo } from "./Catalogo";
import { Filtros } from "./Filtros";
import { productos } from "./datos";
import type { Producto } from "./datos";

type Categoria = "todas" | "calzado" | "ropa" | "accesorios";

export default function App() {
  const [categoria, setCategoria] = useState<Categoria>("todas");
  const [carrito, setCarrito] = useState<Producto[]>([]);

  function agregarProducto(producto: Producto) {
    setCarrito((anterior) => [...anterior, producto]);
  }

  const productosFiltrados =
    categoria === "todas"
      ? productos
      : productos.filter((producto) => producto.categoria === categoria);

  const piezas = carrito.length;

  const total = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio,
    0
  );

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de Temporada</h1>
        <p>Encuentra tus productos deportivos favoritos.</p>
      </section>

      <Filtros activa={categoria} onCambiar={setCategoria} />

      <Catalogo
        productos={productosFiltrados}
        onAgregar={agregarProducto}
      />
    </Layout>
  );
}
