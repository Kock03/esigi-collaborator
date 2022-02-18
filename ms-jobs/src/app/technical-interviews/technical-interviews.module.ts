import { Module } from '@nestjs/common';
import { TechnicalInterviewsService } from './technical-interviews.service';
import { TechnicalInterviewsController } from './technical-interviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalInterviewsEntity } from './technical-interviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalInterviewsEntity])],
  controllers: [TechnicalInterviewsController],
  providers: [TechnicalInterviewsService],
  exports: [TechnicalInterviewsService],
})
export class TechnicalInterviewsModule {}
