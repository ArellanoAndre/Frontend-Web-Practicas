
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Request } from 'express';

@Injectable()
export class SobreInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const inicio = Date.now();

    return next.handle().pipe(
      map((data) => ({
        data,
        meta: {
          ruta: req.originalUrl,
          duracionMs: Date.now() - inicio,
          timestamp: new Date().toISOString(),
        },
      })),
    );
  }
}
