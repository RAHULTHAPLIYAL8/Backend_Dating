import { IsString } from "class-validator"

export class CreateModeratorDto{

    @IsString()
    name: string
}