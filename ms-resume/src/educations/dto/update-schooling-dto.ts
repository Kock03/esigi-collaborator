import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, Max, MaxLength, MinLength, IsEnum, IsString } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateSchoolingDto {
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
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  institution: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(70)
  @IsString()
  course: string;
}
