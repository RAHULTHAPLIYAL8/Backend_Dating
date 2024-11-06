import { UserProfile } from "./userProfile.schema";
import { Model } from "mongoose";
import { AddUserResponseDto } from "./dto/addUserResponse.dto";
export declare class UserProfileService {
    private userProfileModel;
    constructor(userProfileModel: Model<UserProfile>);
    getResponses(userId: string): Promise<UserProfile[]>;
    saveResponses(addUserResponseDto: AddUserResponseDto): Promise<{
        status: string;
        savedResponses: UserProfile[];
    }>;
}
