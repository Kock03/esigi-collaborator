import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'returns' })
export class ReturnsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nameCandidate: string;

  @Column()
  returnDate: Date;

  @Column()
  bahvioralAssessment: boolean;

  @Column()
  technicalAssessment: boolean;
}
