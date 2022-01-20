import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesEntity } from './addresses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressesEntity])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
