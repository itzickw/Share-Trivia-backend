import { IsString, IsNotEmpty, IsInt, IsOptional, Min } from 'class-validator';

export class CreateLevelDto {
  @IsInt()
  @Min(1)
  level_number: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  color?: string;
}
