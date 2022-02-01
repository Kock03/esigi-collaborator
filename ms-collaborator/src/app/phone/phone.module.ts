import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './phone.entity';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
