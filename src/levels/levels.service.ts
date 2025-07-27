import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ValidationService } from 'src/common/validation/validation.service';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
    private readonly validationService: ValidationService,
  ) {}
  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const newLevel = this.levelRepository.create(createLevelDto);
    return this.levelRepository.save(newLevel);
  }

  async findAll(): Promise<Level[]> {
    return this.levelRepository.find();
  }

  async findOne(id: string): Promise<Level> {
    const level = await this.validationService.validateLevel(id);
    return level;
  }

  async update(id: string, updateLevelDto: UpdateLevelDto): Promise<Level> {
    const level = await this.levelRepository.preload({
      id: id,
      ...updateLevelDto,
    });

    if (!level) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
    return this.levelRepository.save(level);
  }

  async remove(id: string): Promise<void> {
    const result = await this.levelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
  }

  async findByLevelNumber(levelNumber: number): Promise<Level> {
    // const levels = await this.levelRepository.find({
    //   where: { level_number: levelNumber },
    // });
    // if (levels.length === 0) {
    //   throw new NotFoundException(
    //     `No levels found with level number ${levelNumber}`,
    //   );
    // }
    const level = await this.validationService.validateLevelNumber(levelNumber);
    return level;
  }

  async findByName(name: string): Promise<Level[]> {
    const levels = await this.levelRepository.find({ where: { name } });
    if (levels.length === 0) {
      throw new NotFoundException(`No levels found with name ${name}`);
    }
    return levels;
  }
}
