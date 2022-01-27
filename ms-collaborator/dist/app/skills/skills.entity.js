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
exports.SkillsEntity = void 0;
const collaborators_entity_1 = require("../collaborators/collaborators.entity");
const typeorm_1 = require("typeorm");
let SkillsEntity = class SkillsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SkillsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tecnology' }),
    __metadata("design:type", String)
], SkillsEntity.prototype, "tecnology", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], SkillsEntity.prototype, "seniority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'years_experience' }),
    __metadata("design:type", Number)
], SkillsEntity.prototype, "yearsExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_position' }),
    __metadata("design:type", Boolean)
], SkillsEntity.prototype, "currentPosition", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collaborators_entity_1.CollaboratorsEntity, collaborators => collaborators.Skills),
    __metadata("design:type", Array)
], SkillsEntity.prototype, "Collaborator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], SkillsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], SkillsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime' }),
    __metadata("design:type", Date)
], SkillsEntity.prototype, "deletedAt", void 0);
SkillsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'skills' })
], SkillsEntity);
exports.SkillsEntity = SkillsEntity;
//# sourceMappingURL=skills.entity.js.map