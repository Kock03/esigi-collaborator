import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesController } from './phones.controller';
import { PhonesEntity } from './phones.entity';
import { PhonesService } from './phones.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhonesEntity])],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhonesModule {}
