import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, Max, IsOptional, IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class UpdateExperiencesDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(40)
  @IsString()
  office: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(40)
  @IsString()
  locality: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsOptional()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(40)
  @IsString()
  sector: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
