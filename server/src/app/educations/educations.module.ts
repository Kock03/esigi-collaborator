import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationsController } from "./educations.controller";
import { EducationsEntity } from "./educations.entity";
import { EducationsService } from "./educations.service";

@Module({
    imports: [TypeOrmModule.forFeature([EducationsEntity])],
    controllers: [EducationsController],
    providers: [EducationsService],
  })
  export class EducationsModule {}