import { IsEmail, IsString } from "class-validator";

export class LoginModeratorDto{

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}