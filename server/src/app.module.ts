import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from './chats/chats.module';
import { ChatEntity } from '../entity/chat.entity';
import { MessageEntity } from '../entity/message.entity';
import { UserEntity } from '../entity/user.entity';
import { UsersModule } from './users/users.module';
import { RoleEntity } from 'entity/role.entity';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [UserEntity, RoleEntity, ChatEntity, MessageEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ChatsModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
