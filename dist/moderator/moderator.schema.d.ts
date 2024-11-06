import { Document } from "mongoose";
export declare class Moderator extends Document {
    name: string;
    email: string;
    password: string;
}
export declare const ModeratorSchema: import("mongoose").Schema<Moderator, import("mongoose").Model<Moderator, any, any, any, Document<unknown, any, Moderator> & Moderator & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Moderator, Document<unknown, {}, import("mongoose").FlatRecord<Moderator>> & import("mongoose").FlatRecord<Moderator> & Required<{
    _id: unknown;
}>>;
