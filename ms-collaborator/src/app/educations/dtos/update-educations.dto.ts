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


export class UpdateEducationsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  course: string;

  @ApiProperty()
  @IsOptional()
  schooling: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  institution: string;

  @ApiProperty()
  @IsOptional()
  situation: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
