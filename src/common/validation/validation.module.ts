import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { Level } from 'src/levels/entities/level.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { ValidationService } from './validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Level])],
  controllers: [],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class ValidationModule {}
