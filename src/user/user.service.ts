import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { OptionDto } from './dto/option.dto';
import { ConfigService } from '@nestjs/config';
import { Admin,AdminDocument } from '../admin/admin.schema';
import { send } from 'process';
import Stripe from 'stripe';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Message } from 'twilio/lib/twiml/MessagingResponse';
import { error } from 'console';

@Injectable()
export class UserService {
  private stripe: Stripe;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,  @InjectModel(Admin.name) private adminmodel: Model<AdminDocument>,private configService: ConfigService,
  ) {
    // Initialize Stripe with your secret key
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2024-06-20',
    });
  }


// accountSid = 'ACb60b9ec824cb7cb779772e876ab13088';
// authToken = 'faa884e50ee72ffc6e85a296cbaa3343'; 
// client = require('twilio')(this.accountSid, this.authToken);

  async createCheckoutSession(amount: number, currency: string) {
    try {
      return await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: 'Rahul Thapliyal',
              },
              unit_amount: amount, 
            },
            quantity: 1, 
          },
        ],
        mode: 'payment', 
        success_url: 'https://your-site.com/success', 
        cancel_url: 'https://your-site.com/cancel',   
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
//////////////////////////////////////CAll Twilio/////////////////////////////////////////////

// async createCall(): Promise<string> {
//   try {
//     const call = await this.client.calls.create({
//       from: '+15867453691',  
//       to: '+919650937253',  
//       url: 'https://581e-2401-4900-5fdc-13d1-6128-b786-3778-b6ec.ngrok-free.app/user/connect',  
//     });

//      setTimeout(async () => {
//       try {
//         const toSmsResponse = await this.client.messages.create({
//           body: 'Do you want to extend the call for 5 more minutes? Reply with YES to extend.',
//           from: '+15867453691', 
//           to: '+919650937253',  
//         });

//         const fromSmsResponse = await this.client.messages.create({
//           body: 'Do you want to extend the call for 5 more minutes? Reply with YES to extend.',
//           from: '+15867453691', 
//           to: '+917217873189',  
//         });

//         console.log('SMS to the called party sent:', toSmsResponse.sid);
//         console.log('SMS to the calling party sent:', fromSmsResponse.sid);
//       } catch (smsError) {
//         console.error('Error sending SMS:', smsError);
//       }
//     }, 4 * 60 * 1000 + 30 * 1000); 
//     console.log(`Call SID: ${call.sid}`);
//     return call.sid;
//   } catch (error) {
//     console.error('Error creating call:', error);
//     throw error;
//   }
// }

//////////////////////////////////extend call////////////////////////////////////////////
// async extendCall(callSid: string): Promise<void> {
//   try {
//     await this.client.calls(callSid).update({
//       url: 'https://your-url.ngrok-free.app/user/extend', // TwiML URL to extend the call
//       method: 'POST',
//     });
//     console.log(`Call ${callSid} extended for 5 more minutes`);
//   } catch (error) {
//     console.error('Error extending the call:', error);
//     throw error;
//   }
// }
//////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////


// twilio = require("twilio")( this.configService.get<string>('TWILIO_ACCOUNT_SID'),
// this.configService.get<string>('TWILIO_AUTH_TOKEN'));




//Private Request

////////////////////////////Creating a User///////////////////////////////////////
  async create(createUserDto: CreateUserDto): Promise<object> {
    try {

      createUserDto.status = "pending"; 
      const check = await this.userModel.findOne({ email: createUserDto.email }).exec();
     console.log
      if (check) {
          return { status: "", message: "Email already exists" };
      }
        const createdUser = new this.userModel(createUserDto);
        const savedUser = await createdUser.save();
        return { status: "ok", value: savedUser };
    } catch (error) {
        return { status: "error", message: error.message };
    }
}
///////////////////////////////////////Find user////////////////////////////////////////////////////

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findAdminAll(): Promise<Admin[]> {
    return this.adminmodel.find().exec()
  }

//Find Users which have pending status

  async findUsersByStatus(status: string): Promise<User[]> {
    return this.userModel.find({ status }).exec();
  }
////////////////////////Approved user/////////////
async updateStatus(userId: string): Promise<User> {
  const user = await this.userModel.findById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  user.status = "approve";
  return user.save(); // Save the updated user status
}


async notStatus(userId: string): Promise<User> {
  const user = await this.userModel.findOne({email:userId});
  if (!user) {
    throw new NotFoundException('User not found');
  }

  user.status = "not-approved";
  return user.save(); // Save the updated user status
}

async findByEmail(email: string, password: string): Promise<User> {
  const user = await this.userModel.findOne({ email }).exec();

  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordMatching = user.password===password;

  if (!isPasswordMatching) {
    throw new Error('Invalid password');
  }
  return user;
}

////////////////////////sendSms///////////////////////////////////////////////////

// async sendSms(senderId: string, receiverId: string): Promise<any> {
//   const messageOptions = {
//     from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
//     to: this.configService.get<string>('TWILIO_TO_PHONE_NUMBER'),
//     body: `${senderId} accepted the friend request of ${receiverId}`
//   };

//   try {
//     const message = await this.twilio.messages.create(messageOptions);
//     return { status: 'ok', data: message };
//   } catch (err) {
//     console.error('Error sending SMS:', err);
//     return { status: 'error', message: err.message };
//   }
// }
// sendsms("Hi my name is Rahul Thapliyal");

async updatePassword(id: string, newPassword: string): Promise<User | null> {
  return this.userModel.findByIdAndUpdate(
    id, // Find user by ID
    { password: newPassword }, // Update the password
    { new: true } // Return the updated document
  ).exec();
}

// ////////////////////////////Sending the request /////////////////////////////////////////////////

async sendRequest(senderEmail: string, receiverEmail: string) {
  // Query for users by their email
  const sender = await this.userModel.findOne({ email: senderEmail }).exec();
  console.log(sender)
  const receiver = await this.userModel.findOne({ email: receiverEmail }).exec();

  // Check if the sender and receiver exist
  if (!sender) {
    throw new NotFoundException('Sender not found');
  }
  if (!receiver) {
    throw new NotFoundException('Receiver not found');
  }


  const existingRequest = receiver.friendRequests.find(
    (req) => req.senderId === sender._id.toString() && req.status === 'pending'
  );
  if (existingRequest) {
    throw new BadRequestException('Friend request already sent');
  }

  
  receiver.friendRequests.push({
    senderId: sender._id.toString(), // Store the sender's ID
    status: 'pending',
  });


  await receiver.save();

  return { message: 'Friend request sent successfully' };
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////// Acceptin the Reqest//////////////////////////////////////////////////////////
async acceptRequest(senderEmail: string, receiverEmail: string) {
 
  const receiver = await this.userModel.findOne({ email: receiverEmail }).exec();
  const sender = await this.userModel.findOne({ email: senderEmail }).exec();
  if (!receiver) {
    throw new NotFoundException('Receiver not found');
  }
  if (!sender) {
    throw new NotFoundException('Sender not found');
  }
  const request = receiver.friendRequests.find(
    (req) => req.senderId === sender._id.toString() && req.status === 'pending'
  );
  if (!request) {
    throw new NotFoundException('Friend request not found or already processed');
  }
  request.status = 'accepted';
  if (!receiver.friends.includes(sender._id.toString())) {
    receiver.friends.push(sender._id.toString());
  }
  if (!sender.friends.includes(receiver._id.toString())) {
    sender.friends.push(receiver._id.toString());
  }
  await receiver.save();
  await sender.save();
  return { message: 'Friend request accepted successfully' };
}
//////////////////////////////////////////////////////////////////////////////////////////////


async mailTransport(email: string) {
  const user = await this.userModel.findOne({email});
  console.log(user)
  if (!user) {
    throw new NotFoundException('User not found');
  }
  const resetToken = user.id; 
  return { status: "ok", token: resetToken };
}

  // // For forget password
  // async mailTransport(email: string): Promise<any> {
  //   try {
  //     const oAuth2Client = new google.auth.OAuth2(
  //       this.configService.get<string>('GOOGLE_CLIENT_ID'),
  //       this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
  //       this.configService.get<string>('GOOGLE_REDIRECT_URI')
  //     );
  
  //     oAuth2Client.setCredentials({ refresh_token: this.configService.get<string>('GOOGLE_REFRESH_TOKEN') });
  //     const accessToken = await oAuth2Client.getAccessToken();
  
  //     const transport = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         type: 'OAuth2',
  //         user: 'rahulthapliyal888@gmail.com',
  //         clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
  //         clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
  //         refreshToken: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
  //         accessToken: accessToken.token,
  //       },
  //     });
  
  //     const mailOptions = {
  //       from: 'Rahul Thapliyal <rahulthapliyal888@gmail.com>',
  //       to: email,
  //       subject: 'Hello from gmail using API',
  //       text: 'Hello from gmail email using API',
  //       html: `<h1>Aapka Password hai 1234 </h1>`,
  //     };
  
  //     const result = await transport.sendMail(mailOptions);
  //     return result;
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     throw new InternalServerErrorException('Failed to send email');
  //   }
  // }

        /////////////////////////////ADMIN CREATE//////////////////////////////////////////////////////////
async admincreate(createAdminDto: CreateAdminDto):Promise<object>
{
  const sender = await this.userModel.findOne({email:createAdminDto.email }).exec();
  try{
  if(sender)
  {
    const createdUser = new this.adminmodel(createAdminDto);
    const savedUser = await createdUser.save();
    return {status:"ok",message:savedUser}
  }
  else{
    return {status:"error",message:"Error by user"}; 
  }
}catch (error) {
  return { status: "error", message: error.message };
}

}
}

