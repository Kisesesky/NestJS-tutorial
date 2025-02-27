import { BadRequestException, Injectable, Module } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ResponseUserDto } from '../../modules/users/dto/response-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../../modules/users/users.service';
import { LogInDto } from './dto/log-in.dto';
import { comparePassword, encryptPassword } from 'src/utils/password-util';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'csurf';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}
  async signUp(signUpDto: SignUpDto): Promise<ResponseUserDto> {
    signUpDto.password = await encryptPassword(signUpDto.password)
    return await this.usersService.createUser(signUpDto)
  }

  async logIn(loginDto: LogInDto, requestDomain: string) {
    const { email, password } = loginDto
    const user = await this.usersService.findUserByEmail(email)
    if(!await comparePassword(password, user.password))
      throw new BadRequestException('Password가 틀렸습니다.')
    
    const { accessToken, accessOption } = await this.setJwtAccessToken(email, requestDomain)
    const { refreshToken, refreshOption } = await this.setJwtRefreshToken(email, requestDomain)
    return {
      accessToken,
      accessOption,
      refreshToken,
      refreshOption
    }
    
  }

  async setJwtAccessToken(
    email: string,
    requestDomain: string,
  ) {
    const payload = { sub: email }
    const maxAge = 24 * 3600 * 1000
    const token = this.jwtService.sign(payload, {
      secret: 'secretKey',
      expiresIn : maxAge
    })
    return {
      accessToken: token,
      accessOption: this.setCookieOption(maxAge, requestDomain)
    }
  }

  async setJwtRefreshToken(email: string, requestDomain: string) {
    const payload = { sub: email }
    const maxAge = 15 * 24 * 60 * 1000
    const token = this.jwtService.sign(payload, {
      secret: 'refreshSecretKey',
      expiresIn : maxAge,
    })
    return {
      refreshToken: token,
      refreshOption: this.setCookieOption(maxAge, requestDomain)
    }
  }

  setCookieOption(maxAge: number, requestDomain: string):CookieOptions {
    let domain: string

    if(requestDomain.includes('127.0.0.1') || requestDomain.includes('localhost')){
      domain = 'localhost'
    } else {
      domain = requestDomain
    }
    return {
      domain,
      path: '/',
      httpOnly: true,
      maxAge,
      sameSite: 'lax'
    }
  }

  expireJwtToken(requestDomain: string) {
    return {
      accessOption: this.setCookieOption(0, requestDomain),
      refreshOption: this.setCookieOption(0, requestDomain)
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
