import { Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) { }
    @Get()
    async findAll() {
        return this.answersService.findAll();
    }
    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @Post()
    async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        return this.answersService.create(createAnswerDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @Delete(':id')
    async remove(id: string) {
        return this.answersService.remove(id);
    }
    
    @Get(':id')
    async findOne(id: string): Promise<Answer> {
        return this.answersService.findOne(id);
    }
}
