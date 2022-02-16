import { isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { BehaviroalInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { KnowledgesEntity } from 'src/app/knowledges/knowledges.entity';
import { LanguagesEntity } from 'src/app/languages/languages.entity';
import { SenioritiesEntity } from 'src/app/seniorities/seniorities.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';
import { Schooling } from './schooling.enum';
import { Status } from './status.enum';
import { Type } from './type.enum';
import { TypeOfContract } from './typeOfContract.enum';
import { Workplace } from './workplace.enum';

export class CreateJobsDto {
  @IsNotEmpty()
  requester: string;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  publish: boolean;

  @IsNotEmpty()
  client: string;

  @IsNotEmpty()
  typeOfJob: Type;

  @IsNotEmpty()
  temporary: boolean;

  @IsOptional()
  monthTime: string;

  @IsNotEmpty()
  jobName: string;

  @IsNotEmpty()
  startForecast: Date;

  @IsNotEmpty()
  jobNumber: number;

  @IsNotEmpty()
  typeOfContract: TypeOfContract;

  @IsNotEmpty()
  workplace: Workplace;

  @IsNotEmpty()
  workingDay: string;

  @IsNotEmpty()
  minimumValue: number;

  @IsNotEmpty()
  maximumValue: number;

  @IsNotEmpty()
  schooling: Schooling;

  @IsNotEmpty()
  collaboratorActivities: string;

  @IsNotEmpty()
  Knowledges: KnowledgesEntity[];

  @IsNotEmpty()
  skills: string;

  @IsNotEmpty()
  attitudes: string;

  @IsNotEmpty()
  openingDate: Date;

  @IsNotEmpty()
  Seniorities: SenioritiesEntity;

  @IsNotEmpty()
  Languages: LanguagesEntity[];

  @IsOptional()
  behaviorInterviews: BehaviroalInterviewsEntity[];

  @IsOptional()
  clientInterviews: ClientInterviewsEntity[];

  @IsOptional()
  technicalInterviews: TechnicalInterviewsEntity[];
}
