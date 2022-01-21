import { Module } from '@nestjs/common';
import { ResumesEntity } from './resumes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { PhonesService } from 'src/phones/phones.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { AddressesEntity } from 'src/addresses/addresses.entity';
import { PhonesEntity } from 'src/phones/phones.entity';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService, PhonesService, AddressesService],
  imports: [
    TypeOrmModule.forFeature([ResumesEntity, AddressesEntity, PhonesEntity]),
  ],
})
export class ResumesModule {}
