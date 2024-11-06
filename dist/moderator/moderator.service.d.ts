import { Moderator } from "./moderator.schema";
import { Model } from "mongoose";
import { CreateModeratorDto } from "./dto/createModerator.dto";
import { LoginModeratorDto } from "./dto/loginModerator.dto";
import { SignupModeratorDto } from "./dto/signupModerator.dto";
export declare class ModeratorService {
    private moderatorModel;
    constructor(moderatorModel: Model<Moderator>);
    createModerator(CreateModeratorDto: CreateModeratorDto): Promise<import("mongoose").Document<unknown, {}, Moderator> & Moderator & Required<{
        _id: unknown;
    }>>;
    login(loginModeratorDto: LoginModeratorDto): Promise<Object>;
    signup(signupModeratorDto: SignupModeratorDto): Promise<{
        status: string;
        message: string;
        value?: undefined;
    } | {
        status: string;
        value: import("mongoose").Document<unknown, {}, Moderator> & Moderator & Required<{
            _id: unknown;
        }>;
        message?: undefined;
    }>;
}
