import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Grupo4 Api')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      process.env.FRONTEND_ORIGIN,
      'http://localhost:8000',
      'http://172.19.0.4:8000',
      'http://20.14.74.107:8000'
    ],
  });

  app.useGlobalPipes(new ValidationPipe({}));


  app.useGlobalPipes(
    new ValidationPipe({

    })
  );

  await app.listen(process.env.PORT ?? 2125, '0.0.0.0');
}
bootstrap();
