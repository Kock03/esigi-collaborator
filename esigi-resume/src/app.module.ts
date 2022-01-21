import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumesModule } from './resumes/resumes.module';
import { ResumesEntity } from './resumes/resumes.entity';
import { EducationsModule } from './educations/educations.module';
import { EducationsEntity } from './educations/educations.entity';
import { ExperiencesEntity } from './experiences/experiences.entity';
import { IdiomsEntity } from './idioms/idioms.entity';
import { IdiomsModule } from './idioms/idioms.module';
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
      database: 'new_schema',
      synchronize: true,
      entities: [
        EducationsEntity,
        ExperiencesEntity,
        IdiomsEntity,
        PhonesEntity,
        ResumesEntity,
        SkillsEntity,
        AddressesEntity,
      ],
    }),
    EducationsModule,
    ExperiencesModule,
    IdiomsModule,
    PhonesModule,
    ResumesModule,
    SkillsModule,
    AddressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
