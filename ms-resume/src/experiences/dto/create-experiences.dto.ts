import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class CreateExperiencesDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  @IsString()
  office: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  @IsString()
  locality: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(40)
  @IsString()
  sector: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  resume: ResumesEntity;
}
