import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, Max, MaxLength, MinLength, IsEnum, IsString, IsOptional, IsObject } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsingDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(Schooling)
  schooling: Schooling;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Schooling)
  situation: Situation;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  institution: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @IsString()
  course: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Resume: ResumesEntity;
}
