import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Punctuality } from 'src/app/behavioral-interviews/enums/punctuality.enum';

export class UpdateTechnicalInterviewsDto {
  @ApiProperty()
  @IsNotEmpty()
  nameCandidate: string;

  @ApiProperty()
  @IsNotEmpty()
  evaluator: string;

  @ApiProperty()
  @IsNotEmpty()
  technicalInterviewDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  hourInterview: Date;

  @ApiProperty()
  @IsNotEmpty()
  punctuality: Punctuality;

  @ApiProperty()
  @IsNotEmpty()
  jobProfile: string;

  @ApiProperty()
  @IsNotEmpty()
  technicalEvaluation: string;

  @ApiProperty()
  @IsNotEmpty()
  comments: string;

  @ApiProperty()
  @IsNotEmpty()
  situational: boolean;
}
