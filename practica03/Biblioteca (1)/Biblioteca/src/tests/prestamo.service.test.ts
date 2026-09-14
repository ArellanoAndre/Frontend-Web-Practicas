import test from 'node:test';
import assert from 'node:assert/strict';

import { PrestamoService } from '../servicios/prestamo.service.js';
import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

test('camino feliz: crea un prestamo', async () => {
  const repositorio = new InMemoryPrestamoRepository();
  const servicio = new PrestamoService(repositorio);

  const prestamo = await servicio.crear({
    libroId: 'LIB-0417',
    socioId: 'S-001',
    ejemplares: [14, 15]
  });

  assert.equal(prestamo.libroId, 'LIB-0417');
  assert.equal(prestamo.socioId, 'S-001');
  assert.deepEqual(prestamo.ejemplares, [14, 15]);
  assert.equal(prestamo.estado, 'activo');
});

test('ejemplar duplicado: lanza error de dominio', async () => {
  const repositorio = new InMemoryPrestamoRepository();
  const servicio = new PrestamoService(repositorio);

  await servicio.crear({
    libroId: 'LIB-0417',
    socioId: 'S-001',
    ejemplares: [14, 15]
  });

  await assert.rejects(
    async () => {
      await servicio.crear({
        libroId: 'LIB-0417',
        socioId: 'S-002',
        ejemplares: [15, 16]
      });
    },
    (error: unknown) => {
      return (
        error instanceof EjemplarPrestadoError &&
        error.ejemplar === 15
      );
    }
  );
});