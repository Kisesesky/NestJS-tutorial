import { IsString } from "class-validator";
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger'


export class CreatePostDto {
    @ApiProperty({ type: String })
    @IsString()
    title: string

    @ApiProperty({ type: String })
    @IsString()
    content: string

    user?: User
}
