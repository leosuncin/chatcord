import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room } from './schemas/room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: Room }])],
})
export class ChatModule {}
