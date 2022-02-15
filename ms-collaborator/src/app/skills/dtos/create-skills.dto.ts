import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreateSkillsDto {
  
  @IsNotEmpty()
  technology: string;
  
  @IsNotEmpty()
  seniority: Senioridade;

  @IsNotEmpty()
  yearsExperience: number;

  @IsNotEmpty()
  currentPosition: boolean;

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
