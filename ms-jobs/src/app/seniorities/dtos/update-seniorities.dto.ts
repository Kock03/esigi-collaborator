import { IsNotEmpty } from "class-validator";

export class UpdateSenioritiesDto{

    @IsNotEmpty()
    intern: boolean;
  
    @IsNotEmpty()
    junior: boolean;

    @IsNotEmpty()
    pleno: boolean;

    @IsNotEmpty()
    senior: boolean;
}