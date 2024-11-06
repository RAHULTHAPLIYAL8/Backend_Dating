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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileSchema = exports.UserProfile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const questions_schema_1 = require("../questions/questions.schema");
const mongoose_2 = require("@nestjs/mongoose");
const mongoose_3 = require("mongoose");
const mongoose_4 = require("mongoose");
let UserProfile = class UserProfile extends mongoose_4.Document {
};
exports.UserProfile = UserProfile;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Schema.Types.ObjectId, ref: 'Questions' }),
    __metadata("design:type", questions_schema_1.Questions)
], UserProfile.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserProfile.prototype, "questionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "answer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], UserProfile.prototype, "timestamp", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, mongoose_2.Schema)()
], UserProfile);
exports.UserProfileSchema = mongoose_2.SchemaFactory.createForClass(UserProfile);
//# sourceMappingURL=userProfile.schema.js.map