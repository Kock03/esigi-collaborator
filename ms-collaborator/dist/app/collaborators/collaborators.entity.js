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
exports.CollaboratorsEntity = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("../address/address.entity");
const phone_entity_1 = require("../phone/phone.entity");
const bank_data_entity_1 = require("../bank-data/bank-data.entity");
const skills_entity_1 = require("../skills/skills.entity");
const collaborator_types_enum_1 = require("./dtos/collaborator-types.enum");
const financials_entity_1 = require("../financials/financials.entity");
const documents_entity_1 = require("../documents/documents.entity");
const languages_entity_1 = require("../languages/languages.entity");
const educations_entity_1 = require("../educations/educations.entity");
let CollaboratorsEntity = class CollaboratorsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'firstname_corporatename' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "firstNameCorporateName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lastname_fantasyname' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "lastNameFantasyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'login' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'int' }),
    __metadata("design:type", Number)
], CollaboratorsEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'office' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "office", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'collaborator_types' }),
    __metadata("design:type", Number)
], CollaboratorsEntity.prototype, "collaboratorTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cpf', unique: true, length: 11 }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'birth_date' }),
    __metadata("design:type", Date)
], CollaboratorsEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cnpj', length: 14 }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_registration' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "stateRegistration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'municipal_inscription' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "municipalInscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'site' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'linkedin' }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "linkedin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'photo', type: 'blob', nullable: true }),
    __metadata("design:type", String)
], CollaboratorsEntity.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.AddressEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.AddressEntity)
], CollaboratorsEntity.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skills_entity_1.SkillsEntity, (skills) => skills.Collaborator, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], CollaboratorsEntity.prototype, "Skills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documents_entity_1.DocumentsEntity, (documents) => documents.Collaborator, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], CollaboratorsEntity.prototype, "Documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => languages_entity_1.LanguagesEntity, (languages) => languages.Collaborator, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], CollaboratorsEntity.prototype, "Languages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => educations_entity_1.EducationsEntity, (educations) => educations.Collaborator, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], CollaboratorsEntity.prototype, "Educations", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => phone_entity_1.PhoneEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", phone_entity_1.PhoneEntity)
], CollaboratorsEntity.prototype, "Phone", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bank_data_entity_1.BankDataEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", bank_data_entity_1.BankDataEntity)
], CollaboratorsEntity.prototype, "BankData", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => financials_entity_1.FinancialsEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", financials_entity_1.FinancialsEntity)
], CollaboratorsEntity.prototype, "Financials", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CollaboratorsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CollaboratorsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], CollaboratorsEntity.prototype, "deletedAt", void 0);
CollaboratorsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'collaborators' })
], CollaboratorsEntity);
exports.CollaboratorsEntity = CollaboratorsEntity;
//# sourceMappingURL=collaborators.entity.js.map