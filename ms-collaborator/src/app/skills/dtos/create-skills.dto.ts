import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString, MaxLength, MinLength } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Seniority } from './seniority.enun';


export class CreateSkillsDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  technology: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsEnum(Seniority)
  seniority: Seniority;


  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @MinLength(1)
  @MaxLength(2)
  yearsExperience: number;


  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  currentPosition: boolean;


  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  collaborator: CollaboratorsEntity;
}
