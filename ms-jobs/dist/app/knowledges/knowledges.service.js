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
exports.KnowledgesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const knowledges_entity_1 = require("./knowledges.entity");
let KnowledgesService = class KnowledgesService {
    constructor(knowledgesRepository) {
        this.knowledgesRepository = knowledgesRepository;
    }
    async findAll() {
        const knowledgesWhiteAll = await this.knowledgesRepository
            .createQueryBuilder('knowledges')
            .getMany();
        return knowledgesWhiteAll;
    }
    async findOneOrfail(conditions, options) {
        options = { relations: ['Job'] };
        try {
            return await this.knowledgesRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const knowledge = this.knowledgesRepository.create(data);
        return await this.knowledgesRepository.save(knowledge);
    }
    async update(id, data) {
        const knowledge = await this.knowledgesRepository.findOneOrFail({ id });
        this.knowledgesRepository.merge(knowledge, data);
        return await this.knowledgesRepository.save(knowledge);
    }
    async destroy(id) {
        const knowledge = await this.knowledgesRepository.findOneOrFail({ id });
        return await this.knowledgesRepository.softDelete(knowledge);
    }
};
KnowledgesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(knowledges_entity_1.KnowledgesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], KnowledgesService);
exports.KnowledgesService = KnowledgesService;
//# sourceMappingURL=knowledges.service.js.map