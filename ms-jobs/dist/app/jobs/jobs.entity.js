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
exports.JobsEntity = void 0;
const typeorm_1 = require("typeorm");
const knowledges_entity_1 = require("../knowledges/knowledges.entity");
const schooling_enum_1 = require("./dtos/schooling.enum");
const status_enum_1 = require("./dtos/status.enum");
const type_enum_1 = require("./dtos/type.enum");
const typeOfContract_enum_1 = require("./dtos/typeOfContract.enum");
const workplace_enum_1 = require("./dtos/workplace.enum");
const seniorities_entity_1 = require("../seniorities/seniorities.entity");
const languages_entity_1 = require("../languages/languages.entity");
const returns_entity_1 = require("../returns/returns.entity");
const interviews_entity_1 = require("../interviews/interviews.entity");
let JobsEntity = class JobsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JobsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "requester", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], JobsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], JobsEntity.prototype, "publish", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], JobsEntity.prototype, "typeOfJob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], JobsEntity.prototype, "temporary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "monthTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "jobName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], JobsEntity.prototype, "startForecast", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], JobsEntity.prototype, "jobNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], JobsEntity.prototype, "typeOfContract", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], JobsEntity.prototype, "workplace", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "workingDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], JobsEntity.prototype, "minimumValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], JobsEntity.prototype, "maximumValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], JobsEntity.prototype, "schooling", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "collaboratorActivities", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobsEntity.prototype, "attitudes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], JobsEntity.prototype, "openingDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => languages_entity_1.LanguagesEntity, (languages) => languages.Job, {
        cascade: ['insert', 'update', 'soft-remove'],
        orphanedRowAction: 'delete',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], JobsEntity.prototype, "Languages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => knowledges_entity_1.KnowledgesEntity, (Knowledges) => Knowledges.Job, {
        cascade: ['insert', 'update', 'soft-remove'],
        orphanedRowAction: 'delete',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], JobsEntity.prototype, "Knowledges", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => seniorities_entity_1.SenioritiesEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", seniorities_entity_1.SenioritiesEntity)
], JobsEntity.prototype, "Seniorities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => interviews_entity_1.InterviewsEnitiy, (interviews) => interviews.jobs, {
        cascade: ['insert', 'update', 'soft-remove'],
    }),
    (0, typeorm_1.JoinTable)({ name: 'jobs_interviews' }),
    __metadata("design:type", Array)
], JobsEntity.prototype, "interviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => returns_entity_1.ReturnsEntity, (returns) => returns.Job, {
        cascade: ['insert', 'update', 'soft-remove'],
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], JobsEntity.prototype, "Returns", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], JobsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], JobsEntity.prototype, "deletedAt", void 0);
JobsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'jobs' })
], JobsEntity);
exports.JobsEntity = JobsEntity;
//# sourceMappingURL=jobs.entity.js.map