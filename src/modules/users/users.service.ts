import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto):Promise<ResponseUserDto> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    const { password, ...rest } = user;
    return rest;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({where: { email } })
    if(!user) throw new UnauthorizedException('유저가 없습니다.');
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
