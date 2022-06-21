import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency.enum';

export class CreateLanguagesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  languageName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Fluency)
  degreeOfInfluence: Fluency;

  @ApiProperty()
  @IsNotEmpty()
  Resume: ResumesEntity;
}
