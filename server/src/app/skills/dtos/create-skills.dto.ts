import { IsNotEmpty } from "class-validator";

export class CreateSkillsDto {
  
  @IsNotEmpty()
  tecnology: string;
  
  @IsNotEmpty()
  senioridade: Senioridade;

  @IsNotEmpty()
  yearsExperience: number;

  @IsNotEmpty()
  currentPosition: boolean;
}
