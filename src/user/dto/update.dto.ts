import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateDto {
  @IsString()   
  token: string 
  @IsString()
  password: string;
}