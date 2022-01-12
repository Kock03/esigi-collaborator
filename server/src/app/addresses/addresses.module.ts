import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesEntity } from './addresses.entity';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AddressesEntity])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
