import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumesModule } from './resumes/resumes.module';
import { ResumesEntity } from './resumes/resumes.entity';
import { EducationsModule } from './educations/educations.module';
import { EducationsEntity } from './educations/educations.entity';
import { ExperiencesEntity } from './experiences/experiences.entity';
import { LanguagesEntity } from './languages/languages.entity';
import { LanguagesModule } from './languages/languages.module';
import { PhonesEntity } from './phones/phones.entity';
import { SkillsEntity } from './skills/skills.entity';
import { PhonesModule } from './phones/phones.module';
import { SkillsModule } from './skills/skills.module';
import { AddressesModule } from './addresses/addresses.module';
import { AddressesEntity } from './addresses/addresses.entity';
import { ExperiencesModule } from './experiences/experiences.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'resume',
      synchronize: true,
      entities: [
        EducationsEntity,
        ExperiencesEntity,
        LanguagesEntity,
        PhonesEntity,
        ResumesEntity,
        SkillsEntity,
        AddressesEntity,
      ],
    }),
    EducationsModule,
    ExperiencesModule,
    LanguagesModule,
    PhonesModule,
    ResumesModule,
    SkillsModule,
    AddressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
