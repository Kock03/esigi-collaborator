import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class UpdatePhoneDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(8)
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(3)
  ddd: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(3)
  ddi: string;
}
