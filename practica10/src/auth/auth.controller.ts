import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { Publico } from './decoradores/publico.decorator';
import { UsuarioActual } from './decoradores/usuario-actual.decorator';
import type { PayloadJwt } from './dominio/usuario';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Publico()
  @Post('registro')
  async registrar(@Body() dto: RegistroDto) {
    return this.authService.registrar(dto);
  }

  @Publico()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth('JWT')
  @Get('yo')
  async obtenerPerfil(@UsuarioActual() usuario: PayloadJwt) {
    return this.authService.obtenerPerfil(usuario.sub);
  }
}

