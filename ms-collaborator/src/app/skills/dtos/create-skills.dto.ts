import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Seniority } from './seniority.enun';


export class CreateSkillsDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  technology: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  seniority: Seniority;


  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
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
