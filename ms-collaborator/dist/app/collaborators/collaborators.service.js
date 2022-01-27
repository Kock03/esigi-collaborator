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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collaborators_entity_1 = require("./collaborators.entity");
let CollaboratorsService = class CollaboratorsService {
    constructor(collaboratorsRepository) {
        this.collaboratorsRepository = collaboratorsRepository;
    }
    async findAll() {
        const collaboratorsWhiteAll = await this.collaboratorsRepository
            .createQueryBuilder('collaborators')
            .getMany();
        return collaboratorsWhiteAll;
    }
    async findOneOrFail(conditions, options) {
        options = { relations: ['BankData', 'Educations', 'Languages', 'Documents', 'Skills', 'Phone', 'Address'] };
        try {
            return await this.collaboratorsRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const collaborator = this.collaboratorsRepository.create(data);
        return await this.collaboratorsRepository.save(collaborator);
    }
    async update(id, data) {
        const collaborator = await this.collaboratorsRepository.findOneOrFail({ id });
        this.collaboratorsRepository.merge(collaborator, data);
        return await this.collaboratorsRepository.save(collaborator);
    }
    async destroy(id) {
        this.collaboratorsRepository.findOneOrFail({ id });
        return await this.collaboratorsRepository.softDelete({ id });
    }
};
CollaboratorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collaborators_entity_1.CollaboratorsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CollaboratorsService);
exports.CollaboratorsService = CollaboratorsService;
//# sourceMappingURL=collaborators.service.js.map