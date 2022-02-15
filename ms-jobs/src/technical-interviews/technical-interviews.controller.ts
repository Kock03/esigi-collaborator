import { Controller } from '@nestjs/common';
import { TechnicalInterviewsService } from './technical-interviews.service';

@Controller('technical-interviews')
export class TechnicalInterviewsController {
  constructor(private readonly technicalInterviewsService: TechnicalInterviewsService) {}
}
