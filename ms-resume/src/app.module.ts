import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ResumesModule } from './resumes/resumes.module';
import { ResumesEntity } from './resumes/resumes.entity';
import { EducationsModule } from './educations/educations.module';
import { EducationsEntity } from './educations/educations.entity';
import { ExperiencesEntity } from './experiences/experiences.entity';
import { LanguagesEntity } from './languages/languages.entity';
import { LanguagesModule } from './languages/languages.module';
import { PhoneEntity } from './phone/phone.entity';
import { SkillsEntity } from './skills/skills.entity';
import { PhoneModule } from './phone/phone.module';
import { SkillsModule } from './skills/skills.module';
import { AddressModule } from './address/address.module';
import { AddressEntity } from './address/address.entity';
import { ExperiencesModule } from './experiences/experiences.module';
import { ConfigModule } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    } as TypeOrmModuleOptions),
    EducationsModule,
    ExperiencesModule,
    LanguagesModule,
    PhoneModule,
    ResumesModule,
    SkillsModule,
    AddressModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
