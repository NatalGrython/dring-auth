import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { SignUpDto } from './dto/signup-dto';
import { AuthDto } from './dto/auth-dto';
import { ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Token, TokenPayload } from './auth.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 200,
    type: TokenPayload,
  })
  @Post('authorization')
  authorization(@Body() authDto: AuthDto) {
    return this.authService.authorization(authDto.token);
  }

  @ApiResponse({
    status: 200,
    type: Token,
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.login, loginDto.password);
  }

  @ApiResponse({
    status: 200,
    type: Token,
  })
  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @Get('token')
  createServiceToken() {
    return this.authService.generateServiceToken();
  }
}
