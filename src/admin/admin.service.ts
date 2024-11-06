import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';
import { AdminDocument } from './admin.schema';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateAdminDto } from '../user/dto/create-admin.dto';
import { User } from 'src/user/user.schema';
import { UserDocument } from 'src/user/user.schema';
import { MatchRequestDto } from 'src/user/dto/connect.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class AdminService {
    private stripe: Stripe;
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,@InjectModel(Admin.name) private adminmodel: Model<AdminDocument>,private configService: ConfigService,
      ) {

        this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
          apiVersion: '2024-06-20',
        });
      }

      tokenize= (sentence:string)=> {
        console.log(sentence+"Hello my name is Rahul Thapliyal")
        return  sentence.toLowerCase().replace(/[^\w\s]|_/g, "").split(/\s+/);
      }

      /////////////////////////////ADMIN CREATE//////////////////////////////////////////////////////////
async admincreate(createAdminDto: CreateAdminDto):Promise<object>
{
  const sender = await this.userModel.findOne({email:createAdminDto.email }).exec();
  try{
  if(sender)
  {
    const createdUser = new this.adminmodel(createAdminDto);
    const savedUser = await createdUser.save();
    return {status:"Ok",message:savedUser}
  }
  else{
    return {status:"erro",message:"User not found"}; 
  }
}catch (error) {
  return { status: "error", message: error.message };
}

}
////////////////////////////////////////////For update the details////////////////////////////////////////////////////
async adminUpdate(email: string, updateData: Partial<CreateAdminDto>): Promise<object> {
    try {
      const adminToUpdate = await this.adminmodel.findOne({ email }).exec();
      
      if (!adminToUpdate) {
        return { status: "error", message: "Admin not found" };
      }
  
  
      const updatedAdmin = await this.adminmodel.findOneAndUpdate(
        { email }, 
        { $set: updateData }, 
        { new: true } 
      ).exec();
  
      return { status: "Ok", message: "Admin updated successfully", data: updatedAdmin };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }
  /////////////////Admin Delete///////////////////////////////////////////////////////////////
async adminDelete(email: string): Promise<object> {
    try {
  
      const adminToDelete = await this.adminmodel.findOne({email}).exec();
      console.log(email);
      if (!adminToDelete) {
        return { status: "error", message: "Admin not found" };
      }
  
      
      await this.adminmodel.deleteOne({email}).exec();
  
      return { status: "Ok", message: `Admin with email ${email} has been deleted` };
    } catch (error) {
      return { status: "error", message: email };
    }
  }
  /////////////////////////////////////////////////Adming find////////////////////////////////////////////////////

 async adminFind(email:string):Promise<object>
 {
  try{
    const adminDelete=await this.adminmodel.findOne({email}).exec();
    if(adminDelete)
    {
      return {status:"error",message:"user not found"}
    }
  }catch(error)
{
  return {status:"error",message:"user not found"}
}
 }

 async matchrate(admin1Email: string,admin2Email: string, match:string) {

  const user1= await this.userModel.findOne({ email: admin1Email }).exec();
  const user2= await this.userModel.findOne({ email: admin2Email}).exec();
  const admin1= await this.adminmodel.findOne({ email: admin1Email }).exec();
  const admin2 = await this.adminmodel.findOne({ email: admin2Email}).exec();

  if (!admin1) {
    throw new NotFoundException('Sender not found');
  }
  if (!admin2) {
    throw new NotFoundException('Receiver not found');
  }

  const info1=admin1[match];
  const info2=admin2[match];

  const tokens1 = new Set(this.tokenize(info1));
  const tokens2 = new Set(this.tokenize(info2));
  console.log(tokens1)
  console.log(tokens2)

  const intersection = new Set([...tokens1].filter(token => tokens2.has(token)));
  const union = new Set([...tokens1, ...tokens2]);

  const similarity = intersection.size / union.size;

  const result= (similarity * 100).toFixed(2);


  // await this.client.messages.create({
  //   body: `Match rate between ${user1.name} and ${user2.name} for ${match} is ${result}%`,
  //   from: 'whatsapp:+14155238886',
  //   to: 'whatsapp:+919650937253'
  // });
  return {status:"ok",matchrate:result,Detail:match}
  

}

async Bucketlist(){
  const males = await this.userModel.find({ gender: 'male', status: 'approve' }).exec();
  const females = await this.userModel.find({ gender: 'female', status: 'approve' }).exec();
  return { males, females };
}

}
