import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from 'entity/chat.entity';
import { MessageEntity } from 'entity/message.entity';
import { UserEntity } from 'entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SendMessageDto } from './dto/sendMessageDto';
import { GetMessagesDto } from './dto/getMessagesDto';
import { AddChatDto } from './dto/addChatDto';
import { AddUserToChatDto } from './dto/addUserToChatDto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ChatEntity)
    private chatsRepository: Repository<ChatEntity>,
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
    private usersService: UsersService,
  ) {}

  async getChats(userId: number) {
    const userData = await this.usersRepository.findOneBy({ id: userId });
    const result = await this.chatsRepository.findBy({ users: userData });
    return result;
  }

  async addChat(userId: number, dto: AddChatDto) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    await this.chatsRepository.save({
      title: dto.title,
      users: [user],
    });
  }

  async addUserToChat(dto: AddUserToChatDto) {
    const newUser = await this.usersService.findOne(dto.newUser_Email);
    const chat = await this.chatsRepository.findOne({
      relations: { users: true },
      where: { id: dto.chatId },
    });
    if (chat && newUser) {
      chat.users = [...chat.users, newUser];
      this.chatsRepository.save(chat);
    }
  }

  async getMessages(dto: GetMessagesDto): Promise<MessageEntity[] | null> {
    if (dto.chatId && dto.chatId >= 0) {
      const user = await this.usersService.findOne(dto.tokenData.email);
      const chat = await this.chatsRepository.findOneBy({
        id: dto.chatId,
        users: user,
      });
      const messages = await this.messagesRepository.find({
        relations: { user: true },
        where: { chat },
      });
      return messages;
    }
    return null;
  }

  async sendMessage(dto: SendMessageDto): Promise<{
    text: string;
    time: string;
    chat: ChatEntity;
    user: UserEntity;
  } | null> {
    if (dto.text.trim().length > 0) {
      // time
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const date = new Date();
      let time = `${
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      }:${
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      } ${days[date.getDay()]}`;

      const user = await this.usersService.findOne(dto.tokenData.email);
      const chat = await this.chatsRepository.findOneBy({ id: dto.chatId });

      const message = this.messagesRepository.save({
        text: dto.text,
        time: time,
        chat: chat,
        user: user,
      });
      return message;
    }
    return null;
  }
}
