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
exports.QuestionSchema = exports.Questions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const moderator_schema_1 = require("../moderator/moderator.schema");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let Questions = class Questions extends mongoose_3.Document {
};
exports.Questions = Questions;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Questions.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Questions.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Moderator' }),
    __metadata("design:type", moderator_schema_1.Moderator)
], Questions.prototype, "moderator", void 0);
exports.Questions = Questions = __decorate([
    (0, mongoose_1.Schema)()
], Questions);
exports.QuestionSchema = mongoose_1.SchemaFactory.createForClass(Questions);
//# sourceMappingURL=questions.schema.js.map