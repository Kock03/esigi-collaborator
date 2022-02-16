import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CollaboratorsEntity } from 'src/app/collaborators/collaborators.entity';
import { AccountTypes } from './account-types.enum';

export class UpdateBankDataDto {


  @ApiProperty()
  @IsNotEmpty()
  agency: string;

  @ApiProperty()
  @IsNotEmpty()
  digit: number;

  @ApiProperty()
  @IsNotEmpty()
  accountType: AccountTypes;

  @ApiProperty()
  @IsNotEmpty()
  accountNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  accountDigit: number;
}
