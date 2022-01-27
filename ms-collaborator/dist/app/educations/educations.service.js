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
exports.EducationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const educations_entity_1 = require("./educations.entity");
let EducationsService = class EducationsService {
    constructor(educationsRepository) {
        this.educationsRepository = educationsRepository;
    }
    async findAll() {
        const educationsWhiteCollaborator = await this.educationsRepository
            .createQueryBuilder('educations')
            .getMany();
        return educationsWhiteCollaborator;
    }
    async findOneOrFail(conditions, options) {
        options = { relations: ['Collaborator'] };
        try {
            return await this.educationsRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(data) {
        const financial = this.educationsRepository.create(data);
        return await this.educationsRepository.save(financial);
    }
    async update(id, data) {
        const education = await this.educationsRepository.findOneOrFail({ id });
        this.educationsRepository.merge(education, data);
        return await this.educationsRepository.save(education);
    }
    async destroy(id) {
        await this.educationsRepository.findOneOrFail({ id });
        return await this.educationsRepository.softDelete({ id });
    }
};
EducationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(educations_entity_1.EducationsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EducationsService);
exports.EducationsService = EducationsService;
//# sourceMappingURL=educations.service.js.map