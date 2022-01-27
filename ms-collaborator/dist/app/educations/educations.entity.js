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
exports.EducationsEntity = void 0;
const typeorm_1 = require("typeorm");
const collaborators_entity_1 = require("../collaborators/collaborators.entity");
let EducationsEntity = class EducationsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EducationsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'schooling' }),
    __metadata("design:type", Number)
], EducationsEntity.prototype, "schooling", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'course' }),
    __metadata("design:type", String)
], EducationsEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'institution' }),
    __metadata("design:type", String)
], EducationsEntity.prototype, "institution", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'situation', type: 'int' }),
    __metadata("design:type", Number)
], EducationsEntity.prototype, "situation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collaborators_entity_1.CollaboratorsEntity, collaborator => collaborator.Educations),
    __metadata("design:type", collaborators_entity_1.CollaboratorsEntity)
], EducationsEntity.prototype, "Collaborator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], EducationsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], EducationsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], EducationsEntity.prototype, "deletedAt", void 0);
EducationsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'educations' })
], EducationsEntity);
exports.EducationsEntity = EducationsEntity;
//# sourceMappingURL=educations.entity.js.map