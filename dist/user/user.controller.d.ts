import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgetDto } from './dto/forget.dto';
import { LoginDto } from './dto/login.dto';
import { SendRequestDto } from './dto/connect.dto';
import { User } from './user.schema';
import { UpdateDto } from './dto/update.dto';
import { SentMessageInfo } from 'nodemailer';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '../admin/admin.schema';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<object>;
    login(loginDto: LoginDto): Promise<object>;
    Email(forgetDto: ForgetDto): Promise<SentMessageInfo>;
    admincrate(creadminDto: CreateAdminDto): Promise<object>;
    createPaymentIntent(body: {
        amount: number;
        currency: string;
    }): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
    getPendingUsers(): Promise<User[]>;
    approveUser(userId: string): Promise<User>;
    connectCall(res: Response): void;
    rejectUser(userId: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findAdminAll(): Promise<Admin[]>;
    sendrequest(sendRequestDto: SendRequestDto): Promise<{
        message: string;
    }>;
    acceptrequest(sendRequestDto: SendRequestDto): Promise<{
        message: string;
    }>;
    update(updateDto: UpdateDto): Promise<{
        message: string;
    }>;
}
