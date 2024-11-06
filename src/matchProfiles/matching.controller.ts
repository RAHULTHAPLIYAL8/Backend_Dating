import { Body, Controller, Get, Post} from "@nestjs/common";
import { MatchingProfileService } from "./matching.service";
import { UserDefinedMessageInstance } from "twilio/lib/rest/api/v2010/account/call/userDefinedMessage";
import { GetStablePartnerDto } from "./dto/stablePartner.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags('Matching Module')
@Controller('match')
export class MatchingProfileController{

    constructor(private matchingProfileService: MatchingProfileService){}

    @ApiOperation({summary:'In this, the matching score between the user and the opposite gender is generated using AI. The score will range between 0 and 1. If the score is closer to 1, it indicates a higher match, and if it is closer to 0, it indicates a lower match.'})
    @Post('/score')
    async getMatchingScore(){
        return this.matchingProfileService.getScore();
    }

    @ApiOperation({summary:'This will create an array of all users, with the highest priority match placed at the top of the array.'})
    @Post('/stable-partner')
    async getStablePartner(@Body() getStablePartnerDto : GetStablePartnerDto){
        const { userId } = getStablePartnerDto;
        console.log("User ID : " + userId);
        return this.matchingProfileService.getStablePartner(userId);
    }






    
}
