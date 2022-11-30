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

export class CreatedependentsDto {
  @ApiProperty()
  @IsNotEmpty()
  type: string;

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
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: string;

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
