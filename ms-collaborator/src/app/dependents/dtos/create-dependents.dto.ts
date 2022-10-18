import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { Gender } from 'src/app/collaborators/dtos/gender.enum';
import { Type } from './type.enum';

export class CreatedependentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  age: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  ddd: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  ddi: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(1)
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
