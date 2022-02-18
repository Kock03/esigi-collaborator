import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { JobsEntity } from 'src/app/jobs/jobs.entity';

export class CreateSenioritiesDto {
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

  @ApiProperty()
  @IsOptional()
  Job: JobsEntity;
}
