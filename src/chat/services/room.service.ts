import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRoom } from '../dtos/create-room.dto';
import { UpdateRoom } from '../dtos/update-room.dto';
import type { Room } from '../schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private readonly RoomModel: Model<Room>) {}

  create(createRoom: CreateRoom): Promise<Room> {
    const room = new this.RoomModel(createRoom);
    return room.save();
  }

  async findOne(id: string | Types.ObjectId): Promise<Room> {
    const room = await this.RoomModel.findById(id);

    if (!room) throw new NotFoundException();

    return room;
  }

  findAll(): Promise<Room[]> {
    return this.RoomModel.find().exec();
  }

  async update(
    id: string | Types.ObjectId,
    updateRoom: UpdateRoom,
  ): Promise<Room> {
    const room = await this.findOne(id);

    Object.assign(room, updateRoom);

    return room.save();
  }

  async remove(id: string | Types.ObjectId): Promise<Room> {
    const room = await this.findOne(id);

    return room.remove();
  }
}
