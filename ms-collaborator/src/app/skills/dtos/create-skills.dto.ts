import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Seniority } from './seniority.enun';
import { TypeOfPeriod } from './type-of-period.enum';

export class CreateSkillsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Seniority)
  seniority: Seniority;

  @ApiProperty()
  @IsNotEmpty()
    yearsExperience: number;

  
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;


  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  currentPosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
