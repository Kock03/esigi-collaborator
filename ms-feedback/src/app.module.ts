import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { FeedbacksEntity } from './feedbacks/feedbacks.entity';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { FeedbacksService } from './feedbacks/feedbacks.service';


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
  } as TypeOrmModuleOptions), FeedbacksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
