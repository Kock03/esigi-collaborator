import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { BehavioralInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';

export class CreateHiringPreferencesDto {
  @IsOptional()
  @IsBoolean()
  intern: boolean;

  @IsOptional()
  @IsBoolean()
  naturalPerson: boolean;

  @IsOptional()
  @IsBoolean()
  legalPerson: boolean;

  @IsOptional()
  @IsBoolean()
  cooperative: boolean;

  @IsOptional()
  BehaviroalInterview: BehavioralInterviewsEntity;
}
