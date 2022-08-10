import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { TypeOfPeriod } from './type-of-period.enum';

export class CreateKnowledgesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  yearsExperience: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;

  @ApiProperty()
  @IsNotEmpty()
  Job: JobsEntity;
}
