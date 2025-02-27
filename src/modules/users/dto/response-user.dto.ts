import { IsString,IsNumber } from "class-validator";

export class ResponseUserDto {
    @IsNumber()
    id: number;

    @IsString()
    email: string;

    @IsString()
    name: string;

}
