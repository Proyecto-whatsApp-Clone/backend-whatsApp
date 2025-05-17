import { Module } from '@nestjs/common';
import { MessagesGateway } from './message.gateway';
import { MessagesService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessageModule {}
