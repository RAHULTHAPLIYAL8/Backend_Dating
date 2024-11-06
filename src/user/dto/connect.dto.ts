import { IsString , IsEmail} from 'class-validator';

export class SendRequestDto {
  
  @IsString()
  @IsEmail()
  senderId: string;

  @IsString()
  @IsEmail()
  receiverId: string;
}

export class MatchRequestDto {
  
  @IsString()
  @IsEmail()
  admin1: string;

  @IsString()
  @IsEmail()
  admin2: string;

  @IsString()
  match:string;
} 
export class AcceptRequestDto {
  @IsString()
  @IsEmail()
  senderId: string;

  @IsString()
  @IsEmail()
  receiverId: string;
}
