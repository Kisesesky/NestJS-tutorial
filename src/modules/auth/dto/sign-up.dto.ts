import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'


export class SignUpDto {
    @ApiProperty({ type: String })
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsString()
    password: string;

    @ApiProperty({ type: String })
    @IsString()
    name: string;
}
