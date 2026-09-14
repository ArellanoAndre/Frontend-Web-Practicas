import express from 'express';

import type {
  NextFunction,
  Request,
  Response
} from 'express';

import { InMemoryPrestamoRepository } from '../infra/in-memory-prestamo.repository.js';
import { PrestamoService } from '../servicios/prestamo.service.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

import {
  aPrestamoResponseDto
} from '../contratos/prestamo.dto.js';

import {
  validarCrearPrestamo,
  ValidacionError
} from './validar.js';

const app = express();

app.use(express.json());
app.use(express.static('publico'));

const repositorio = new InMemoryPrestamoRepository();
const servicio = new PrestamoService(repositorio);

// GET /api/prestamos?libroId=LIB-0417
app.get('/api/prestamos', async (req, res) => {
  const libroId = req.query.libroId;

  if (
    typeof libroId !== 'string' ||
    libroId.trim() === ''
  ) {
    return res.status(400).json({
      error: 'El parametro libroId es obligatorio'
    });
  }

  const prestamos =
    await servicio.listarPorLibro(libroId);

  return res.status(200).json(
    prestamos.map(aPrestamoResponseDto)
  );
});

// POST /api/prestamos
app.post('/api/prestamos', async (req, res) => {
  const cuerpo: unknown = req.body;

  const datos =
    validarCrearPrestamo(cuerpo);

  const prestamo =
    await servicio.crear(datos);

  const respuesta =
    aPrestamoResponseDto(prestamo);

  return res
    .location(`/api/prestamos/${prestamo.folio}`)
    .status(201)
    .json(respuesta);
});

// Middleware de errores
app.use(
  (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (error instanceof ValidacionError) {
      return res.status(400).json({
        error: error.message,
        errores: error.errores
      });
    }

    if (error instanceof EjemplarPrestadoError) {
      return res.status(409).json({
        error: error.message
      });
    }

    console.error(error);

    return res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
);

app.listen(3000, () => {
  console.log(
    'Servidor iniciado en http://localhost:3000'
  );
});


