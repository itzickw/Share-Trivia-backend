import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpStatus,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionsService: QuestionsService,
    ) { }

    @Get()
    async findAll(): Promise<Question[]> {
        return this.questionsService.findAll();
    }

    @Get('id/:id')
    async findOne(@Param('id') id: string): Promise<Question> {
        return this.questionsService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.questionsService.create(createQuestionDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ): Promise<Question> {
        return this.questionsService.update(id, updateQuestionDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Respond with 204 No Content on successful deletion
    async remove(@Param('id') id: string): Promise<void> {
        return this.questionsService.remove(id);
    }

    // @UseGuards(AuthGuard('jwt')) // Ensure this route is protected by JWT authentication
    @Get('quiz/:topicName/:levelNumber')
    async getQuizQuestions(
        @Param('topicName') topicName: string,
        @Param('levelNumber') levelNumber: number
    ): Promise<Question[]> {
        return this.questionsService.findQuizQuestions(topicName, +levelNumber);
    }

    @Get('level-id/:levelId')
    async findByLevelId(@Param('levelId') levelId: string): Promise<Question[]> {
        return this.questionsService.findByLevelId(levelId);
    }

    @Get('topic-id/:topicId')
    async findByTopicId(@Param('topicId') topicId: string): Promise<Question[]> {
        return (await this.questionsService.
            findByTopicId(topicId)).
            sort((a, b) => a.level.level_number - b.level.level_number); // Sort questions by level number
    }

    @Get('topic-name/:topicName')
    async findByTopicName(@Param('topicName') topicName: string): Promise<Question[]> {
        log(`Finding questions for topic: ${topicName}`);
        return (await this.questionsService.
            findByTopicName(topicName)).
            sort((a, b) => a.level.level_number - b.level.level_number); // Sort questions by level number
    }
}
