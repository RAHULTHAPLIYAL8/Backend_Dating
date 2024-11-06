import { MongooseModule } from "@nestjs/mongoose";
import { Moderator, ModeratorSchema } from "./moderator.schema";
import { ModeratorService } from "./moderator.service";
import { ModeratorController } from "./moderator.controller";
import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";
import { UserProfileModule } from "src/userProfile/userProfile.module";
import { UserProfileService } from "src/userProfile/userProfile.service";

@Module(
    {imports: [
        MongooseModule.forFeature([
            {
                name:Moderator.name,
                schema: ModeratorSchema
            }
        ]), UserModule, UserProfileModule
    ],
    providers: [ModeratorService, UserService],
    controllers: [ModeratorController]
})

export class ModeratorModule{

}