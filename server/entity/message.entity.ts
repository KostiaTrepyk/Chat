import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  time: string;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;
}
