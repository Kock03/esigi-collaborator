import { Module } from '@nestjs/common';
import { BankDataModule } from 'src/bank-data/bank-data.module';
import { PhonesModule } from 'src/phones/phones.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { SkillsModule } from 'src/skills/skills.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BankDataEntity } from './bank-data/bank-data.entity';
import { PhonesEntity } from './phones/phones.entity';
import { AddressesEntity } from './addresses/addresses.entity';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { CollaboratorsEntity } from './collaborators/collaborators.entity';
import { FinancialsModule } from './financials/financials.module';
import { FinancialsEntity } from './financials/financials.entity';
import { SkillsEntity } from './skills/skills.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    BankDataModule,
    PhonesModule,
    AddressesModule,
    SkillsModule,
    CollaboratorsModule,
    FinancialsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
