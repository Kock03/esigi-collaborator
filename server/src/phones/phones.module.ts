import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesEntity } from './phones.entity';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';

@Module({
  controllers: [PhonesController],
  providers: [PhonesService],
  imports: [TypeOrmModule.forFeature([PhonesEntity])],
  exports: [PhonesService],
})
@Module({})
export class PhonesModule {}
