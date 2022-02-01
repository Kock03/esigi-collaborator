import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDataEntity } from './bank-data.entity';
import { BankDataService } from './bank-data.service';
import { BankDataController } from './bank-data.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BankDataEntity])],
  controllers: [BankDataController],
  providers: [BankDataService],
})
export class BankDataModule {}
