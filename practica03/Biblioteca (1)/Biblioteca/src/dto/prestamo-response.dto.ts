//  Este es lo que el sistema DEVUELVE. Fijense en lo que NO lleva:
//  `costoReposicion` se queda dentro. Ese es el punto del patron.
//
//  TODO:
//    1. Declarar PrestamoResponseDto con: folio, libroId, ejemplares,
//       socioId, estado y creadoEn como string (formato ISO).
//    2. Escribir la funcion `aResponseDto(p: Prestamo)` que convierte
//       la entidad en el DTO.
import type { Prestamo } from '../dominio/prestamo.entity.js';

export interface PrestamoResponseDto {
  folio: string;
  libroId: string;
  ejemplares: number[];
  socioId: string;
  estado: Prestamo['estado'];
  creadoEn: string;
}

export function aResponseDto(prestamo: Prestamo): PrestamoResponseDto {
  return {
    folio: prestamo.folio,
    libroId: prestamo.libroId,
    ejemplares: prestamo.ejemplares,
    socioId: prestamo.socioId,
    estado: prestamo.estado,
    creadoEn: prestamo.creadoEn.toISOString()
  };
}