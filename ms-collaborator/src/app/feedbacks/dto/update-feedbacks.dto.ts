import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { FeedbackTypes } from '../enums/feedback-types.enum';
import { Reason } from '../enums/reason.enum';
import { Status } from '../enums/status.enum';

export class UpdateFeedbacksDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  feedbackType: FeedbackTypes;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Reason)
  reason: Reason;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  project: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsOptional()
  feedbackDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(5)
  hourDate: string;

  @ApiProperty()
  @IsOptional()
  feedbackDateRetorn: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(5)
  hourDateRetorn: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  manager: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  managerDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  improvementPoints: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  collaboratorDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  commitment: string;
}
