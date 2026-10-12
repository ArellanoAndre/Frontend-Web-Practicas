
export enum Rol {
  miembro = 'miembro',
  entrenador = 'entrenador',
  admin = 'admin',
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: Rol;
}

export interface NuevoUsuario {
  nombre: string;
  email: string;
  passwordHash: string;
  rol: Rol;
}

export interface PayloadJwt {
  sub: number;
  email: string;
  rol: Rol;
}
