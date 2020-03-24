import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoom } from '../dtos/create-room.dto';
import { UpdateRoom } from '../dtos/update-room.dto';
import { RoomController } from './room.controller';

describe('Room Controller', () => {
  let controller: RoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: 'RoomService',
          useValue: {
            create(dto) {
              return Promise.resolve(dto);
            },
            findOne(id) {
              return Promise.resolve({ id });
            },
            findAll() {
              return Promise.resolve([
                {
                  _id: '5e7a7f35b519c7f8e9af67e1',
                  name: "John's party",
                  public: true,
                },
                {
                  _id: '5e7a82b5256ea10963aceaa9',
                  name: "Jane's party",
                  public: false,
                },
              ]);
            },
            update(id, updateRoom) {
              return Promise.resolve({ ...updateRoom, id });
            },
            remove(id) {
              return Promise.resolve();
            },
          },
        },
      ],
    }).compile();

    controller = module.get<RoomController>(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new room', async () => {
    const newRoom: CreateRoom = {
      name: "John's party",
      public: true,
    };
    const room = await controller.create(newRoom);

    expect(room).toBeDefined();
  });

  it('should find one room', async () => {
    const doc = {
      _id: '5e7a7f35b519c7f8e9af67e1',
      name: "John's party",
      public: true,
    };

    const room = await controller.findOne(doc._id);

    expect(room).toBeDefined();
  });

  it('should find all rooms', async () => {
    const rooms = await controller.findAll();

    expect(Array.isArray(rooms)).toBe(true);
  });

  it('should update a room', async () => {
    const updateRoom: UpdateRoom = {
      name: 'Best party',
    };
    const room = await controller.update(
      '5e7a82b5256ea10963aceaa9',
      updateRoom,
    );

    expect(room).toHaveProperty('name', 'Best party');
  });

  it('should remove one room', () => {
    return expect(
      controller.remove('5e7a82b5256ea10963aceaa9'),
    ).resolves.not.toBeDefined();
  });
});
