import { Prop } from "@nestjs/mongoose";
import { QuestionModule } from "src/questions/questions.module";
import { Questions } from "src/questions/questions.schema";
import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/user.schema";
import { Schema as MongooseSchema} from "mongoose";
import { Document } from "mongoose";

@Schema()
export class UserProfile extends Document{
    
    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Questions'})
    question: Questions;

    @Prop()
    questionId: string;

    @Prop({required: true})
    answer: string;

    @Prop({ required: true })
    userId: string;

    @Prop({default: Date.now})
    timestamp: Date;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);