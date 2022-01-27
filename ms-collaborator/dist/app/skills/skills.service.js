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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const skills_entity_1 = require("./skills.entity");
let SkillsService = class SkillsService {
    constructor(skillsRepository) {
        this.skillsRepository = skillsRepository;
    }
    async findAll() {
        const skillsWhiteCollaborator = await this.skillsRepository
            .createQueryBuilder('skills')
            .getMany();
        return skillsWhiteCollaborator;
    }
    async findOneOrFail(conditions, options) {
        options = { relations: ['Collaborator'] };
        try {
            return await this.skillsRepository.findOneOrFail(conditions, options);
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async store(skillsDto) {
        const skill = this.skillsRepository.create(skillsDto);
        return await this.skillsRepository.save(skill);
    }
    async update(id, skillsDto) {
        const skill = await this.skillsRepository.findOneOrFail({ id });
        this.skillsRepository.merge(skill, skillsDto);
        return await this.skillsRepository.save(skill);
    }
    async destroy(id) {
        await this.skillsRepository.findOneOrFail({ id });
        return await this.skillsRepository.softDelete({ id });
    }
};
SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skills_entity_1.SkillsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillsService);
exports.SkillsService = SkillsService;
//# sourceMappingURL=skills.service.js.map