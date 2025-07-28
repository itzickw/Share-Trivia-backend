import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional, Min } from 'class-validator';

export class CreateLevelDto {
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'The level number, must be a positive integer starting from 1',
    example: 1,
  })
  level_number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the level',
    example: 'Beginner',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The level color in the frontend, optional field',
    example: '#FF5733',
    required: false,
  })
  color?: string;
}
