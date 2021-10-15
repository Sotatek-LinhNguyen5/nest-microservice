import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IRequestUser } from './interfaces/request-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: IRequestUser) {
    const user = request.user;
    user.password = undefined;

    return user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: IRequestUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request: IRequestUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogout());

    return response.sendStatus(200);
  }
}
