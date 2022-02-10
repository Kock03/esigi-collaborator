"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobsDto = void 0;
const class_validator_1 = require("class-validator");
const seniorities_entity_1 = require("../../seniorities/seniorities.entity");
const schooling_enum_1 = require("./schooling.enum");
const status_enum_1 = require("./status.enum");
const type_enum_1 = require("./type.enum");
const typeOfContract_enum_1 = require("./typeOfContract.enum");
const workplace_enum_1 = require("./workplace.enum");
class UpdateJobsDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateJobsDto.prototype, "requester", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], UpdateJobsDto.prototype, "publish", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateJobsDto.prototype, "client", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "typeOfJob", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], UpdateJobsDto.prototype, "temporary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateJobsDto.prototype, "monthTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateJobsDto.prototype, "jobName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], UpdateJobsDto.prototype, "startForecast", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", seniorities_entity_1.SenioritiesEntity)
], UpdateJobsDto.prototype, "Seniority", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "jobNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "typeOfContract", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "workplace", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateJobsDto.prototype, "workingDay", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "minimumValue", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "maximumValue", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateJobsDto.prototype, "schooling", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], UpdateJobsDto.prototype, "Knowledges", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateJobsDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateJobsDto.prototype, "attitudes", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], UpdateJobsDto.prototype, "Languages", void 0);
exports.UpdateJobsDto = UpdateJobsDto;
//# sourceMappingURL=update-jobs.dto.js.map