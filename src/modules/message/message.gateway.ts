import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './message.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway 
implements OnGatewayConnection, 
           OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { senderId: string; receiverId: string; content: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const message = await this.messagesService.sendMessage(
      data.senderId,
      data.receiverId,
      data.content,
    );

    this.server.to(data.receiverId).emit('newMessage', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody('userId') userId: string, @ConnectedSocket() client: Socket): void {
    client.join(userId);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

}
