import type { Miembro } from './entidades';

export interface MiembroRepository {
  listar(): Promise<Miembro[]>;

  buscarPorId(id: number): Promise<Miembro | null>;

  crear(datos: {
    nombre: string;
    correo: string;
    membresia: string;
  }): Promise<Miembro>;

  actualizar(
    id: number,
    datos: {
      nombre?: string;
      correo?: string;
      membresia?: string;
      activo?: boolean;
    },
  ): Promise<Miembro | null>;

  eliminar(id: number): Promise<boolean>;
}