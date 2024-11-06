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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const createQuestion_dto_1 = require("./dto/createQuestion.dto");
const questions_service_1 = require("./questions.service");
const swagger_1 = require("@nestjs/swagger");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async createQuestion(createQuestionDto) {
        return this.questionService.createQuestion(createQuestionDto);
    }
    async getQuestions() {
        return this.questionService.getQuestions();
    }
    async deleteQuestions(questionId) {
        return this.questionService.deleteQuestion(questionId);
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Post)('/create-question'),
    (0, swagger_1.ApiOperation)({ summary: 'Create Question in the Master Table' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuestion_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)('/get-questions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get All Questions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Delete)('/delete-question/:questionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete any question using question ID' }),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteQuestions", null);
exports.QuestionController = QuestionController = __decorate([
    (0, swagger_1.ApiTags)('Question Module'),
    (0, common_1.Controller)('moderator'),
    __metadata("design:paramtypes", [questions_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=questions.controller.js.map