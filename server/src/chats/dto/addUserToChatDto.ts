import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AddUserToChatDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsEmail()
  newUser_Email: string;
}
