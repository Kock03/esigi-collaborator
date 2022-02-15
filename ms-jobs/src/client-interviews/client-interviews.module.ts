import { Module } from '@nestjs/common';
import { ClientInterviewsService } from './client-interviews.service';
import { ClientInterviewsController } from './client-interviews.controller';

@Module({
  controllers: [ClientInterviewsController],
  providers: [ClientInterviewsService]
})
export class ClientInterviewsModule {}
