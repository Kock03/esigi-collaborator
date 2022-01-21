import { IsNotEmpty, IsOptional } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";
import { JobsEntity } from "../../../../../server-jobs/src/app/jobs/jobs.entity";

export class CreateLanguagesDto{
     
    @IsNotEmpty()
    languageName: string;
  
    @IsNotEmpty()
    degreeOfInfluence: degreeOfInfluence;

    @IsNotEmpty()
    Collaborator: CollaboratorsEntity;

    @IsOptional()
    Job: JobsEntity;

}