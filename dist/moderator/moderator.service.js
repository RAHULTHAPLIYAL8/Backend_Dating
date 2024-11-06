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
exports.ModeratorService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const moderator_schema_1 = require("./moderator.schema");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
let ModeratorService = class ModeratorService {
    constructor(moderatorModel) {
        this.moderatorModel = moderatorModel;
    }
    async createModerator(CreateModeratorDto) {
        const newModerator = new this.moderatorModel(CreateModeratorDto);
        return newModerator.save();
    }
    async login(loginModeratorDto) {
        const { email, password } = loginModeratorDto;
        const mod = await this.moderatorModel.findOne({ email }).exec();
        if (!mod) {
            throw new common_1.NotFoundException("Wrong Credentials");
        }
        if (password != mod.password) {
            return { status: "error", Password: "Password does not match" };
        }
        return { status: "ok", message: 'Login successful', value: mod };
    }
    async signup(signupModeratorDto) {
        const { name, email, password } = signupModeratorDto;
        const mod = await this.moderatorModel.findOne({ email }).exec();
        if (mod) {
            return { status: "error", message: "Email already exists" };
        }
        const newMod = new this.moderatorModel(signupModeratorDto);
        const savedMod = await newMod.save();
        return { status: "ok", value: savedMod };
    }
};
exports.ModeratorService = ModeratorService;
exports.ModeratorService = ModeratorService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(moderator_schema_1.Moderator.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ModeratorService);
//# sourceMappingURL=moderator.service.js.map