import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LogInDto } from './dto/log-in.dto';
import { Request, Response } from 'express';
import { RequestOrigin } from '../../decorators/origin.decorator';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'

// import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('유저인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignUpDto })
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  // @UseGuards(LocalAuthGuard)
  // @ApiBearerAuth()
  @ApiBody({ type: LogInDto })
  @Post('login')
  async login(@Body() loginDto: LogInDto, @Res() res:Response, @RequestOrigin() origin) {
    const { accessToken, accessOption, refreshToken, refreshOption } = await this.authService.logIn(loginDto, origin)
    res.cookie('Authenticate', accessToken, accessOption)
    res.cookie('Refresh', refreshToken, refreshOption)
    return res.json({
      message: '로그인 성공!',
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }
  @ApiBearerAuth()
  @Post('logout')
  logout(
    @Res() res: Response, @RequestOrigin() origin) {
      const { accessOption, refreshOption } =this.authService.expireJwtToken(origin)
      res.cookie('Authentication', '', accessOption)
      res.cookie('Refresh', '', refreshOption)
      res.json({
        message: '로그아웃 완료'
      })
    }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('csrf')
   getCsrf(@Req() req: Request) {
    return { csrf: req.csrfToken}
   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
