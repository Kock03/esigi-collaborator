import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Seniority } from './seniority.enun';
import { TypeOfPeriod } from './type-of-period.enum';

export class UpdateSkillsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  technology: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Seniority)
  seniority: Seniority;

  @ApiProperty()
  @IsOptional()
  yearsExperience: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TypeOfPeriod)
  typeOfPeriod: TypeOfPeriod;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  currentPosition: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  inactive: boolean;

  @IsOptional()
  Collaborator: CollaboratorsEntity;

}
