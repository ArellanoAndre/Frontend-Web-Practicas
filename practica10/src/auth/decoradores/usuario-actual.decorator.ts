import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { PayloadJwt } from '../dominio/usuario';

export const UsuarioActual = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PayloadJwt => {
    const request = ctx.switchToHttp().getRequest<{
      user: PayloadJwt;
    }>();

    return request.user;
  },
);
