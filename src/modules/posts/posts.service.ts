import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { ListAllPostDto } from './dto/list-all-post.dto';
import { ResponseListAllPostDto } from './dto/response-list-all-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto)
    return await this.postRepository.save(post)
  }

  async findAllPosts(options: ListAllPostDto) {
    // const { page, limit } = listAllpostDto
    // const [ data, total ] = await this.postRepository.findAndCount({
    //   relations: ['user'],
    //   take: limit,
    //   skip: limit * (page-1)
    // });

    const query = this.postRepository
      .createQueryBuilder('p')
      .orderBy('p.createdAt', 'DESC')
      .take(options.limit)
      .skip(options.limit * (options.page -1))
      .leftJoinAndSelect('p.user', 'user')
      .select([
        'p.id',
        'p.title',
        'p.content',
        'p.createdAt',
        'user.id',
        'user.name'
      ])
    
    if(options.title)
      query.andWhere('p.title LIKE :title', { title: `%${options.title}%` })
    
    if(options.content)
      query.andWhere('p.content LIKE :content', { content: `%${options.content}%` })

    if(options.user)
      query.andWhere('p.userId = :user', { user: options.user })

    const [ data, total ] = await query.getManyAndCount()

    return {
      data,
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil( total / options.limit )
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
