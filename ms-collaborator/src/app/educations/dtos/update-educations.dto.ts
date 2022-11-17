import { IsNotEmpty } from "class-validator";

export class UpdateEducationsDto {

    @IsNotEmpty()
    course: string;

    @IsNotEmpty()
    schooling: string

    @IsNotEmpty()
    institution: string;

    @IsNotEmpty()
    situation: string;
}