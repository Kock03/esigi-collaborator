import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean, IsString, MinLength, IsObject } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class UpdateExperiencesDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  office: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
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
  terminusMonth: string;

  @ApiProperty()
  @IsOptional()
  terminusYear: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  sector: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

}
