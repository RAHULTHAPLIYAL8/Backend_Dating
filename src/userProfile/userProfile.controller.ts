import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { UserProfileService } from "./userProfile.service";
import { AddUserResponseDto } from "./dto/addUserResponse.dto";
import { ok } from "assert";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('UserProfile Module')
@Controller('user-profile')
export class UserProfileController{

    constructor(private userProfileService: UserProfileService){}

    @Get('/get-responses/:userId')
    async getResponses(@Param('userId') userId: string){
        return this.userProfileService.getResponses(userId);
    }

    @Post('/save-details')
    async saveResponses(@Body() addUserResponseDto: AddUserResponseDto){
// Pending : upsert operation to avoid duplicate entries
        const result = await this.userProfileService.saveResponses(addUserResponseDto);
        return result;
    }

    
}
