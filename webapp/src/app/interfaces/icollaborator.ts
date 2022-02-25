import { IFeedback } from "./ifeedback";

export interface ICollaborator {
    id: string;
    firstNameCorporateName: string;
    admissionDate: Date;
    office: number;
    currentClient: string;
    active: boolean;
    Feedbacks: IFeedback[]
}