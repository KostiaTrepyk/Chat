import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TokenData } from 'models/tokenData';

export class SendMessageDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text: string;

  @IsNotEmpty()
  @IsObject()
  tokenData: TokenData;
}
