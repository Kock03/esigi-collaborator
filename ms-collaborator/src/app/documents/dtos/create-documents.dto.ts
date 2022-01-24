import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreateDocumentsDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    file: string;

    @IsNotEmpty()
    collaborator: CollaboratorsEntity;

}