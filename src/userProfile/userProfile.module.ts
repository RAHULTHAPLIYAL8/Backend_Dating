import { UserProfileController } from "./userProfile.controller";
import { UserProfile, UserProfileSchema } from "./userProfile.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserProfileService } from "./userProfile.service";
import { Questions } from "src/questions/questions.schema";
import { QuestionSchema } from "src/questions/questions.schema";
import { QuestionModule } from "src/questions/questions.module";
@Module(
    {imports: [
        MongooseModule.forFeature([
            {
                name:UserProfile.name,
                schema: UserProfileSchema
            },
            {
                name:Questions.name,
                schema: QuestionSchema
            }
        ]), QuestionModule
    ],
    providers: [UserProfileService],
    controllers: [UserProfileController],
    exports: [UserProfileService]
})

export class UserProfileModule{}