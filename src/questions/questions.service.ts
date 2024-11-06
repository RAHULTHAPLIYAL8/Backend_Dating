import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/createQuestion.dto";
import { Model } from "mongoose";
import { Questions } from "./questions.schema";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class QuestionService{

    constructor(
        @InjectModel(Questions.name)
        private questionModel: Model<Questions>,
        
    ){}
    
    async createQuestion(createQuestionDto: CreateQuestionDto){
        const newQuestion = new this.questionModel(createQuestionDto);
        return newQuestion.save();
    }

    async getQuestions(): Promise<Questions[]>{
        return this.questionModel.find().exec();
    }

    async deleteQuestion(questionId: string){
        const result = await this.questionModel.findByIdAndDelete(questionId);
        if (!result) {
            return { status: "error", message: "Question not found" };
        }

        return { status: "success", message: "Question deleted successfully" };
    }
}