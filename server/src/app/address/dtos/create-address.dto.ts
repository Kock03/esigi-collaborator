import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreateAddressDto {

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;
  
  @IsNotEmpty()
  complement: string;

  @IsNotEmpty()
  collaborator: CollaboratorsEntity;
}
