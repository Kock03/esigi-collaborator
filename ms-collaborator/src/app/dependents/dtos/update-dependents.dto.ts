import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class UpdateDependentsDto {
  @ApiProperty()
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsOptional()
  birthDate: string;

  @ApiProperty()
  @IsOptional()
  age: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  ddd: string;

  @ApiProperty()
  @IsOptional()
  @IsString()

  ddi: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @MinLength(1)
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  Collaborator: CollaboratorsEntity;

}
