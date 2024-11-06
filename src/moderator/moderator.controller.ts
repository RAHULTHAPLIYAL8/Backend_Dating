import { Body, Controller, Get, Param, Post, } from "@nestjs/common";
import { CreateModeratorDto } from "./dto/createModerator.dto";
import { ModeratorService } from "./moderator.service";
import { UserService } from "src/user/user.service";
import { UserProfileService } from "src/userProfile/userProfile.service";
import { LoginModeratorDto } from "./dto/loginModerator.dto";
import { SignupModeratorDto } from "./dto/signupModerator.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags('Moderator Module')
@Controller('moderator')
export class ModeratorController{

    constructor(
        private modertaorService: ModeratorService, 
        private userService: UserService,
        private userProfileService: UserProfileService){}

    @Post('/create-moderator')
    async createModerator(@Body() createModeratorDto: CreateModeratorDto){
        return this.modertaorService.createModerator(createModeratorDto);
    }

    @ApiOperation({summary:'In this, we are displaying the  details of all users to the current  admin.'})
    @Get('/users')
    async getAllUsers(){
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary:'In this endpoint, we are  retrieving the information of a particular  user based on their user ID and returning it  in the response.'})
    @Get('/users-profiles/:userId')
    async getAllUsersProfiles(@Param('userId') userId: string){
        // Pending : responses with questions
        return this.userProfileService.getResponses(userId);
    }

    @ApiOperation({summary:'In this, we are verifying the  email and password so that the user can  access the admin panel.'})
    @Post('/signin')
    async adminLogin(@Body() loginModeratorDto: LoginModeratorDto){
        return this.modertaorService.login(loginModeratorDto);
    }

    @ApiOperation({summary:'In this, we are taking the  moderator name, email, and password,  allowing them to create their own admin  account'})
    @Post('/signup')
    async adminSignup(@Body() signupModeratorDto: SignupModeratorDto){
        return this.modertaorService.signup(signupModeratorDto);
    }

}