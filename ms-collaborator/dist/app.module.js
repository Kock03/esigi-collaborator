"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const bank_data_module_1 = require("./app/bank-data/bank-data.module");
const phone_module_1 = require("./app/phone/phone.module");
const address_module_1 = require("./app/address/address.module");
const skills_module_1 = require("./app/skills/skills.module");
const typeorm_1 = require("@nestjs/typeorm");
const financials_module_1 = require("./app/financials/financials.module");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const config_1 = require("@nestjs/config");
const documents_module_1 = require("./app/documents/documents.module");
const educations_module_1 = require("./app/educations/educations.module");
const languages_module_1 = require("./app/languages/languages.module");
const collaborators_module_1 = require("./app/collaborators/collaborators.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(), typeorm_1.TypeOrmModule.forRoot({
                type: process.env.TYPEORM_CONNECTION,
                host: process.env.TYPEORM_HOST,
                port: process.env.TYPEORM_PORT,
                username: process.env.TYPEORM_USERNAME,
                password: process.env.TYPEORM_PASSWORD,
                database: process.env.TYPEORM_DATABASE,
                entities: [__dirname + '/**/*.entity{.js,.ts}'],
                synchronize: true,
                namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
            }),
            bank_data_module_1.BankDataModule,
            phone_module_1.PhoneModule,
            address_module_1.AddressModule,
            skills_module_1.SkillsModule,
            collaborators_module_1.CollaboratorsModule,
            financials_module_1.FinancialsModule,
            documents_module_1.DocumentsModule,
            educations_module_1.EducationsModule,
            languages_module_1.LanguagesModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map