import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  handleConnection(client: Socket) {
    Logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('room')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ): string {
    // TODO: implement join to room
    return 'Hello world!';
  }

  @SubscribeMessage('events')
  findAll(): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}
