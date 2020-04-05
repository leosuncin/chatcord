import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomController } from '~chat/controllers/room.controller';
import { ChatGateway } from '~chat/gateways/chat.gateway';
import { Room } from '~chat/schemas/room.schema';
import { RoomService } from '~chat/services/room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: Room }])],
  providers: [RoomService, ChatGateway],
  controllers: [RoomController],
})
export class ChatModule {}
