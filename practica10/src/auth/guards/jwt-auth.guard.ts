import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ES_PUBLICO_KEY } from '../decoradores/publico.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const esPublico = this.reflector.getAllAndOverride<boolean>(
      ES_PUBLICO_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (esPublico) {
      return true;
    }

    return super.canActivate(context);
  }
}
