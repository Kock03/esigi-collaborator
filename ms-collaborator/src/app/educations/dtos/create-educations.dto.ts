import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class CreateEducationsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Schooling)
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  institution: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Situation)
  situation: Situation;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
