import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksEntity } from './feedbacks.entity';
import { FeedbacksService } from './feedbacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbacksEntity])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}