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
exports.BankDataEntity = void 0;
const collaborators_entity_1 = require("../collaborators/collaborators.entity");
const typeorm_1 = require("typeorm");
const account_types_enum_1 = require("./dtos/account-types.enum");
let BankDataEntity = class BankDataEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BankDataEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank' }),
    __metadata("design:type", String)
], BankDataEntity.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agency' }),
    __metadata("design:type", String)
], BankDataEntity.prototype, "agency", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_typet' }),
    __metadata("design:type", Number)
], BankDataEntity.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_number', type: 'int' }),
    __metadata("design:type", Number)
], BankDataEntity.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'digit', type: 'int' }),
    __metadata("design:type", Number)
], BankDataEntity.prototype, "digit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_account_digit', type: 'int' }),
    __metadata("design:type", Number)
], BankDataEntity.prototype, "bankAccountDigit", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => collaborators_entity_1.CollaboratorsEntity, collaborator => collaborator.BankData),
    __metadata("design:type", collaborators_entity_1.CollaboratorsEntity)
], BankDataEntity.prototype, "Collaborator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], BankDataEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], BankDataEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime' }),
    __metadata("design:type", Date)
], BankDataEntity.prototype, "deletedAt", void 0);
BankDataEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'bank_data' })
], BankDataEntity);
exports.BankDataEntity = BankDataEntity;
//# sourceMappingURL=bank-data.entity.js.map