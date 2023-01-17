import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Collaborator API')
    .setDescription('collaborator api')
    .setVersion('1.0')
    .addTag('collaborators')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
       deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors();
  await app.listen(3501);
  const cors = require('cors');
  var corsOptions = {
    origin: 'https://aws-amplify.d26nj5ra7tr3nr.amplifyapp.com',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
}
bootstrap();
