import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
export declare class AddressEntity {
    id: string;
    cep: string;
    number: string;
    street: string;
    district: string;
    state: string;
    city: string;
    complement: string;
    Collaborator: CollaboratorsEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
