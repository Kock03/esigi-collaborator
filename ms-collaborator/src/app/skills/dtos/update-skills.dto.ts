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

export class UpdateSkillsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  technology: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Seniority)
  seniority: Seniority;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  yearsExperience: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  currentPosition: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
