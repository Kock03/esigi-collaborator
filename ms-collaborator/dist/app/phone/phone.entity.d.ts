import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
export declare class PhoneEntity {
    id: string;
    phoneNumber: string;
    ddd: string;
    ddi: string;
    Collaborator: CollaboratorsEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
