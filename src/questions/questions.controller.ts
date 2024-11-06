import { Body, Controller, Post, Get, Delete, Param } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/createQuestion.dto";
import { QuestionService } from "./questions.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Question Module')
@Controller('moderator')
export class QuestionController{
    
    constructor(private questionService: QuestionService){}
    
    @Post('/create-question')
    @ApiOperation({summary:'Create Question in the Master Table'})
    async createQuestion(@Body() createQuestionDto: CreateQuestionDto){
        return this.questionService.createQuestion(createQuestionDto);
    }

    @Get('/get-questions')
    @ApiOperation({summary:'Get All Questions'})
    async getQuestions(){
        return this.questionService.getQuestions();
    }

    // Pending Update and Delete Questions


    @Delete('/delete-question/:questionId')
    @ApiOperation({summary:'Delete any question using question ID'})
    async deleteQuestions(@Param('questionId') questionId: string){
        return this.questionService.deleteQuestion(questionId);
    }


}