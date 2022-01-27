import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
export declare class SkillsEntity {
    id: string;
    tecnology: string;
    seniority: Senioridade;
    yearsExperience: number;
    currentPosition: boolean;
    Collaborator: CollaboratorsEntity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
