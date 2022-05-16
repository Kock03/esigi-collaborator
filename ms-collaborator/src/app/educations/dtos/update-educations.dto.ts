import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Schooling } from './schooling.enum';
import { Situation } from './situation.enum';

export class UpdateEducationsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  course: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Schooling)
  schooling: Schooling;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
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
