import { JwtStrategy } from './estrategias/jwt.strategy';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioPrismaRepository } from './datos/usuario-prisma.repository';
import { USUARIO_REPOSITORY } from './dominio/usuario.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioPrismaRepository,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}



