import { AuthModule } from './auth/auth.module';

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClasesModule } from './clases/clases.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { PeticionIdMiddleware } from './comun/middleware/peticion-id.middleware';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ClasesModule,
    InscripcionesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PeticionIdMiddleware).forRoutes('*');
  }
}

