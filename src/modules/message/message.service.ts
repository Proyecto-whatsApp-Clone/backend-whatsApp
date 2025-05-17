import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async sendMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
    const newMessage = new this.messageModel({ senderId, receiverId, content });
    return newMessage.save();
  }

  async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
    return this.messageModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: -1 });
  }

  async markAsRead(messageId: string): Promise<Message> {
    return this.messageModel.findByIdAndUpdate(messageId, { isRead: true }, { new: true });
  }
}
