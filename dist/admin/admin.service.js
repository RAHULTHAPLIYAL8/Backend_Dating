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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin_schema_1 = require("./admin.schema");
const config_1 = require("@nestjs/config");
const stripe_1 = __importDefault(require("stripe"));
const user_schema_1 = require("../user/user.schema");
const common_2 = require("@nestjs/common");
let AdminService = class AdminService {
    constructor(userModel, adminmodel, configService) {
        this.userModel = userModel;
        this.adminmodel = adminmodel;
        this.configService = configService;
        this.tokenize = (sentence) => {
            console.log(sentence + "Hello my name is Rahul Thapliyal");
            return sentence.toLowerCase().replace(/[^\w\s]|_/g, "").split(/\s+/);
        };
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2024-06-20',
        });
    }
    async admincreate(createAdminDto) {
        const sender = await this.userModel.findOne({ email: createAdminDto.email }).exec();
        try {
            if (sender) {
                const createdUser = new this.adminmodel(createAdminDto);
                const savedUser = await createdUser.save();
                return { status: "Ok", message: savedUser };
            }
            else {
                return { status: "erro", message: "User not found" };
            }
        }
        catch (error) {
            return { status: "error", message: error.message };
        }
    }
    async adminUpdate(email, updateData) {
        try {
            const adminToUpdate = await this.adminmodel.findOne({ email }).exec();
            if (!adminToUpdate) {
                return { status: "error", message: "Admin not found" };
            }
            const updatedAdmin = await this.adminmodel.findOneAndUpdate({ email }, { $set: updateData }, { new: true }).exec();
            return { status: "Ok", message: "Admin updated successfully", data: updatedAdmin };
        }
        catch (error) {
            return { status: "error", message: error.message };
        }
    }
    async adminDelete(email) {
        try {
            const adminToDelete = await this.adminmodel.findOne({ email }).exec();
            console.log(email);
            if (!adminToDelete) {
                return { status: "error", message: "Admin not found" };
            }
            await this.adminmodel.deleteOne({ email }).exec();
            return { status: "Ok", message: `Admin with email ${email} has been deleted` };
        }
        catch (error) {
            return { status: "error", message: email };
        }
    }
    async adminFind(email) {
        try {
            const adminDelete = await this.adminmodel.findOne({ email }).exec();
            if (adminDelete) {
                return { status: "error", message: "user not found" };
            }
        }
        catch (error) {
            return { status: "error", message: "user not found" };
        }
    }
    async matchrate(admin1Email, admin2Email, match) {
        const user1 = await this.userModel.findOne({ email: admin1Email }).exec();
        const user2 = await this.userModel.findOne({ email: admin2Email }).exec();
        const admin1 = await this.adminmodel.findOne({ email: admin1Email }).exec();
        const admin2 = await this.adminmodel.findOne({ email: admin2Email }).exec();
        if (!admin1) {
            throw new common_2.NotFoundException('Sender not found');
        }
        if (!admin2) {
            throw new common_2.NotFoundException('Receiver not found');
        }
        const info1 = admin1[match];
        const info2 = admin2[match];
        const tokens1 = new Set(this.tokenize(info1));
        const tokens2 = new Set(this.tokenize(info2));
        console.log(tokens1);
        console.log(tokens2);
        const intersection = new Set([...tokens1].filter(token => tokens2.has(token)));
        const union = new Set([...tokens1, ...tokens2]);
        const similarity = intersection.size / union.size;
        const result = (similarity * 100).toFixed(2);
        return { status: "ok", matchrate: result, Detail: match };
    }
    async Bucketlist() {
        const males = await this.userModel.find({ gender: 'male', status: 'approve' }).exec();
        const females = await this.userModel.find({ gender: 'female', status: 'approve' }).exec();
        return { males, females };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model, config_1.ConfigService])
], AdminService);
//# sourceMappingURL=admin.service.js.map