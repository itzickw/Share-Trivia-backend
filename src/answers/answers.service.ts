import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}
  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answerRepository.save(createAnswerDto);
  }
  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }
  async findOne(id: string): Promise<Answer> {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) {
      throw new Error(`Answer with ID ${id} not found`);
    }
    return answer;
  }
  async remove(id: string): Promise<void> {
    const result = await this.answerRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Answer with ID ${id} not found`);
    }
  }
}
