import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationsController } from "./educations.controller";
import { EducationsService } from "./educations.service";

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [EducationsController],
    providers: [EducationsService],
  })
  export class EducationsModule {}