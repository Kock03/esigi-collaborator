import { Module } from '@nestjs/common';
import { BehavioralInterviewsService } from './behavioral-interviews.service';
import { BehavioralInterviewsController } from './behavioral-interviews.controller';

@Module({
  controllers: [BehavioralInterviewsController],
  providers: [BehavioralInterviewsService]
})
export class BehavioralInterviewsModule {}
