import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';
import { Level } from './entities/level.entity';
import { ValidationModule } from 'src/common/validation/validation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), ValidationModule],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [LevelsService, TypeOrmModule.forFeature([Level])], // Exporting LevelsService if needed in other modules
})
export class LevelsModule {}
