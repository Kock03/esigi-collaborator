import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependentsController } from './dependents.controller';
import { DependentsEntity } from './dependents.entity';
import { DependentsService } from './dependents.service';


@Module({
    imports: [TypeOrmModule.forFeature([DependentsEntity])],
    controllers: [DependentsController],
    providers: [DependentsService],
})
export class DependentsModule { }
