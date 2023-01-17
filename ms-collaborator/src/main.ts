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
  // await app.listen(3501);
  const cors = require('cors');
  app.use((req, res, next) => {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'https://aws-amplify.d26nj5ra7tr3nr.amplifyapp.com');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
  })
}
bootstrap();
