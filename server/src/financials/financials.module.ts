import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialsEntity } from './financials.entity';
import { FinancialsService } from './financials.service';
import { FinancialsController } from './financials.controller';

@Module({
  controllers: [FinancialsController],
  providers: [FinancialsService],
  imports: [TypeOrmModule.forFeature([FinancialsEntity])],
  exports: [FinancialsService, TypeOrmModule],
})
export class FinancialsModule {}
