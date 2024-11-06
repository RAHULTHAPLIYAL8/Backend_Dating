
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Moderator extends Document{

    @Prop({required: true})
    name: string;

    @Prop()
    email: string;

    @Prop()
    password:string;
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);