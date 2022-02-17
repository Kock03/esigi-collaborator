import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateLanguagesDto {
  @ApiProperty()
  @IsNotEmpty()
  languageName: string;

  @ApiProperty()
  @IsNotEmpty()
  degreeOfInfluence: degreeOfInfluence;

  @ApiProperty()
  @IsOptional()
  Job: JobsEntity;
}
