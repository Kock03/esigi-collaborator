import { Module } from '@nestjs/common';
import { BankDataModule } from 'src/app/bank-data/bank-data.module';
import { PhoneModule } from 'src/app/phone/phone.module';
import { AddressModule } from 'src/app/address/address.module';
import { SkillsModule } from 'src/app/skills/skills.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BankDataEntity } from './app/bank-data/bank-data.entity';
import { PhoneEntity } from './app/phone/phone.entity';
import { AddressEntity } from './app/address/address.entity';
import { CollaboratorsModule } from './app/collaborators/collaborators.module';
import { CollaboratorsEntity } from './app/collaborators/collaborators.entity';
import { FinancialsModule } from './app/financials/financials.module';
import { FinancialsEntity } from './app/financials/financials.entity';
import { SkillsEntity } from './app/skills/skills.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './app/documents/documents.module';
import { EducationsModule } from './app/educations/educations.module';
import { LanguagesModule } from './app/languages/languages.module';

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
