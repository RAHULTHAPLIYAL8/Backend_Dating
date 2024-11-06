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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const forget_dto_1 = require("./dto/forget.dto");
const login_dto_1 = require("./dto/login.dto");
const connect_dto_1 = require("./dto/connect.dto");
const update_dto_1 = require("./dto/update.dto");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    async login(loginDto) {
        const user = await this.userService.findByEmail(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.password !== loginDto.password) {
            return { status: "error", Password: "Password does not match" };
        }
        return { status: "ok", message: 'Login successful', value: user };
    }
    async Email(forgetDto) {
        try {
            const result = await this.userService.mailTransport(forgetDto.email);
            if (result) {
                return { status: "success", message: 'Your password reset request was successfull', token: `${result.token}` };
            }
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
    async admincrate(creadminDto) {
        return this.userService.admincreate(creadminDto);
    }
    async createPaymentIntent(body) {
        const { amount, currency } = body;
        const paymentIntent = await this.userService.createCheckoutSession(amount, currency);
        return paymentIntent;
    }
    async getPendingUsers() {
        return this.userService.findUsersByStatus('pending');
    }
    async approveUser(userId) {
        return this.userService.updateStatus(userId);
    }
    connectCall(res) {
        const VoiceResponse = require('twilio').twiml.VoiceResponse;
        const response = new VoiceResponse();
        response.dial('+917217873189');
        res.set('Content-Type', 'text/xml');
        res.send(response.toString());
    }
    async rejectUser(userId) {
        return this.userService.notStatus(userId);
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async findAdminAll() {
        return this.userService.findAdminAll();
    }
    async sendrequest(sendRequestDto) {
        return this.userService.sendRequest(sendRequestDto.senderId, sendRequestDto.receiverId);
    }
    async acceptrequest(sendRequestDto) {
        return this.userService.acceptRequest(sendRequestDto.senderId, sendRequestDto.receiverId);
    }
    async update(updateDto) {
        const user = await this.userService.updatePassword(updateDto.token, updateDto.password);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return { message: 'Update Successful' };
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This API endpoint allows new users to register for an account by providing necessary information such as their name, email, and password. Upon successful registration' }),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This API endpoint enables users to log into their accounts by submitting their email and password. Upon successful authentication, the user gains access to their account.' }),
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This endpoint initiates a password reset by verifying the users email, generating a reset token, and sending an email with a password reset link. The token is stored in the database with an expiration time. If the user doesnt exist, an error is returned.' }),
    (0, common_1.Post)('/forget-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_dto_1.ForgetDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Email", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Post)('/adddetails'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "admincrate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Post)('create-payment-intent'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createPaymentIntent", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Get)('pending-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPendingUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Patch)('/approve-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "approveUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Get)('connect'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "connectCall", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Patch)('reject-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "rejectUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '' }),
    (0, common_1.Get)("/alladmin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAdminAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'In this, we will include the user ID of the person we want to send a request to.' }),
    (0, common_1.Post)('/sendrequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connect_dto_1.SendRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendrequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'In this, the user can accept any friend request sent to them through this endpoint, and the sender can be added to their friend list.' }),
    (0, common_1.Post)('/acceptrequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connect_dto_1.SendRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "acceptrequest", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User Module'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map