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
exports.FinancialsEntity = void 0;
const collaborators_entity_1 = require("../collaborators/collaborators.entity");
const typeorm_1 = require("typeorm");
const contract_types_enum_1 = require("./dtos/contract-types.enum");
let FinancialsEntity = class FinancialsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FinancialsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_type', type: 'int' }),
    __metadata("design:type", Number)
], FinancialsEntity.prototype, "contractType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value' }),
    __metadata("design:type", Number)
], FinancialsEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reason', type: 'int' }),
    __metadata("design:type", Number)
], FinancialsEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => collaborators_entity_1.CollaboratorsEntity, (collaborator) => collaborator.Financials),
    __metadata("design:type", collaborators_entity_1.CollaboratorsEntity)
], FinancialsEntity.prototype, "Collaborator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'date_inclusion' }),
    __metadata("design:type", Date)
], FinancialsEntity.prototype, "dateInclusion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], FinancialsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime' }),
    __metadata("design:type", Date)
], FinancialsEntity.prototype, "deletedAt", void 0);
FinancialsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'financials' })
], FinancialsEntity);
exports.FinancialsEntity = FinancialsEntity;
//# sourceMappingURL=financials.entity.js.map