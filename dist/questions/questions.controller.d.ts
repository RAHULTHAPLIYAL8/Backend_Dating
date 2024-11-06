import { CreateQuestionDto } from "./dto/createQuestion.dto";
import { QuestionService } from "./questions.service";
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<import("mongoose").Document<unknown, {}, import("./questions.schema").Questions> & import("./questions.schema").Questions & Required<{
        _id: unknown;
    }>>;
    getQuestions(): Promise<import("./questions.schema").Questions[]>;
    deleteQuestions(questionId: string): Promise<{
        status: string;
        message: string;
    }>;
}
