"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const questions_schema_1 = require("./questions.schema");
const questions_service_1 = require("./questions.service");
const questions_controller_1 = require("./questions.controller");
let QuestionModule = class QuestionModule {
};
exports.QuestionModule = QuestionModule;
exports.QuestionModule = QuestionModule = __decorate([
    (0, common_1.Module)({ imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: questions_schema_1.Questions.name,
                    schema: questions_schema_1.QuestionSchema
                }
            ])
        ],
        providers: [questions_service_1.QuestionService],
        controllers: [questions_controller_1.QuestionController],
        exports: [mongoose_1.MongooseModule]
    })
], QuestionModule);
//# sourceMappingURL=questions.module.js.map