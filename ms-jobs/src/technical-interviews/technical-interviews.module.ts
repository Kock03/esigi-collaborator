import { Module } from '@nestjs/common';
import { TechnicalInterviewsService } from './technical-interviews.service';
import { TechnicalInterviewsController } from './technical-interviews.controller';

@Module({
  controllers: [TechnicalInterviewsController],
  providers: [TechnicalInterviewsService]
})
export class TechnicalInterviewsModule {}
