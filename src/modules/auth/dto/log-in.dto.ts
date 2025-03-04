import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class LogInDto {
    @ApiProperty({ type: 'string' })
    @IsEmail()
    email: string;

    @IsString()
    password: string;

}
