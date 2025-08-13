import { Injectable } from '@nestjs/common';
import { QuestionsService } from 'src/questions/questions.service';
import { UserProgressService } from 'src/user-progress/user-progress.service';
import { LevelsService } from 'src/levels/levels.service';

@Injectable()
export class QuizService {
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly userProgressService: UserProgressService,
        private readonly levelsService: LevelsService,
    ) { }

    async findTopicLevelQuizByUser(userId: string, topicId: string, levelNumber: number) {
        const questions = await this.questionsService.findQuizQuestions(topicId, levelNumber);
        const userProgress = await this.userProgressService.findTopicsLevelsUserProgress(userId, topicId, levelNumber);
        const answeredQuestions = userProgress.map(progress => progress.question);
        const topic = questions[0]?.topic;
        const level = questions[0]?.level;
        const maxUserLevel = await this.userProgressService.getUserLevelInTopic(userId, topicId);

        const questionsWithProgress = questions.map(question => {
            const { topic, level, ...rest } = question;
            return {
                ...rest,
                answered: answeredQuestions.includes(question.id),
            };
        });

        return { topic, level, maxUserLevel, questionsWithProgress };
    }

    async findTopicQuizByUser(userId: string, topicId: string) {
        const topicQuestions = await this.questionsService.findByTopicId(topicId);
        const userProgress = await this.userProgressService.findTopicsUserProgress(userId, topicId);
        const answeredQuestions = userProgress.map(progress => progress.question);
        const levelsList = await this.levelsService.findAll();
        const maxUserLevel = await this.userProgressService.getUserLevelInTopic(userId, topicId);
        const topic = topicQuestions[0]?.topic;
        const levels = {};

        for (const level of levelsList) {
            levels[level.level_number] = level;
            levels[level.level_number]['questions'] =
                topicQuestions.filter(question => question.level.level_number === level.level_number)
                    .map(question => {
                        const { topic, level, ...rest } = question;
                        return {
                            ...rest,
                            answered: answeredQuestions.includes(question.id),
                        };
                    });
        }
        return { topic, maxUserLevel, levels };
    }
}
