import { CollaboratorsEntity } from "src/app/collaborators/collaborators.entity";
export declare class CreateSkillsDto {
    tecnology: string;
    seniority: Senioridade;
    yearsExperience: number;
    currentPosition: boolean;
    collaborator: CollaboratorsEntity;
}
