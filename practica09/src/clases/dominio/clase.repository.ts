export interface Clase {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export interface ClaseRepository {
  listar(): Promise<Clase[]>;
  crear(nombre: string): Promise<Clase>;
}