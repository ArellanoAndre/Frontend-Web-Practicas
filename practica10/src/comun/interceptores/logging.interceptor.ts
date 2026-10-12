
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const inicio = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duracion = Date.now() - inicio;
          this.logger.log(
            `${req.method} ${req.originalUrl} - ${duracion}ms`,
          );
        },
      }),
    );
  }
}
