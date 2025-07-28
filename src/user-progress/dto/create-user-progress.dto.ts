import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsNotEmpty } from "class-validator";

export class CreateUserProgressDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The ID of the user',
        example: 'UUID',
    })
    user_id: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The ID of the question',
        example: 'UUID',
    })
    question_id: string;
}