import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity({name: "chats"})
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => UserEntity)
  @JoinTable({name: "chats_users"})
  users: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.id)
  messages: MessageEntity[];
}
