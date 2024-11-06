import { IsNotEmpty, IsString } from "class-validator";

export class GetStablePartnerDto {
    @IsString()
    @IsNotEmpty()
    userId : string;
}