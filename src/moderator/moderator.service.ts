import { InjectModel } from "@nestjs/mongoose";
import { Moderator } from "./moderator.schema";
import { Model } from "mongoose";
import { CreateModeratorDto } from "./dto/createModerator.dto";
import { LoginModeratorDto } from "./dto/loginModerator.dto";
import { NotFoundException } from "@nestjs/common";
import { SignupModeratorDto } from "./dto/signupModerator.dto";

export class ModeratorService{

    constructor(
        @InjectModel(Moderator.name)
        private moderatorModel: Model<Moderator>
    ){}


    async createModerator(CreateModeratorDto: CreateModeratorDto){
        const newModerator = new this.moderatorModel(CreateModeratorDto);
        return newModerator.save();
    }

    async login(loginModeratorDto: LoginModeratorDto) : Promise<Object> {
        const { email, password } = loginModeratorDto;
        const mod = await this.moderatorModel.findOne({email}).exec();

        if(!mod){
            throw new NotFoundException("Wrong Credentials");
        }

        if( password != mod.password){
            return { status: "error", Password: "Password does not match" };
        } 
        
        return { status: "ok", message: 'Login successful', value: mod };
    }


    async signup(signupModeratorDto: SignupModeratorDto){
        const { name, email, password } = signupModeratorDto;

        const mod = await this.moderatorModel.findOne({email}).exec();

        if(mod){
            return { status: "error", message: "Email already exists" };
        }

        const newMod = new this.moderatorModel(signupModeratorDto);
        const savedMod = await newMod.save();
        return { status: "ok", value: savedMod };
    }

}