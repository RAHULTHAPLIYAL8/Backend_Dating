import { Questions } from "src/questions/questions.schema";
import { Schema as MongooseSchema } from "mongoose";
import { Document } from "mongoose";
export declare class UserProfile extends Document {
    question: Questions;
    questionId: string;
    answer: string;
    userId: string;
    timestamp: Date;
}
export declare const UserProfileSchema: MongooseSchema<UserProfile, import("mongoose").Model<UserProfile, any, any, any, Document<unknown, any, UserProfile> & UserProfile & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserProfile, Document<unknown, {}, import("mongoose").FlatRecord<UserProfile>> & import("mongoose").FlatRecord<UserProfile> & Required<{
    _id: unknown;
}>>;
