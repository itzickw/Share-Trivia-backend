import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth') 
  @Post()
  async create(@Body() createLevelDto: CreateLevelDto): Promise<Level> {
    return this.levelsService.create(createLevelDto);
  }

  @Get()
  async findAll(): Promise<Level[]> {
    return this.levelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Level> {
    return this.levelsService.findOne(id);
  }

  @Get('level-number/:levelNumber')
  async findByLevelNumber(
    @Param('levelNumber') levelNumber: number,
  ): Promise<Level> {
    return this.levelsService.findByLevelNumber(levelNumber);
  } 

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Level[]> {
    return this.levelsService.findByName(name);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLevelDto: UpdateLevelDto,
  ): Promise<Level> {
    return this.levelsService.update(id, updateLevelDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Respond with 204 No Content on successful deletion
  async remove(@Param('id') id: string): Promise<void> {
    return this.levelsService.remove(id);
  }
}
