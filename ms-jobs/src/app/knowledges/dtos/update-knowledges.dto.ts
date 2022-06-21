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

export class UpdateKnowledgesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  yearsExperience: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;
}
