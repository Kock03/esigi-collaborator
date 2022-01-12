import { IsNotEmpty } from "class-validator";

export class UpdateSkillsDto {

  @IsNotEmpty()
  tecnology: string;
  
  @IsNotEmpty()
  senioridade: Senioridade;

  @IsNotEmpty()
  yearsExperience: number;

  @IsNotEmpty()
  currentPosition: boolean;
}
