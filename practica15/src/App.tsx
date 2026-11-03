import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './componentes/Layout.tsx';
import { NoEncontrado } from './componentes/NoEncontrado.tsx';
import { PaginaClases } from './paginas/PaginaClases.tsx';
import { PaginaClase } from './paginas/PaginaClase.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/clases" replace />} />
          <Route path="/clases" element={<PaginaClases />} />
          <Route path="/clases/:id" element={<PaginaClase />} />
          <Route path="/entrar" element={
            <section className="vacio">
              <h1>Iniciar sesión</h1>
              <p>El inicio de sesión se implementará en la siguiente práctica.</p>
            </section>
          } />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
