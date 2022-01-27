import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
export declare class CreateAddressDto {
    cep: string;
    number: string;
    street: string;
    district: string;
    state: string;
    city: string;
    complement: string;
    collaborator: CollaboratorsEntity;
}
