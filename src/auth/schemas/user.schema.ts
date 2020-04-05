import { Document, Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface User extends Document {
  email: NonNullable<string>;
  username: NonNullable<string>;
  avatar?: string;
}

export const User = new Schema<User>(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true },
);

User.plugin(mongooseUniqueValidator, { message: 'is already taken' });

User.methods.toJSON = function (this: User) {
  const user: User = this.toObject();

  user.id = user._id;
  delete user.__v;
  delete user._id;

  return user;
};
