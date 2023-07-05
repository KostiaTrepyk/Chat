import { IsNumber, IsObject } from 'class-validator';
import { TokenData } from 'models/tokenData';

export class GetMessagesDto {
  @IsNumber()
  chatId: number;

  @IsObject()
  tokenData: TokenData;
}
