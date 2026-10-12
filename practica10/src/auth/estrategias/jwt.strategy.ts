import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { PayloadJwt } from '../dominio/usuario';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secreto = process.env.JWT_SECRET;

    if (!secreto) {
      throw new Error('Falta JWT_SECRET en el archivo .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secreto,
    });
  }

  validate(payload: PayloadJwt): PayloadJwt {
    return payload;
  }
}
