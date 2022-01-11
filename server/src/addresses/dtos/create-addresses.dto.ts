import { CollaboratorsEntity } from 'src/collaborators/collaborators.entity';

export interface CreateAddressesDto {
  cep: string;
  number: string;
  complement: string;
  collaborator: CollaboratorsEntity[];
}
