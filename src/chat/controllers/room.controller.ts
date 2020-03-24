import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoom } from '../dtos/create-room.dto';
import { UpdateRoom } from '../dtos/update-room.dto';
import { RoomService } from '../services/room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @Post()
  create(@Body() createRoom: CreateRoom) {
    return this.service.create(createRoom);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoom: UpdateRoom) {
    return this.service.update(id, updateRoom);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
