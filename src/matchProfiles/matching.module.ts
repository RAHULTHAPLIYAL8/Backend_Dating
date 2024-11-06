import { MatchingProfileController } from "./matching.controller";
import { MatchingProfileService } from "./matching.service";
import { Module } from "@nestjs/common";

@Module(
    {
    providers: [MatchingProfileService],
    controllers: [MatchingProfileController],
    exports: [MatchingProfileService]
})

export class MatchingProfileModule{}