import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password : string;
  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [{ type: String }], default: [] })
  friends: string[]; 
  
  @Prop({
    type: [
      {
        senderId: { type: String, required: true },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
      }
    ],
    default: []
  })
  friendRequests: {
    senderId: string;
    status: 'pending' | 'accepted' | 'rejected';
  }[];

  @Prop({ required: false })
  phone?: string;

 
}



export const UserSchema = SchemaFactory.createForClass(User);
