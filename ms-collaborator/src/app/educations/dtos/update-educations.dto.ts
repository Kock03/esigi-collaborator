import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  course: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Schooling)
  schooling: Schooling;

  @ApiProperty()
  @IsOptional()
  @IsString()
  institution: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Situation)
  situation: Situation;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
