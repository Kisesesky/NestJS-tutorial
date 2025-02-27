import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RequestUser } from 'src/decorators/request.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  logger = new Logger(Controller.name);
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @RequestUser() user: User) {
    createPostDto.user = user
    return await this.postsService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAllPosts();
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
