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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_admin_dto_1 = require("../user/dto/create-admin.dto");
const common_2 = require("@nestjs/common");
const connect_dto_1 = require("../user/dto/connect.dto");
const swagger_1 = require("@nestjs/swagger");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async admincrate(creadminDto) {
        return this.adminService.admincreate(creadminDto);
    }
    async updateAdmin(email, updateData) {
        return this.adminService.adminUpdate(email, updateData);
    }
    async findadmin(email) {
        return this.adminService.adminFind(email);
    }
    async matchPair(matchrequestdto) {
        console.log(matchrequestdto.admin1, matchrequestdto.admin2, matchrequestdto.match);
        const data = await this.adminService.matchrate(matchrequestdto.admin1, matchrequestdto.admin2, matchrequestdto.match);
        return { status: "ok", value: data.matchrate };
    }
    async adminDelete(email) {
        return this.adminService.adminDelete(email);
    }
    async bucketList() {
        return this.adminService.Bucketlist();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_2.Post)('/adddetails'),
    (0, swagger_1.ApiOperation)({ summary: 'Not in use' }),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "admincrate", null);
__decorate([
    (0, common_2.Patch)(':email'),
    (0, common_2.HttpCode)(common_2.HttpStatus.OK),
    __param(0, (0, common_2.Param)('email')),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_2.Patch)('/find:email'),
    (0, common_2.HttpCode)(common_2.HttpStatus.OK),
    __param(0, (0, common_2.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findadmin", null);
__decorate([
    (0, common_2.Post)('/matchpair'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connect_dto_1.MatchRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "matchPair", null);
__decorate([
    (0, common_2.Delete)(':email'),
    (0, common_2.HttpCode)(common_2.HttpStatus.OK),
    __param(0, (0, common_2.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminDelete", null);
__decorate([
    (0, common_2.Get)('bucketlist'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "bucketList", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Module'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map