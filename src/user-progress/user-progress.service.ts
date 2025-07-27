import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { Repository } from 'typeorm';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { LevelsService } from 'src/levels/levels.service';
import { log } from 'console';

@Injectable()
export class UserProgressService {
    constructor(
        @InjectRepository(UserProgress)
        private userProgressRepository: Repository<UserProgress>,
        @Inject(forwardRef(() => QuestionsService))
        private readonly questionsService: QuestionsService,
        private readonly levelsService: LevelsService,
    ) { }

    async create(userProgressDto: CreateUserProgressDto): Promise<UserProgress> {
        const newUserProgress = this.userProgressRepository.create({
            user_id: userProgressDto.user_id,
            question: userProgressDto.question_id
        });
        return this.userProgressRepository.save(newUserProgress);
    }

    async findAll(): Promise<UserProgress[]> {
        return this.userProgressRepository.find();
    }

    async findOne(id: string): Promise<UserProgress> {
        const userProgress = await this.userProgressRepository.findOneBy({ id });
        if (!userProgress) {
            throw new NotFoundException(`User progress with id ${id} not found`);
        }
        return userProgress;
    }

    async findByUserId(userId: string): Promise<UserProgress[]> {
        const userProgress = await this.userProgressRepository.find({
            where: { user_id: userId },
        });
        if (userProgress.length === 0) {
            throw new NotFoundException(`No progress found for user with id ${userId}`);
        }
        return userProgress;
    }

    async findByQuestionlId(questionId: string): Promise<UserProgress[]> {
        const userProgress = await this.userProgressRepository.find({
            where: { question: questionId },
        });
        if (userProgress.length === 0) {
            throw new NotFoundException(`No progress found for level with id ${questionId}`);
        }
        return userProgress;
    }

    async findTopicsUserProgress(userId: string, topicId: string): Promise<UserProgress[]> {
        const userProgress = await this.userProgressRepository.find({
            where: { user_id: userId },
        });
        const topicQuestions = await this.questionsService.findByTopicId(topicId);
        if (userProgress.length === 0) {
            throw new NotFoundException(`No progress found for user with id ${userId}`);
        }
        if (topicQuestions.length === 0) {
            throw new NotFoundException(`No questions found for topic with id ${topicId}`);
        }
        return userProgress.filter(progress =>
            topicQuestions.some(question => question.id === progress.question)
        );
    }

    async findTopicUserLeve(userId: string, topicId: string): Promise<number> {
        const topicUserProgress = await this.findTopicsUserProgress(userId, topicId);
        const topicQuestions = await this.questionsService.findByTopicId(topicId);
        const levels = await this.levelsService.findAll();

        for (const level of levels) {
            if (level.level_number === levels.length)
                return level.level_number; // If the user is at the last level, return it

            const topicLevelQuestions =
                topicQuestions
                    .filter(question => question.level.id === level.id)
                    .map(question => question.id); // Get all questions for the current level in the topic
            const completedLevelQuestions =
                topicUserProgress
                    .filter(progress => topicLevelQuestions.includes(progress.question))
                    .map(progress => progress.question); // Get all user completed questions for the current level

            if(topicLevelQuestions.length === 0) {
                return level.level_number - 1; // If there are no questions in this level, return the previous level
            }
            if (completedLevelQuestions.length < topicLevelQuestions.length) {
                return level.level_number // If the user has not completed all questions in this level, return it
            }
        }

        return 0; // If no levels are found, return 0
    }

    async remove(id: string): Promise<void> {
        const userProgress = await this.findOne(id);
        await this.userProgressRepository.remove(userProgress);
    }

    async removeByUserId(userId: string): Promise<void> {
        const userProgress = await this.findByUserId(userId);
        if (userProgress.length === 0) {
            throw new NotFoundException(`No progress found for user with id ${userId}`);
        }
        await this.userProgressRepository.remove(userProgress);
    }

    async removeByQuestionId(questionId: string): Promise<void> {
        const userProgress = await this.findByQuestionlId(questionId);
        if (userProgress.length === 0) {
            throw new NotFoundException(`No progress found for level with id ${questionId}`);
        }
        await this.userProgressRepository.remove(userProgress);
    }
}
