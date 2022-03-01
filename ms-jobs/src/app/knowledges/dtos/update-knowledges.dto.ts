import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';
import { TypeOfPeriod } from './type-of-period.enum';

export class UpdateKnowledgesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  yearsExperience: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;
}
