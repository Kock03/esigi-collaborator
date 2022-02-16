import { Module } from '@nestjs/common';
import { BehavioralInterviewsService } from './behavioral-interviews.service';
import { BehavioralInterviewsController } from './behavioral-interviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BehaviroalInterviewsEntity } from './behavioral-interviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BehaviroalInterviewsEntity])],
  controllers: [BehavioralInterviewsController],
  providers: [BehavioralInterviewsService],
  exports: [BehavioralInterviewsService],
})
export class BehavioralInterviewsModule {}
