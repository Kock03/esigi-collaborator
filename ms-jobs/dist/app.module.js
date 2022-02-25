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
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const jobs_module_1 = require("./app/jobs/jobs.module");
const knowledges_module_1 = require("./app/knowledges/knowledges.module");
const languages_module_1 = require("./app/languages/languages.module");
const seniorities_module_1 = require("./app/seniorities/seniorities.module");
const behavioral_interviews_module_1 = require("./app/behavioral-interviews/behavioral-interviews.module");
const client_interviews_module_1 = require("./app/client-interviews/client-interviews.module");
const technical_interviews_module_1 = require("./app/technical-interviews/technical-interviews.module");
const returns_module_1 = require("./app/returns/returns.module");
const hiring_preferences_module_1 = require("./app/hiring-preferences/hiring-preferences.module");
const interviews_module_1 = require("./app/interviews/interviews.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.TYPEORM_CONNECTION,
                host: process.env.TYPEORM_HOST,
                port: process.env.TYPEORM_PORT,
                username: process.env.TYPEORM_USERNAME,
                password: process.env.TYPEORM_PASSWORD,
                database: process.env.TYPEORM_DATABASE,
                entities: [__dirname + '/**/*.entity{.js,.ts}'],
                synchronize: true,
                namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            }),
            jobs_module_1.JobsModule,
            knowledges_module_1.KnowledgesModule,
            seniorities_module_1.SenioritiesModule,
            languages_module_1.LanguagesModule,
            behavioral_interviews_module_1.BehavioralInterviewsModule,
            technical_interviews_module_1.TechnicalInterviewsModule,
            client_interviews_module_1.ClientInterviewsModule,
            returns_module_1.ReturnsModule,
            hiring_preferences_module_1.HiringPreferencesModule,
            interviews_module_1.InterviewsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map