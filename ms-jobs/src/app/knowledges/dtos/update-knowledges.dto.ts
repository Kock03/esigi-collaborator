import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { TypeOfPeriod } from './typeOfPeriod.enum';

export class UpdateKnowledgesDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  yearsExperience: number;

  @ApiProperty()
  @IsNotEmpty()
  Job: JobsEntity;

  @ApiProperty()
  @IsNotEmpty()
  typeOfPeriod: TypeOfPeriod;
}
