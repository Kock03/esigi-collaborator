import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Fluency } from './fluency.enum';

export class UpdateLanguagesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  languageName: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Fluency)
  degreeOfInfluence: Fluency;

}
