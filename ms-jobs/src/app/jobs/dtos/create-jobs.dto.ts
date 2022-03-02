import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isArray,
  IsArray,
  IsBoolean,
  IsDataURI,
  IsDate,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsSemVer,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BehavioralInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { InterviewsEnitiy } from 'src/app/interviews/interviews.entity';
import { KnowledgesEntity } from 'src/app/knowledges/knowledges.entity';
import { LanguagesEntity } from 'src/app/languages/languages.entity';
import { ReturnsEntity } from 'src/app/returns/returns.entity';
import { SenioritiesEntity } from 'src/app/seniorities/seniorities.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';
import { Schooling } from './schooling.enum';
import { Status } from './status.enum';
import { Type } from './type.enum';
import { TypeOfContract } from './typeOfContract.enum';
import { Workplace } from './workplace.enum';

export class CreateJobsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  requester: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  publish: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  client: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  typeOfJob: Type;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  temporary: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  monthTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  jobName: string;

  @ApiProperty()
  @IsNotEmpty()
  startForecast: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  jobNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TypeOfContract)
  typeOfContract: TypeOfContract;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Workplace)
  workplace: Workplace;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  workingDay: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minimumValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maximumValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Workplace)
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  collaboratorActivities: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  Knowledges: KnowledgesEntity[];

  @ApiProperty()
  @IsOptional()
  Returns: ReturnsEntity[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  skills: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  attitudes: string;

  @ApiProperty()
  @IsNotEmpty()
  openingDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  Seniorities: SenioritiesEntity;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  Languages: LanguagesEntity[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  interviews: InterviewsEnitiy[];
}
