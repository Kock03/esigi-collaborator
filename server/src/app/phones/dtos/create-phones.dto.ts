import { IsNotEmpty } from "class-validator";
import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";

export class CreatePhonesDto {

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  ddd: string;

  @IsNotEmpty()
  ddi: string;

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
