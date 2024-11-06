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
exports.AdminSchema = exports.Admin = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Admin = class Admin {
};
exports.Admin = Admin;
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000, required: false }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "relationshipGoals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "idealPartner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "hobbiesAndInterests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "favoriteActivities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "valuesAndBeliefs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "favoriteBooksAndMovies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "travelExperiences", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "lifeAchievements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "futureAspirations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "describeYourself", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "workLifeBalance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "favoriteQuotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "mostProudOf", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "biggestChallenges", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "favoriteFoods", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "mostImportantLifeLesson", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], Admin.prototype, "favoriteVacationSpots", void 0);
exports.Admin = Admin = __decorate([
    (0, mongoose_1.Schema)()
], Admin);
exports.AdminSchema = mongoose_1.SchemaFactory.createForClass(Admin);
//# sourceMappingURL=admin.schema.js.map