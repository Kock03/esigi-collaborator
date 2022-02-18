import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString, Length, MaxLength, MinLength } from 'class-validator';
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
  @MinLength(3)
  @MaxLength(70)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @Length(11)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(3)
  ddd: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(3)
  ddi: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(10)
  @MaxLength(150)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  Collaborator: CollaboratorsEntity;
}
