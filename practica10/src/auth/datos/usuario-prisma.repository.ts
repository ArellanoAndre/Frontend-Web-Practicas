import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NuevoUsuario, Rol, Usuario } from '../dominio/usuario';
import type { UsuarioRepository } from '../dominio/usuario.repository';

@Injectable()
export class UsuarioPrismaRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    return usuario ? this.convertir(usuario) : null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    return usuario ? this.convertir(usuario) : null;
  }

  async crear(datos: NuevoUsuario): Promise<Usuario> {
    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: datos.nombre,
        email: datos.email,
        passwordHash: datos.passwordHash,
        rol: datos.rol,
      },
    });

    return this.convertir(usuario);
  }

  private convertir(usuario: {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    rol: string;
  }): Usuario {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      passwordHash: usuario.passwordHash,
      rol: usuario.rol as Rol,
    };
  }
}
