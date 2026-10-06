import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

import {
  ErrorDominio,
  HorarioNoEncontradoError,
  MiembroNoEncontradoError,
  CupoLlenoError,
  InscripcionDuplicadaError,
} from '../inscripciones/dominio/errores';

@Catch(ErrorDominio)
export class ErrorDominioFilter implements ExceptionFilter {
  catch(exception: ErrorDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      exception instanceof HorarioNoEncontradoError ||
      exception instanceof MiembroNoEncontradoError
    ) {
      status = HttpStatus.NOT_FOUND;
    }

    if (
      exception instanceof CupoLlenoError ||
      exception instanceof InscripcionDuplicadaError
    ) {
      status = HttpStatus.CONFLICT;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
