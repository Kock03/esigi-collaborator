import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BehavioralInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { InterviewsEnitiy } from 'src/app/interviews/interviews.entity';
import { KnowledgesEntity } from 'src/app/knowledges/knowledges.entity';
import { LanguagesEntity } from 'src/app/languages/languages.entity';
import { SenioritiesEntity } from 'src/app/seniorities/seniorities.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';
import { Schooling } from './schooling.enum';
import { Status } from './status.enum';
import { Type } from './type.enum';
import { TypeOfContract } from './type-of-contract.enum';
import { Workplace } from './workplace.enum';

export class UpdateJobsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  collaboratorRequesterId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  reason: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  publish: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  customerId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Type)
  typeOfJob: Type;

  @ApiProperty()
  @IsOptional()
  replacementId: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  temporary: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  monthTime: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  jobName: string;

  @ApiProperty()
  @IsOptional()
  startForecast: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  jobNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TypeOfContract)
  typeOfContract: TypeOfContract;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Workplace)
  workplace: Workplace;

  @ApiProperty()
  @IsOptional()
  @IsString()
  workingDay: string;

  @ApiProperty()
  @IsOptional()
  minimumValue: string;

  @ApiProperty()
  @IsOptional()
  maximumValue: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Workplace)
  schooling: Schooling;

  @ApiProperty()
  @IsOptional()
  @IsString()
  collaboratorActivities: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  acquirements: string;

  @ApiProperty()
  @IsOptional()
  Knowledges: KnowledgesEntity[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  skills: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  attitudes: string;

  @ApiProperty()
  @IsOptional()
  openingDate: string;

  @ApiProperty()
  @IsOptional()
  Seniorities: SenioritiesEntity;

  @ApiProperty()
  @IsOptional()
  Languages: LanguagesEntity[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  interviews: InterviewsEnitiy[];
}
