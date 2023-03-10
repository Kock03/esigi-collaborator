import { Module } from '@nestjs/common';
import { BankDataModule } from 'src/app/bank-data/bank-data.module';
import { PhoneModule } from 'src/app/phone/phone.module';
import { AddressModule } from 'src/app/address/address.module';
import { SkillsModule } from 'src/app/skills/skills.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FinancialsModule } from './app/financials/financials.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './app/documents/documents.module';
import { EducationsModule } from './app/educations/educations.module';
import { LanguagesModule } from './app/languages/languages.module';
import { CollaboratorsModule } from './app/collaborators/collaborators.module';

@Module({
  imports: [
    ConfigModule.forRoot(), TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
    } as TypeOrmModuleOptions),
    BankDataModule,
    PhoneModule,
    AddressModule,
    SkillsModule,
    CollaboratorsModule,
    FinancialsModule,
    DocumentsModule,
    EducationsModule,
    LanguagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
