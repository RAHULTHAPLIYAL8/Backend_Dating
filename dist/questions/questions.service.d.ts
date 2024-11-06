import { CreateQuestionDto } from "./dto/createQuestion.dto";
import { Model } from "mongoose";
import { Questions } from "./questions.schema";
export declare class QuestionService {
    private questionModel;
    constructor(questionModel: Model<Questions>);
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<import("mongoose").Document<unknown, {}, Questions> & Questions & Required<{
        _id: unknown;
    }>>;
    getQuestions(): Promise<Questions[]>;
    deleteQuestion(questionId: string): Promise<{
        status: string;
        message: string;
    }>;
}
