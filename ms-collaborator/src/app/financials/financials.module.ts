import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialsEntity } from './financials.entity';
import { FinancialsService } from './financials.service';
import { FinancialsController } from './financials.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialsEntity])],
  controllers: [FinancialsController],
  providers: [FinancialsService],
})
export class FinancialsModule {}
