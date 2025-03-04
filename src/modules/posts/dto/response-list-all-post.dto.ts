import { Post } from '../entities/post.entity';
import { ResponsePaginationDto } from './../../../common/dto/response-pagination.dto';

export class ResponseListAllPostDto extends ResponsePaginationDto {
    data: Post[];
}