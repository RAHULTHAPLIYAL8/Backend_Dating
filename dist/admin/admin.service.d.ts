import { Model } from 'mongoose';
import { AdminDocument } from './admin.schema';
import { ConfigService } from '@nestjs/config';
import { CreateAdminDto } from '../user/dto/create-admin.dto';
import { User } from 'src/user/user.schema';
import { UserDocument } from 'src/user/user.schema';
export declare class AdminService {
    private userModel;
    private adminmodel;
    private configService;
    private stripe;
    constructor(userModel: Model<UserDocument>, adminmodel: Model<AdminDocument>, configService: ConfigService);
    tokenize: (sentence: string) => string[];
    admincreate(createAdminDto: CreateAdminDto): Promise<object>;
    adminUpdate(email: string, updateData: Partial<CreateAdminDto>): Promise<object>;
    adminDelete(email: string): Promise<object>;
    adminFind(email: string): Promise<object>;
    matchrate(admin1Email: string, admin2Email: string, match: string): Promise<{
        status: string;
        matchrate: string;
        Detail: string;
    }>;
    Bucketlist(): Promise<{
        males: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
        females: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
}
