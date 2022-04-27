import { Module } from '@nestjs/common';
import { ClientInterviewsService } from './client-interviews.service';
import { ClientInterviewsController } from './client-interviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientInterviewsEntity } from './client-interviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientInterviewsEntity])],
  controllers: [ClientInterviewsController],
  providers: [ClientInterviewsService],
  exports: [ClientInterviewsService],
})
export class ClientInterviewsModule {}
