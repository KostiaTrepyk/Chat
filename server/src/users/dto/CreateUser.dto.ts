import {
  IsAlphanumeric,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(25)
  username: string;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(25)
  password: string;
}
