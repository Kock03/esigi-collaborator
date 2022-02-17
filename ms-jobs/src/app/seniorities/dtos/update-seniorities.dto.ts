import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSenioritiesDto {
  @ApiProperty()
  @IsNotEmpty()
  intern: boolean;

  @ApiProperty()
  @IsNotEmpty()
  junior: boolean;

  @ApiProperty()
  @IsNotEmpty()
  pleno: boolean;

  @ApiProperty()
  @IsNotEmpty()
  senior: boolean;
}
