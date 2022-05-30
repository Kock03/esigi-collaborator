import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
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
  startMonth: number;

  @ApiProperty()
  @IsNotEmpty()
  startYear: number;

  @ApiProperty()
  @IsOptional()
  terminusMonth: number;

  @ApiProperty()
  @IsOptional()
  terminusYear: number;

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
  @IsObject()
  Resume: ResumesEntity;
}
