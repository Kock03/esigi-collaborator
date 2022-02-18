<<<<<<< HEAD
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString, MaxLength, MinLength } from 'class-validator';
=======
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
>>>>>>> fe4333b22cacb1a00dacec5821ea4bb05d513885
import { ResumesEntity } from 'src/resumes/resumes.entity';
import { Seniority } from './seniority.enum';

export class CreateSkillsDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
<<<<<<< HEAD
  @MinLength(1)
  @MaxLength(70)
=======
  @MinLength(3)
  @MaxLength(80)
>>>>>>> fe4333b22cacb1a00dacec5821ea4bb05d513885
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
<<<<<<< HEAD
  @MinLength(1)
  @MaxLength(5)
=======
>>>>>>> fe4333b22cacb1a00dacec5821ea4bb05d513885
  yearsExperience: string;

  @ApiProperty()
  @IsNotEmpty()
<<<<<<< HEAD
  @IsNumber()
  @MaxLength(1)
=======
  @IsEnum(Seniority)
>>>>>>> fe4333b22cacb1a00dacec5821ea4bb05d513885
  seniority: Seniority;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  currentPosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  resume: ResumesEntity;
}
