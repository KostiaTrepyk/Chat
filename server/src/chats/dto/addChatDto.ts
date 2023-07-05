import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddChatDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  title: string;
}
