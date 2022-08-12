export class JobPanelModel {
  id!: string;
  nameCandidate!: string;
  nameCandidateTec!: string;
  behavioralInterviewDate!: string;
  technicalInterviewDate!: string;
  collaborator!: string;
  resume!: string;
  status!: number;
  techRecruter!: string;

  constructor(jobPanel: any) {
    this.id = jobPanel.id
    this.nameCandidate = jobPanel.name_candidate;
    this.behavioralInterviewDate = jobPanel.behavioral_interview_date;
    this.technicalInterviewDate = jobPanel.technical_interview_date;
    this.collaborator = jobPanel.collaborator;
    this.resume = jobPanel.resume;

  }
}
