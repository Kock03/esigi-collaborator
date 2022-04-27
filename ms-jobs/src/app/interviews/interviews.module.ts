import { Module } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewsEnitiy } from './interviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewsEnitiy])],
  controllers: [InterviewsController],
  providers: [InterviewsService],
})
export class InterviewsModule {}
