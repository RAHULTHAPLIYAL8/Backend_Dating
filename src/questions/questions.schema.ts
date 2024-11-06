import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Moderator} from "../moderator/moderator.schema"
import { Schema as MongooseSchema} from "mongoose";
import { Document } from "mongoose";


@Schema()
export class Questions extends Document {
 
  @Prop()
  question: string;

  @Prop()
  description: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Moderator'})
  moderator: Moderator;

}

export const QuestionSchema = SchemaFactory.createForClass(Questions);