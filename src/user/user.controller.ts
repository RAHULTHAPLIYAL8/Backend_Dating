import { Controller, Post, Body, Get, NotFoundException, Put, Param, Delete, HttpStatus, HttpCode, Patch, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgetDto } from './dto/forget.dto';
import { LoginDto } from './dto/login.dto';
import { SendRequestDto, AcceptRequestDto } from './dto/connect.dto';
import { User } from './user.schema';
import { MatchRequestDto } from './dto/connect.dto';
import {UpdateDto} from './dto/update.dto'
import { SentMessageInfo } from 'nodemailer';
import { BadRequestException } from '@nestjs/common';
import { OptionDto } from './dto/option.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '../admin/admin.schema';
import { Response } from 'express';
import { RequestDto } from './dto/request.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User Module')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }


  @ApiOperation({summary: 'This API endpoint allows new users to register for an account by providing necessary information such as their name, email, and password. Upon successful registration'})
  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<object> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({summary:'This API endpoint enables users to log into their accounts by submitting their email and password. Upon successful authentication, the user gains access to their account.'})
  @Post('/signin')
  async login(@Body() loginDto: LoginDto): Promise<object> {
    const user = await this.userService.findByEmail(loginDto.email, loginDto.password);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== loginDto.password) {
      return { status: "error", Password: "Password does not match" }
    }
    return { status: "ok", message: 'Login successful', value: user };
  }

  @ApiOperation({summary:'This endpoint initiates a password reset by verifying the users email, generating a reset token, and sending an email with a password reset link. The token is stored in the database with an expiration time. If the user doesnt exist, an error is returned.'})
  @Post('/forget-password')
  async Email(@Body() forgetDto: ForgetDto): Promise<SentMessageInfo> {
    try {
      const result = await this.userService.mailTransport(forgetDto.email);
      if (result) {
        return { status: "success", message: 'Your password reset request was successfull', token :`${result.token}`};
      }
    } catch (error) {

      console.error('Error sending email:', error);
      throw error;
    }
  }


  @ApiOperation({summary:''})
  @Post('/adddetails')
  async admincrate(@Body() creadminDto: CreateAdminDto): Promise<object> {
    return this.userService.admincreate(creadminDto);
  }
  
  @ApiOperation({summary:''})
  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    const { amount, currency } = body;
    const paymentIntent = await this.userService.createCheckoutSession(amount, currency);
    return paymentIntent;
  }

  // @ApiOperation({summary:''})
  // @Post('sendsms')
  // async sendSms(@Body() body: { senderId: string; receiverId: string }) {
  //   const { senderId, receiverId } = body;
  //   return await this.userService.sendSms(senderId, receiverId);

  // }
  

  @ApiOperation({summary:''})
  @Get('pending-users')
  async getPendingUsers() {
    return this.userService.findUsersByStatus('pending');
  }

  @ApiOperation({summary:''})
  @Patch('/approve-user/:id')
  async approveUser(@Param('id') userId: string) {
    return this.userService.updateStatus(userId);
  }

  // @ApiOperation({summary:''})
  // @Get('create-call')
  // async createCall() {
  //   try {
  //     const callSid = await this.userService.createCall();
  //     return `Call initiated successfully. Call SID: ${callSid}`;
  //   } catch (error) {
  //     return `Error creating call: ${error.message}`;
  //   }
  // }


  // @ApiOperation({summary:''})
  // @Post('sms/reply')
  // async handleSmsReply(@Body() req: RequestDto, @Res() res: Response) {
  //   const messageBody = req.body.trim().toUpperCase();
  //   const fromNumber = req.from;

  //   if (messageBody === 'YES') {
  //     const callSid = '123'
  //     if (callSid) {
  //       await this.userService.extendCall(callSid);
  //       res.status(200).send('Call extended for 5 minutes');
  //     } else {
  //       res.status(404).send('Call not found');
  //     }
  //   } else {
  //     res.status(200).send('No extension');
  //   }
  // }

  @ApiOperation({summary:''})
  @Get('connect')
  connectCall(@Res() res: Response) {
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    const response = new VoiceResponse();

    response.dial('+917217873189');

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
  }


  @ApiOperation({summary:''})
  @Patch('reject-user/:id')
  async rejectUser(@Param('id') userId: string) {
    return this.userService.notStatus(userId);
  }

  @ApiOperation({summary:''})
  @Get("/all")
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary:''})
  @Get("/alladmin")
  async findAdminAll(): Promise<Admin[]> {
    return this.userService.findAdminAll();
  }

  @ApiOperation({summary:'In this, we will include the user ID of the person we want to send a request to.'})
  @Post('/sendrequest')
  async sendrequest(@Body() sendRequestDto: SendRequestDto) {
    return this.userService.sendRequest(sendRequestDto.senderId, sendRequestDto.receiverId)
  }

  @ApiOperation({summary:'In this, the user can accept any friend request sent to them through this endpoint, and the sender can be added to their friend list.'})
  @Post('/acceptrequest')
  async acceptrequest(@Body() sendRequestDto: SendRequestDto) {
    return this.userService.acceptRequest(sendRequestDto.senderId, sendRequestDto.receiverId)
  }



  @Post('/update')
  async update(@Body() updateDto:UpdateDto): Promise<{ message: string }> {
    const user = await this.userService.updatePassword(updateDto.token,updateDto.password);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Update Successful' };
  }
 
}
