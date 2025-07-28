import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'wrong answer text',
    example: 'Shtrasburg is the capital of France.',
  })
  text: string;
}
