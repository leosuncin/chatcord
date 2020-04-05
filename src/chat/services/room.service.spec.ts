import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mockingoose from 'mockingoose';
import { model, Types } from 'mongoose';

import { CreateRoom } from '~chat/dtos/create-room.dto';
import { Room } from '~chat/schemas/room.schema';
import { RoomService } from '~chat/services/room.service';

describe('RoomService', () => {
  let service: RoomService;
  let RoomModel;

  beforeEach(async () => {
    RoomModel = model('Room', Room);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getModelToken('Room'),
          useValue: RoomModel,
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new room', async () => {
    mockingoose(RoomModel);
    const newRoom: CreateRoom = {
      name: "John's party",
      public: true,
    };
    const room = await service.create(newRoom);

    expect(room).toBeInstanceOf(RoomModel);
  });

  it('should find one room', async () => {
    const doc = {
      _id: new Types.ObjectId(),
      name: "John's party",
      public: true,
    };
    mockingoose(RoomModel).toReturn(doc, 'findOne');

    const room = await service.findOne(doc._id);

    expect(room).toBeDefined();
  });

  it('should fail wether room not exist', () => {
    mockingoose(RoomModel);

    return expect(service.findOne(new Types.ObjectId())).rejects.toThrow();
  });

  it('should find all rooms', async () => {
    mockingoose(RoomModel).toReturn(
      [
        {
          _id: new Types.ObjectId(),
          name: "John's party",
          public: true,
        },
        {
          _id: new Types.ObjectId(),
          name: "Jane's party",
          public: false,
        },
      ],
      'find',
    );

    const rooms = await service.findAll();

    expect(Array.isArray(rooms)).toBe(true);
  });

  it('should update a room', async () => {
    const doc = {
      _id: new Types.ObjectId(),
      name: "John's party",
      public: true,
    };
    mockingoose(RoomModel).toReturn(new RoomModel(doc), 'findOne');

    const room = await service.update(doc._id, { name: 'Best party' });

    expect(room).toHaveProperty('name', 'Best party');
    expect(room).toHaveProperty('public', true);
  });

  it('should remove one room', () => {
    const model = new RoomModel({
      _id: new Types.ObjectId(),
      name: "John's party",
      public: true,
    });
    mockingoose(RoomModel).toReturn(model, 'findOne').toReturn(model, 'remove');

    return expect(service.remove(model._id)).resolves.toBeDefined();
  });
});
