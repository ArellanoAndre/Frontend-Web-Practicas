
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import {
  NuevoUsuario,
  Rol,
  Usuario,
} from '../dominio/usuario';

import { UsuarioRepository } from '../dominio/usuario.repository';

@Injectable()
export class UsuarioMemoriaRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Karla',
      email: 'karla@itson.mx',
      passwordHash: bcrypt.hashSync('gimnasio2026', 10),
      rol: Rol.miembro,
    },
    {
      id: 2,
      nombre: 'Ana',
      email: 'ana@itson.mx',
      passwordHash: bcrypt.hashSync('gimnasio2026', 10),
      rol: Rol.entrenador,
    },
    {
      id: 3,
      nombre: 'Administrador',
      email: 'admin@itson.mx',
      passwordHash: bcrypt.hashSync('gimnasio2026', 10),
      rol: Rol.admin,
    },
  ];

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.usuarios.find((usuario) => usuario.id === id) ?? null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return (
      this.usuarios.find(
        (usuario) => usuario.email === email.toLowerCase(),
      ) ?? null
    );
  }

  async crear(datos: NuevoUsuario): Promise<Usuario> {
    const siguienteId =
      Math.max(0, ...this.usuarios.map((usuario) => usuario.id)) + 1;

    const nuevoUsuario: Usuario = {
      id: siguienteId,
      ...datos,
    };

    this.usuarios.push(nuevoUsuario);

    return nuevoUsuario;
  }
}
