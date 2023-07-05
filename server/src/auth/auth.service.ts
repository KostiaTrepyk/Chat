import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { TokenData } from 'models/tokenData';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(
    email: string,
    password: string,
  ): Promise<TokenData | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, messages, ...result } = user;
      return result;
    }
    return null;
  }

  async register(userData: CreateUserDto): Promise<boolean> {
    return await this.usersService.createUser(userData);
  }

  async login(user: TokenData): Promise<{ access_token: string }> {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      ban: user.ban,
      ban_reason: user.ban_reason,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
