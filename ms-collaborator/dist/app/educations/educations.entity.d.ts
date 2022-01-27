import { CollaboratorsEntity } from "../collaborators/collaborators.entity";
export declare class EducationsEntity {
    id: string;
    schooling: Schooling;
    course: string;
    institution: string;
    situation: Situation;
    Collaborator: CollaboratorsEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
