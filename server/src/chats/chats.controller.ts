import { Controller, Get, UseGuards } from '@nestjs/common';
import { Body, Post, Request } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';
import { AddChatDto } from './dto/addChatDto';
import { AddUserToChatDto } from './dto/addUserToChatDto';
@Controller('/chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getChats')
  async getChats(@Request() req) {
    return await this.chatsService.getChats(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addChat')
  async addChat(@Request() req, @Body() dto: AddChatDto) {
    await this.chatsService.addChat(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addUserToChat')
  async addUserToChat(@Body() dto: AddUserToChatDto) {
    return await this.chatsService.addUserToChat(dto);
  }
}
