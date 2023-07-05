import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatsService } from './chats.service';
import { SendMessageDto } from './dto/sendMessageDto';
import { GetMessagesDto } from './dto/getMessagesDto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() dto: SendMessageDto) {
    const message = await this.chatsService.sendMessage(dto);
    if (message) {
      this.server.emit('message', message);
      return message;
    }
  }

  @SubscribeMessage('requestMessages')
  async listenForMessages(@MessageBody() dto: GetMessagesDto) {
    return await this.chatsService.getMessages(dto);
  }
}
