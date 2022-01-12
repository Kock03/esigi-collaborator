import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesEntity } from './phones.entity';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhonesEntity])],
  controllers: [PhonesController],
  providers: [PhonesService],
})
export class PhonesModule {}
