import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BehavioralInterviewsEntity } from 'src/app/behavioral-interviews/behavioral-interviews.entity';
import { ClientInterviewsEntity } from 'src/app/client-interviews/client-interviews.entity';
import { TechnicalInterviewsEntity } from 'src/app/technical-interviews/technical-interviews.entity';

export class UpdateInterviewsDto {
  @ApiProperty()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsOptional()
  BehavioralInterviews: BehavioralInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  TechnicalInterviews: TechnicalInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  ClientInterviews: ClientInterviewsEntity;

  @ApiProperty()
  @IsOptional()
  createdAt : string;
  
  @ApiProperty()
  @IsOptional()
  deletedAt : string;
  

  @ApiProperty()
  @IsOptional()
  updatedAt: string;
}
