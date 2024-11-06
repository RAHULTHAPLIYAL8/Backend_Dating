import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Admin, AdminDocument } from '../admin/admin.schema';
import Stripe from 'stripe';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class UserService {
    private userModel;
    private adminmodel;
    private configService;
    private stripe;
    constructor(userModel: Model<UserDocument>, adminmodel: Model<AdminDocument>, configService: ConfigService);
    createCheckoutSession(amount: number, currency: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    create(createUserDto: CreateUserDto): Promise<object>;
    getAllUsers(): Promise<User[]>;
    findAdminAll(): Promise<Admin[]>;
    findUsersByStatus(status: string): Promise<User[]>;
    updateStatus(userId: string): Promise<User>;
    notStatus(userId: string): Promise<User>;
    findByEmail(email: string, password: string): Promise<User>;
    updatePassword(id: string, newPassword: string): Promise<User | null>;
    sendRequest(senderEmail: string, receiverEmail: string): Promise<{
        message: string;
    }>;
    acceptRequest(senderEmail: string, receiverEmail: string): Promise<{
        message: string;
    }>;
    mailTransport(email: string): Promise<{
        status: string;
        token: any;
    }>;
    admincreate(createAdminDto: CreateAdminDto): Promise<object>;
}
