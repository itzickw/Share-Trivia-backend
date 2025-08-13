import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user-progress')
export class UserProgressController {
    constructor(private readonly userProgressService: UserProgressService) {}
    @Get()
    getUserProgress() {
        return this.userProgressService.findAll();
    }

    @Get(':id')
    getUserProgressById(@Param('id') id: string) {        
        return this.userProgressService.findOne(id);
    }

    @Get('user/:userId')
    getUserProgressByUserId(@Param('userId') userId: string) {
        return this.userProgressService.findByUserId(userId);
    }

    @Get('question/:questionId')
    getUserProgressByQuestionId(@Param('levelId') questionId: string) {
        return this.userProgressService.findByQuestionId(questionId);
    }

    @Get('topic/level/:userId/:topicId/:levelNumber')
    getUserTopicLevelProgress(
        @Param('userId') userId: string,
        @Param('topicId') topicId: string,
        @Param('levelNumber') levelNumber: number,
    ) {
        return this.userProgressService.findTopicsLevelsUserProgress(userId, topicId, levelNumber);
    }

    @Get('level-in-topic/:userId/:topicId')
    getUserLeveInTopic(@Param('userId') userId: string, @Param('topicId') topicId: string) {
        return this.userProgressService.getUserLevelInTopic(userId, topicId);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @Post()
    createUserProgress(@Body() createUserProgressDto: CreateUserProgressDto) {
        return this.userProgressService.create(createUserProgressDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @Delete(':id')
    removeUserProgress(@Param('id') id: string) {
        return this.userProgressService.remove(id);
    }
}
