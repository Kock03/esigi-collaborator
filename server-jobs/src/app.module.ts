import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './app/jobs/jobs.module';
import { KnowledgesModule } from './app/knowledges/knowledges.module';
import { SenioritiesModule } from './app/seniorities/seniorities.module';


@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
  } as TypeOrmModuleOptions), JobsModule, KnowledgesModule,SenioritiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
