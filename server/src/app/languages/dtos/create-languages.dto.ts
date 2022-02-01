import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreateLanguagesDto{
     
    @IsNotEmpty()
    languageName: string;
  
    @IsNotEmpty()
    degreeOfInfluence: degreeOfInfluence;

    @IsNotEmpty()
    collaborator: CollaboratorsEntity;

}