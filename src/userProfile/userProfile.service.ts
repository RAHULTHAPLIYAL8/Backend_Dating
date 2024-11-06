import { InjectModel } from "@nestjs/mongoose";
import { UserProfile } from "./userProfile.schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { AddUserResponseDto } from "./dto/addUserResponse.dto";
import { User } from "src/user/user.schema";


@Injectable()
export class UserProfileService {

    constructor(
        @InjectModel(UserProfile.name)
        private userProfileModel: Model<UserProfile>,
    ) { }

    async getResponses(userId: string): Promise<UserProfile[]> {
    
        const populatedResponses = await this.userProfileModel.find({ userId }).populate({ path: 'question', model: 'Questions' }).exec();
        // console.log("Responses after population:", populatedResponses);

        return populatedResponses;
    }

    async saveResponses(addUserResponseDto: AddUserResponseDto): Promise<{ status: string, savedResponses: UserProfile[]}>{
        const { userId, responses } = addUserResponseDto;

        const responseDocuments = responses.map(response => ({
            userId,
            questionId: response.questionId,
            answer: response.answer,
        }));

        try {
            const savedResponses = await this.userProfileModel.insertMany(responseDocuments);
            return { status: "ok", savedResponses}
            
        } catch (error) {
            console.error("Error saving responses:", error); 
            throw new Error("Could not save user responses.");
        }

        
    }
}