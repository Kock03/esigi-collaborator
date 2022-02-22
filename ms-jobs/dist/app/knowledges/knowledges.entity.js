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
exports.KnowledgesEntity = void 0;
const typeorm_1 = require("typeorm");
const jobs_entity_1 = require("../jobs/jobs.entity");
const typeOfPeriod_enum_1 = require("./dtos/typeOfPeriod.enum");
let KnowledgesEntity = class KnowledgesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], KnowledgesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KnowledgesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], KnowledgesEntity.prototype, "yearsExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], KnowledgesEntity.prototype, "typeOfPeriod", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobs_entity_1.JobsEntity, (job) => job.Knowledges, { onDelete: 'CASCADE' }),
    __metadata("design:type", jobs_entity_1.JobsEntity)
], KnowledgesEntity.prototype, "Job", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], KnowledgesEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], KnowledgesEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], KnowledgesEntity.prototype, "deletedAt", void 0);
KnowledgesEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'knowledges' })
], KnowledgesEntity);
exports.KnowledgesEntity = KnowledgesEntity;
//# sourceMappingURL=knowledges.entity.js.map