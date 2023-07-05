import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('checkToken')
  async checkToken() {
    return true;
  }

  @Post('signUp')
  async register(@Body() body: CreateUserDto): Promise<boolean> {
    return await this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
