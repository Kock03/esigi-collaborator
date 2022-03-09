import { Knowledges } from './iknowledges';
import { Languanges } from './ilanguages';

export interface IJob {
  jobName: string;
  client: string;
  requester: string;
  openingDate: string;
  status: number;
  typeOfJob: number;
  temporary: boolean;
  monthTime: string;
  startForecast: string;
  jobNumber: number;
  typeOfContract: number;
  workplace: number;
  workingDay: string;
  Seniorities: {
    intern: boolean;
    junior: boolean;
    pleno: boolean;
    senior: boolean;
  };
  minimumValue: number;
  maximumValue: number;
  publish: boolean;
  schooling: number;
  Languages: Languanges[];
  Knowledges: Knowledges[];
  collaboratorActivities: string;
  skills: string;
  attitudes: string;
}
