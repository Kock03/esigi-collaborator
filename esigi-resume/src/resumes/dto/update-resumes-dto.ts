import { AddressesEntity } from 'src/addresses/addresses.entity';
import { EducationsEntity } from 'src/educations/educations.entity';
import { ExperiencesEntity } from 'src/experiences/experiences.entity';
import { PhonesEntity } from 'src/phones/phones.entity';
import { SkillsEntity } from 'src/skills/skills.entity';
import { MaritalStatus } from './marital-status.enum';
import { SexTypes } from './sex-types.enum';

export interface UpdateResumesDto {
  photo: string;
  firstName: string;
  lastName: string;
  login: string;
  cpf: string;
  birthDate: Date;
  sex: SexTypes;
  maritalStatus: MaritalStatus;
  addresses: AddressesEntity;
  educations: EducationsEntity[];
  experience: ExperiencesEntity[];
  skills: SkillsEntity[];
  phones: PhonesEntity;
  email: string;
  site: string;
  linkedin: string;
}
