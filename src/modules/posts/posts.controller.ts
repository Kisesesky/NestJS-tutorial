import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RequestUser } from '../../decorators/request.decorator';
import { User } from '../../modules/users/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { ListAllPostDto } from './dto/list-all-post.dto';
import { ResponseListAllPostDto } from './dto/response-list-all-post.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TransformInterceptor } from './../../common/interceptors/transform.interceptor';


@ApiTags('포스트 관리')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
@UseInterceptors(TransformInterceptor)
export class PostsController {
  logger = new Logger(Controller.name);
  constructor(private readonly postsService: PostsService) {}

  @ApiBody({ type: CreatePostDto })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @RequestUser() user: User) {
    createPostDto.user = user
    return await this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(@Query() listAllPostDto: ListAllPostDto) {
    return await this.postsService.findAllPosts(listAllPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.debug('디버깅 중입니다.')
    this.logger.log('로그 출력중')
    this.logger.error('에러발생')
    this.logger.verbose('verbose 중')
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
