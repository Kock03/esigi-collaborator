import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreateEducationsDto{
     
    @IsNotEmpty()
    course: string;
  
    @IsNotEmpty()
    schooling: Schooling

    @IsNotEmpty()
    institution: string;

    @IsNotEmpty()
    situation: Situation;

    @IsNotEmpty()
    collaborator: CollaboratorsEntity;
}