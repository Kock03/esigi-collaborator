import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";
import { Schooling } from "./schooling.enum";

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