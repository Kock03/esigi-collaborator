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
exports.SenioritiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const not_found_exception_1 = require("../exceptions/not-found-exception");
const seniorities_entity_1 = require("./seniorities.entity");
let SenioritiesService = class SenioritiesService {
    constructor(senioritiesRepository) {
        this.senioritiesRepository = senioritiesRepository;
    }
    async findAll() {
        const senioritiesWhiteAll = await this.senioritiesRepository
            .createQueryBuilder('seniorities')
            .getMany();
        return senioritiesWhiteAll;
    }
    async findOneOrfail(conditions, options) {
        options = { relations: ['Job'] };
        try {
            return await this.senioritiesRepository.findOneOrFail(conditions, options);
        }
        catch (_a) {
            throw new not_found_exception_1.NotFoundException();
        }
    }
    async store(data) {
        const seniority = this.senioritiesRepository.create(data);
        return await this.senioritiesRepository.save(seniority);
    }
    async update(id, data) {
        try {
            const seniority = await this.senioritiesRepository.findOneOrFail({ id });
        }
        catch (_a) {
            throw new not_found_exception_1.NotFoundException();
        }
        return await this.senioritiesRepository.save(Object.assign({ id: id }, data));
    }
    async destroy(id) {
        try {
            await this.senioritiesRepository.findOneOrFail({ id });
        }
        catch (_a) {
            throw new not_found_exception_1.NotFoundException();
        }
        return await this.senioritiesRepository.softDelete({ id });
    }
};
SenioritiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seniorities_entity_1.SenioritiesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SenioritiesService);
exports.SenioritiesService = SenioritiesService;
//# sourceMappingURL=seniorities.service.js.map