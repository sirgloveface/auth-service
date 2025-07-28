import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve automáticamente las propiedades que no están definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si hay propiedades no definidas en el DTO
      transform: true, // Transforma los payloads a instancias del DTO (necesario para type safety y para que class-transformer funcione)
      transformOptions: {
        enableImplicitConversion: true, // Intenta convertir automáticamente tipos primitivos (ej. "123" a 123)
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
