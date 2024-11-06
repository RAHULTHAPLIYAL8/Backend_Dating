import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { QuestionSchema, Questions } from "./questions.schema";
import { QuestionService } from "./questions.service";
import { QuestionController } from "./questions.controller";

@Module(
    {imports: [
        MongooseModule.forFeature([
            {
                name:Questions.name,
                schema: QuestionSchema
            }
        ])
    ],
    providers: [QuestionService],
    controllers: [QuestionController],
    exports:[MongooseModule]
})

export class QuestionModule{}