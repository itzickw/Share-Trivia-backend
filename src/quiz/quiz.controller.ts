import { Controller, Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Get('user/:userId/:topicId/:levelNumber')
    async getQuizByUser(
        @Param('userId')  userId: string,
        @Param('topiId') topicId: string,
        @Param('levelNumber') levelNumber: number) {
        return this.quizService.findTopicLevelQuizByUser(userId, topicId, levelNumber);
    }

    @Get('user/:userId/:topicId')
    async getTopicQuizByUser(
        @Param('userId') userId: string,
        @Param('topicId') topicId: string) {
        return this.quizService.findTopicQuizByUser(userId, topicId);
    }
}
