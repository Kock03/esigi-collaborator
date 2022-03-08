import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, Max, MaxLength, MinLength, IsEnum, IsString, IsOptional } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateSchoolingDto {
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
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  institution: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  course: string;
}
