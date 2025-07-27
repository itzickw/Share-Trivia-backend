import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswersService],
  controllers: [AnswersController],
  exports: [AnswersService, TypeOrmModule.forFeature([Answer])],
})
export class AnswersModule {}
