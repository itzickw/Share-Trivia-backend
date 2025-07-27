import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

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

    @Get('question/:questionlId')
    getUserProgressByQuestionlId(@Param('levelId') questionId: string) {
        return this.userProgressService.findByQuestionlId(questionId);
    }

    @Get('topic-level/:userId/:topicId')
    getUserLeveTopic(@Param('userId') userId: string, @Param('topicId') topicId: string) {
        return this.userProgressService.findTopicUserLeve(userId, topicId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createUserProgress(@Body() createUserProgressDto: CreateUserProgressDto) {
        return this.userProgressService.create(createUserProgressDto);
    }

    @Delete(':id')
    removeUserProgress(@Param('id') id: string) {
        return this.userProgressService.remove(id);
    }
}
