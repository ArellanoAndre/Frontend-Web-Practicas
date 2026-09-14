import type {
  CrearPrestamoRequestDto
} from '../contratos/prestamo.dto.js';

export class ValidacionError extends Error {
  constructor(public readonly errores: string[]) {
    super('La peticion contiene datos invalidos');
    this.name = 'ValidacionError';
  }
}

export function validarCrearPrestamo(
  dato: unknown
): CrearPrestamoRequestDto {
  const errores: string[] = [];

  if (
    typeof dato !== 'object' ||
    dato === null ||
    Array.isArray(dato)
  ) {
    throw new ValidacionError([
      'El cuerpo de la peticion debe ser un objeto'
    ]);
  }

  const valor = dato as Record<string, unknown>;

  if (
    typeof valor.libroId !== 'string' ||
    valor.libroId.trim() === ''
  ) {
    errores.push('libroId es obligatorio');
  }

  if (
    typeof valor.socioId !== 'string' ||
    valor.socioId.trim() === ''
  ) {
    errores.push('socioId es obligatorio');
  }

  if (!Array.isArray(valor.ejemplares)) {
    errores.push('ejemplares debe ser un arreglo');
  } else {
    if (valor.ejemplares.length === 0) {
      errores.push(
        'Debe indicar al menos un ejemplar'
      );
    }

    if (
      !valor.ejemplares.every(
        ejemplar =>
          typeof ejemplar === 'number' &&
          Number.isInteger(ejemplar)
      )
    ) {
      errores.push(
        'Todos los ejemplares deben ser numeros enteros'
      );
    }
  }

  if (errores.length > 0) {
    throw new ValidacionError(errores);
  }

  return {
    libroId: valor.libroId as string,
    socioId: valor.socioId as string,
    ejemplares: valor.ejemplares as number[]
  };
}