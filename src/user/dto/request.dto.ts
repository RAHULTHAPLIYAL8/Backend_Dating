
import { IsString, IsOptional,IsArray,ArrayNotEmpty } from 'class-validator';
export class RequestDto{
    
    @IsString()
    body: string;
  
    @IsOptional()
    from?:string;
}