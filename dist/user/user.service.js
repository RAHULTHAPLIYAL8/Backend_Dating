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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin_schema_1 = require("../admin/admin.schema");
const stripe_1 = __importDefault(require("stripe"));
let UserService = class UserService {
    constructor(userModel, adminmodel, configService) {
        this.userModel = userModel;
        this.adminmodel = adminmodel;
        this.configService = configService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2024-06-20',
        });
    }
    async createCheckoutSession(amount, currency) {
        try {
            return await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency,
                            product_data: {
                                name: 'Rahul Thapliyal',
                            },
                            unit_amount: amount,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'https://your-site.com/success',
                cancel_url: 'https://your-site.com/cancel',
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async create(createUserDto) {
        try {
            createUserDto.status = "pending";
            const check = await this.userModel.findOne({ email: createUserDto.email }).exec();
            console.log;
            if (check) {
                return { status: "", message: "Email already exists" };
            }
            const createdUser = new this.userModel(createUserDto);
            const savedUser = await createdUser.save();
            return { status: "ok", value: savedUser };
        }
        catch (error) {
            return { status: "error", message: error.message };
        }
    }
    async getAllUsers() {
        return this.userModel.find().exec();
    }
    async findAdminAll() {
        return this.adminmodel.find().exec();
    }
    async findUsersByStatus(status) {
        return this.userModel.find({ status }).exec();
    }
    async updateStatus(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_2.NotFoundException('User not found');
        }
        user.status = "approve";
        return user.save();
    }
    async notStatus(userId) {
        const user = await this.userModel.findOne({ email: userId });
        if (!user) {
            throw new common_2.NotFoundException('User not found');
        }
        user.status = "not-approved";
        return user.save();
    }
    async findByEmail(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordMatching = user.password === password;
        if (!isPasswordMatching) {
            throw new Error('Invalid password');
        }
        return user;
    }
    async updatePassword(id, newPassword) {
        return this.userModel.findByIdAndUpdate(id, { password: newPassword }, { new: true }).exec();
    }
    async sendRequest(senderEmail, receiverEmail) {
        const sender = await this.userModel.findOne({ email: senderEmail }).exec();
        console.log(sender);
        const receiver = await this.userModel.findOne({ email: receiverEmail }).exec();
        if (!sender) {
            throw new common_2.NotFoundException('Sender not found');
        }
        if (!receiver) {
            throw new common_2.NotFoundException('Receiver not found');
        }
        const existingRequest = receiver.friendRequests.find((req) => req.senderId === sender._id.toString() && req.status === 'pending');
        if (existingRequest) {
            throw new common_3.BadRequestException('Friend request already sent');
        }
        receiver.friendRequests.push({
            senderId: sender._id.toString(),
            status: 'pending',
        });
        await receiver.save();
        return { message: 'Friend request sent successfully' };
    }
    async acceptRequest(senderEmail, receiverEmail) {
        const receiver = await this.userModel.findOne({ email: receiverEmail }).exec();
        const sender = await this.userModel.findOne({ email: senderEmail }).exec();
        if (!receiver) {
            throw new common_2.NotFoundException('Receiver not found');
        }
        if (!sender) {
            throw new common_2.NotFoundException('Sender not found');
        }
        const request = receiver.friendRequests.find((req) => req.senderId === sender._id.toString() && req.status === 'pending');
        if (!request) {
            throw new common_2.NotFoundException('Friend request not found or already processed');
        }
        request.status = 'accepted';
        if (!receiver.friends.includes(sender._id.toString())) {
            receiver.friends.push(sender._id.toString());
        }
        if (!sender.friends.includes(receiver._id.toString())) {
            sender.friends.push(receiver._id.toString());
        }
        await receiver.save();
        await sender.save();
        return { message: 'Friend request accepted successfully' };
    }
    async mailTransport(email) {
        const user = await this.userModel.findOne({ email });
        console.log(user);
        if (!user) {
            throw new common_2.NotFoundException('User not found');
        }
        const resetToken = user.id;
        return { status: "ok", token: resetToken };
    }
    async admincreate(createAdminDto) {
        const sender = await this.userModel.findOne({ email: createAdminDto.email }).exec();
        try {
            if (sender) {
                const createdUser = new this.adminmodel(createAdminDto);
                const savedUser = await createdUser.save();
                return { status: "ok", message: savedUser };
            }
            else {
                return { status: "error", message: "Error by user" };
            }
        }
        catch (error) {
            return { status: "error", message: error.message };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model, config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map