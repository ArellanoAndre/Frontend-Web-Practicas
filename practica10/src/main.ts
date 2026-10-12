import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { DominioExceptionFilter } from './comun/filtros/dominio.filter';
import { LoggingInterceptor } from './comun/interceptores/logging.interceptor';
import { SobreInterceptor } from './comun/interceptores/sobre.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new DominioExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new SobreInterceptor(),
  );

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  app.enableCors({
    origin: ['http://localhost:5173'],
    exposedHeaders: ['Location', 'X-Request-Id'],
  });

  const config = new DocumentBuilder()
    .setTitle('API Gimnasio - Practica 10')
    .setDescription('API REST con autenticacion JWT y documentacion OpenAPI')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const documento = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documento);

  await app.listen(3000);
}

bootstrap();
