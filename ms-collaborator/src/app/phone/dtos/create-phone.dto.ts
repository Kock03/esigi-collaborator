import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';

export class CreatePhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
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
}
