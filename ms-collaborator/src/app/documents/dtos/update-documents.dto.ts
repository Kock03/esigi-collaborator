import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDocumentsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(100)
  @MaxLength(300)
  file: string;
}
