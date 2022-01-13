import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreateSkillsDto {
  
  @IsNotEmpty()
  tecnology: string;
  
  @IsNotEmpty()
  senioridade: Senioridade;

  @IsNotEmpty()
  yearsExperience: number;

  @IsNotEmpty()
  currentPosition: boolean;

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
