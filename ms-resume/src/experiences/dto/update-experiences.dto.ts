import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, Max, IsOptional, IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';

export class UpdateExperiencesDto {
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
}
