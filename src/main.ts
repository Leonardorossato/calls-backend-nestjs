import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: `http://localhost:${process.env.PORT}/api`,
      methods: 'GET, PUT, PATCH, DELETE, UPDATE',
    },
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Email Backend Api')
    .setDescription(
      'Email Backend Api with NestJs, TypeOrm, Swagger, Postgres and Docker',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(`${process.env.PORT}`);
}
void bootstrap();
