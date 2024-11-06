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
exports.UserProfileService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const userProfile_schema_1 = require("./userProfile.schema");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
let UserProfileService = class UserProfileService {
    constructor(userProfileModel) {
        this.userProfileModel = userProfileModel;
    }
    async getResponses(userId) {
        const populatedResponses = await this.userProfileModel.find({ userId }).populate({ path: 'question', model: 'Questions' }).exec();
        return populatedResponses;
    }
    async saveResponses(addUserResponseDto) {
        const { userId, responses } = addUserResponseDto;
        const responseDocuments = responses.map(response => ({
            userId,
            questionId: response.questionId,
            answer: response.answer,
        }));
        try {
            const savedResponses = await this.userProfileModel.insertMany(responseDocuments);
            return { status: "ok", savedResponses };
        }
        catch (error) {
            console.error("Error saving responses:", error);
            throw new Error("Could not save user responses.");
        }
    }
};
exports.UserProfileService = UserProfileService;
exports.UserProfileService = UserProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(userProfile_schema_1.UserProfile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserProfileService);
//# sourceMappingURL=userProfile.service.js.map