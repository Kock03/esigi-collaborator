import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateSenioritiesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  intern: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  junior: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  pleno: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  senior: boolean;
}
