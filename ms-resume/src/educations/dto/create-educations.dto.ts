import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsSemVer, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class CreateEducationsDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Schooling)
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Schooling)
  situation: Situation;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  institution: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  course: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Resume: ResumesEntity;
}
