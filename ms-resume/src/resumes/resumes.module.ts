import { Module } from '@nestjs/common';
import { ResumesEntity } from './resumes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { PhoneService } from 'src/phone/phone.service';
import { AddressService } from 'src/address/address.service';
import { AddressEntity } from 'src/address/address.entity';
import { PhoneEntity } from 'src/phone/phone.entity';
import { LanguagesEntity } from 'src/languages/languages.entity';
import { EducationsEntity } from 'src/educations/educations.entity';
import { ExperiencesEntity } from 'src/experiences/experiences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResumesEntity])],
  controllers: [ResumesController],
  providers: [ResumesService],

})
export class ResumesModule {}
