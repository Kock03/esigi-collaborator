import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BankDataModule } from 'src/bank-data/bank-data.module';
import { PhonesModule } from 'src/phones/phones.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { SkillsModule } from 'src/skills/skills.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDataEntity } from './bank-data/bank-data.entity';
import { PhonesEntity } from './phones/phones.entity';
import { AddressesEntity } from './addresses/addresses.entity';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { CollaboratorsEntity } from './collaborators/collaborators.entity';
import { FinancialsModule } from './financials/financials.module';
import { FinancialsEntity } from './financials/financials.entity';
import { SkillsEntity } from './skills/skills.entity';
import { AppService } from './app.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test',
      entities: [
        BankDataEntity,
        PhonesEntity,
        SkillsEntity,
        AddressesEntity,
        CollaboratorsEntity,
        FinancialsEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    BankDataModule,
    PhonesModule,
    AddressesModule,
    SkillsModule,
    CollaboratorsModule,
    FinancialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
