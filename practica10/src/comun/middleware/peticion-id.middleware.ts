import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class PeticionIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const recibido = req.header('X-Request-Id');
    const peticionId = recibido || randomUUID();

    req.headers['x-request-id'] = peticionId;
    res.setHeader('X-Request-Id', peticionId);

    next();
  }
}