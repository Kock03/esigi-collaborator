import { Controller } from '@nestjs/common';
import { BehavioralInterviewsService } from './behavioral-interviews.service';

@Controller('behavioral-interviews')
export class BehavioralInterviewsController {
  constructor(private readonly behavioralInterviewsService: BehavioralInterviewsService) {}
}
