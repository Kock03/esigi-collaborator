import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreateEducationsDto {

    @IsNotEmpty()
    course: string;

    @IsNotEmpty()
    schooling: string

    @IsNotEmpty()
    institution: string;

    @IsNotEmpty()
    situation: string;

    @IsNotEmpty()
    collaborator: CollaboratorsEntity;
}