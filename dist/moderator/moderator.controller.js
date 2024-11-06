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
exports.ModeratorController = void 0;
const common_1 = require("@nestjs/common");
const createModerator_dto_1 = require("./dto/createModerator.dto");
const moderator_service_1 = require("./moderator.service");
const user_service_1 = require("../user/user.service");
const userProfile_service_1 = require("../userProfile/userProfile.service");
const loginModerator_dto_1 = require("./dto/loginModerator.dto");
const signupModerator_dto_1 = require("./dto/signupModerator.dto");
const swagger_1 = require("@nestjs/swagger");
let ModeratorController = class ModeratorController {
    constructor(modertaorService, userService, userProfileService) {
        this.modertaorService = modertaorService;
        this.userService = userService;
        this.userProfileService = userProfileService;
    }
    async createModerator(createModeratorDto) {
        return this.modertaorService.createModerator(createModeratorDto);
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getAllUsersProfiles(userId) {
        return this.userProfileService.getResponses(userId);
    }
    async adminLogin(loginModeratorDto) {
        return this.modertaorService.login(loginModeratorDto);
    }
    async adminSignup(signupModeratorDto) {
        return this.modertaorService.signup(signupModeratorDto);
    }
};
exports.ModeratorController = ModeratorController;
__decorate([
    (0, common_1.Post)('/create-moderator'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createModerator_dto_1.CreateModeratorDto]),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "createModerator", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'In this, we are displaying the  details of all users to the current  admin.' }),
    (0, common_1.Get)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'In this endpoint, we are  retrieving the information of a particular  user based on their user ID and returning it  in the response.' }),
    (0, common_1.Get)('/users-profiles/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "getAllUsersProfiles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'In this, we are verifying the  email and password so that the user can  access the admin panel.' }),
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginModerator_dto_1.LoginModeratorDto]),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "adminLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'In this, we are taking the  moderator name, email, and password,  allowing them to create their own admin  account' }),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signupModerator_dto_1.SignupModeratorDto]),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "adminSignup", null);
exports.ModeratorController = ModeratorController = __decorate([
    (0, swagger_1.ApiTags)('Moderator Module'),
    (0, common_1.Controller)('moderator'),
    __metadata("design:paramtypes", [moderator_service_1.ModeratorService,
        user_service_1.UserService,
        userProfile_service_1.UserProfileService])
], ModeratorController);
//# sourceMappingURL=moderator.controller.js.map