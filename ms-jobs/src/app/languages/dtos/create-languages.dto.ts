import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateLanguagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  languageName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  degreeOfInfluence: degreeOfInfluence;

  @ApiProperty()
  @IsNotEmpty()
  Job: JobsEntity;
}
