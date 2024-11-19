import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [

    MongooseModule.forRoot('mongodb://localhost:27017/proyecto-mensaje'),
    UserModule,
    // MessageModule,
    // ConversationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
