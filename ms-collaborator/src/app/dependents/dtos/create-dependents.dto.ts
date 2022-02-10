import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreatedependentsDto {

    @IsNotEmpty()
    type: Type;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    gender: Gender;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    ddd: string;

    @IsNotEmpty()
    ddi: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    Collaborator: CollaboratorsEntity;
}