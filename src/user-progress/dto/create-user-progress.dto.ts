import { IsUUID, IsString, IsNotEmpty } from "class-validator";

export class CreateUserProgressDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsUUID()
    @IsNotEmpty()
    question_id: string;
}