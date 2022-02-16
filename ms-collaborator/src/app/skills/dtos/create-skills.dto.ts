import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Seniority } from './seniority.enun';


export class CreateSkillsDto {

  @IsNotEmpty()
  technology: string;


  @IsNotEmpty()
  seniority: Seniority;


  @IsNotEmpty()
  yearsExperience: number;


  @IsNotEmpty()
  currentPosition: boolean;


  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
