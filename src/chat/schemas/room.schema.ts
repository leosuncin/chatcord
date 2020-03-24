import { Document, Schema } from 'mongoose';

export interface Room extends Document {
  name: string;
  public: boolean;
}

export const Room = new Schema<Room>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    public: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

Room.methods.toJSON = function(this: Room) {
  const room: Room = this.toObject();

  room.id = room._id;
  delete room.__v;
  delete room._id;

  return room;
};
