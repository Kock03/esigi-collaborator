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
exports.FinancialsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const financials_entity_1 = require("./financials.entity");
let FinancialsService = class FinancialsService {
    constructor(financialsRepository) {
        this.financialsRepository = financialsRepository;
    }
    async findAll() {
        const financialsWhiteCollaborator = await this.financialsRepository
            .createQueryBuilder('financials')
            .getMany();
        return financialsWhiteCollaborator;
    }
    async findOneOrFail(conditions, options) {
        options = { relations: ['Collaborator'] };
        try {
            return await this.financialsRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const financial = this.financialsRepository.create(data);
        return await this.financialsRepository.save(financial);
    }
    async update(id, data) {
        const financial = await this.financialsRepository.findOneOrFail({ id });
        this.financialsRepository.merge(financial, data);
        return await this.financialsRepository.save(financial);
    }
    async destroy(id) {
        await this.financialsRepository.findOneOrFail({ id });
        return await this.financialsRepository.softDelete({ id });
    }
};
FinancialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(financials_entity_1.FinancialsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FinancialsService);
exports.FinancialsService = FinancialsService;
//# sourceMappingURL=financials.service.js.map