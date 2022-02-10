import { IsNotEmpty } from "class-validator";

export class UpdateDependentsDto {

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

}
