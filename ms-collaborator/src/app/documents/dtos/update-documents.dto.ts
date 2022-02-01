import { IsNotEmpty } from "class-validator";

export class UpdateDocumentsDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    file: string;
}