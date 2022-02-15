import { Controller } from '@nestjs/common';
import { ClientInterviewsService } from './client-interviews.service';

@Controller('client-interviews')
export class ClientInterviewsController {
  constructor(private readonly clientInterviewsService: ClientInterviewsService) {}
}
