import { Moderator } from "../moderator/moderator.schema";
import { Schema as MongooseSchema } from "mongoose";
import { Document } from "mongoose";
export declare class Questions extends Document {
    question: string;
    description: string;
    moderator: Moderator;
}
export declare const QuestionSchema: MongooseSchema<Questions, import("mongoose").Model<Questions, any, any, any, Document<unknown, any, Questions> & Questions & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Questions, Document<unknown, {}, import("mongoose").FlatRecord<Questions>> & import("mongoose").FlatRecord<Questions> & Required<{
    _id: unknown;
}>>;
