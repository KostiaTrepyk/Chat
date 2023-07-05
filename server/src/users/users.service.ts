import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<boolean> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(dto.password, saltOrRounds);

    const userExists = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with this email exists!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.save({
      username: dto.username,
      email: dto.email,
      password: hash,
    });

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.CREATED,
          error: 'User created!',
        },
        HttpStatus.CREATED,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Server error!',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async findOne(email: string): Promise<UserEntity> | null {
    return await this.userRepository.findOneBy({ email });
  }
}
