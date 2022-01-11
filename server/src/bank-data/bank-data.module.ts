import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDataEntity } from './bank-data.entity';
import { BankDataService } from './bank-data.service';
import { BankDataController } from './bank-data.controller';

@Module({
  controllers: [BankDataController],
  providers: [BankDataService],
  imports: [TypeOrmModule.forFeature([BankDataEntity])],
  exports: [BankDataService, TypeOrmModule],
})
export class BankDataModule {}
