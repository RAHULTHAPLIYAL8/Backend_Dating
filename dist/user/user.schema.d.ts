import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    gender: string;
    status: string;
    friends: string[];
    friendRequests: {
        senderId: string;
        status: 'pending' | 'accepted' | 'rejected';
    }[];
    phone?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;