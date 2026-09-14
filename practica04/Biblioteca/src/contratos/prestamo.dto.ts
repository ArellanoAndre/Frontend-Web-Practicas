import type { Prestamo } from '../dominio/prestamo.entity.js';

// DTO de la petición que recibe la API
export interface CrearPrestamoRequestDto {
  libroId: string;
  socioId: string;
  ejemplares: number[];
}

// DTO de la respuesta que entrega la API
export interface PrestamoResponseDto {
  folio: string;
  libroId: string;
  ejemplares: number[];
  socioId: string;
  estado: Prestamo['estado'];
  creadoEn: string;
}

// DTO utilizado para responder errores
export interface ErrorResponseDto {
  error: string;
  errores?: string[];
}

// Convierte la entidad Prestamo en un DTO público
export function aPrestamoResponseDto(
  prestamo: Prestamo
): PrestamoResponseDto {
  return {
    folio: prestamo.folio,
    libroId: prestamo.libroId,
    ejemplares: prestamo.ejemplares,
    socioId: prestamo.socioId,
    estado: prestamo.estado,
    creadoEn: prestamo.creadoEn.toISOString()
  };
}