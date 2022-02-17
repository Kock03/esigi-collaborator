import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
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

export class UpdateJobsDto {
  @ApiProperty()
  @IsNotEmpty()
  requester: string;

  @ApiProperty()
  @IsNotEmpty()
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  publish: boolean;

  @ApiProperty()
  @IsNotEmpty()
  client: string;

  @ApiProperty()
  @IsNotEmpty()
  typeOfJob: Type;

  @ApiProperty()
  @IsNotEmpty()
  temporary: boolean;

  @ApiProperty()
  @IsOptional()
  monthTime: string;

  @ApiProperty()
  @IsNotEmpty()
  jobName: string;

  @ApiProperty()
  @IsNotEmpty()
  startForecast: Date;

  @ApiProperty()
  @IsNotEmpty()
  jobNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  typeOfContract: TypeOfContract;

  @ApiProperty()
  @IsNotEmpty()
  workplace: Workplace;

  @ApiProperty()
  @IsNotEmpty()
  workingDay: string;

  @ApiProperty()
  @IsNotEmpty()
  minimumValue: number;

  @ApiProperty()
  @IsNotEmpty()
  maximumValue: number;

  @ApiProperty()
  @IsNotEmpty()
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  collaboratorActivities: string;

  // @ApiProperty()
  @IsOptional()
  Knowledges: KnowledgesEntity[];

  @ApiProperty()
  @IsNotEmpty()
  skills: string;

  @ApiProperty()
  @IsNotEmpty()
  attitudes: string;

  @ApiProperty()
  @IsNotEmpty()
  openingDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  Seniorities: SenioritiesEntity;

  // @ApiProperty()
  @IsOptional()
  Languages: LanguagesEntity[];

  // @ApiProperty()
  @IsOptional()
  behaviorInterviews: BehaviroalInterviewsEntity[];

  // @ApiProperty()
  @IsOptional()
  clientInterviews: ClientInterviewsEntity[];

  // @ApiProperty()
  @IsOptional()
  technicalInterviews: TechnicalInterviewsEntity[];
}
