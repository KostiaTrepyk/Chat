import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from 'entity/chat.entity';
import { MessageEntity } from 'entity/message.entity';
import { UserEntity } from 'entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ChatEntity, MessageEntity]), UsersModule],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway],
})
export class ChatsModule { }
