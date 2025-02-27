import { IsString } from "class-validator";
import { User } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
    @IsString()
    title: string

    @IsString()
    content: string

    user?: User
}
