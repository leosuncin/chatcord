import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room } from './schemas/room.schema';
import { RoomService } from './services/room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: Room }])],
  providers: [RoomService],
})
export class ChatModule {}
