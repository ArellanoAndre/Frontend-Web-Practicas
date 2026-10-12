import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { Rol, Usuario, PayloadJwt } from './dominio/usuario';
import { USUARIO_REPOSITORY } from './dominio/usuario.repository';
import type { UsuarioRepository } from './dominio/usuario.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarios: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registrar(dto: RegistroDto) {
    const email = dto.email.trim().toLowerCase();

    const existente = await this.usuarios.buscarPorEmail(email);

    if (existente) {
      throw new ConflictException('El correo ya está registrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const usuario = await this.usuarios.crear({
      nombre: dto.nombre.trim(),
      email,
      passwordHash,
      rol: Rol.miembro,
    });

    return this.usuarioPublico(usuario);
  }

  async login(dto: LoginDto): Promise<TokenDto> {
    const email = dto.email.trim().toLowerCase();
    const usuario = await this.usuarios.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordValido = await bcrypt.compare(
      dto.password,
      usuario.passwordHash,
    );

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload: PayloadJwt = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }

  async obtenerPerfil(id: number) {
    const usuario = await this.usuarios.buscarPorId(id);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return this.usuarioPublico(usuario);
  }

  private usuarioPublico(usuario: Usuario) {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };
  }
}

