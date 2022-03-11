export class JobPanelModel {
  id!: string;
  nameCandidate!: string;
  nameCandidateTec!: string;
  behavioralInterviewDate!: string;
  technicalInterviewDate!: string;
  requester!: string;
  status!: number;
  techRecruter!: string;

  constructor(jobPanel: any) {
    this.id = jobPanel.id
    this.nameCandidate = jobPanel.name_candidate;
    this.nameCandidateTec = jobPanel.name_candidate_tec;
    this.behavioralInterviewDate = jobPanel.behavioral_interview_date;
    this.technicalInterviewDate = jobPanel.technical_interview_date;
    this.requester = jobPanel.requester;
  }
}
