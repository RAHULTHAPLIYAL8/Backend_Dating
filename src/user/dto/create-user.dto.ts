import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()   
  name: string 
  
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  gender:string;

  @IsOptional()
  status:string;

}
