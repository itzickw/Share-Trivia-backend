import { Injectable } from '@nestjs/common';
import { QuestionsService } from '../questions.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { Question } from '../entities/question.entity';

@Injectable()
export class QuizService {
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly validationService: ValidationService
    ) { }

    async getQuizQuestions(topicName: string, levelNumber: number): Promise<Question[]> {
        const topicQuestions = await this.questionsService.findByTopicName(topicName);
        const level = await this.validationService.validateLevelNumber(levelNumber);        
        
        return topicQuestions.filter(question => question.level.id === level.id);
    }
}
