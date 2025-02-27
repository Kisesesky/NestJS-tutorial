import { BadRequestException, Injectable, Module } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ResponseUserDto } from '../../modules/users/dto/response-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../../modules/users/users.service';
import { LogInDto } from './dto/log-in.dto';
import { comparePassword, encryptPassword } from 'src/utils/password-util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}
  async signUp(signUpDto: SignUpDto): Promise<ResponseUserDto> {
    signUpDto.password = await encryptPassword(signUpDto.password)
    return await this.usersService.createUser(signUpDto)
  }

  async logIn(loginDto: LogInDto) {
    const { email, password } = loginDto
    const user = await this.usersService.findUserByEmail(email)
    if(!await comparePassword(password, user.password))
      throw new BadRequestException('Password가 틀렸습니다.')
    
    const { accessToken } = await this.setJwtAccessToken(email)
    return {
      accessToken,
    }
    
  }

  async setJwtAccessToken(
    email: string,
    _expiresIn: string = '1h',
    secret: string = 'secretKey',
  ) {
    const payload = { sub: email }
    const token = this.jwtService.sign(payload, {
      secret: secret,
      expiresIn : _expiresIn
    })
    return {
      accessToken: token
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
