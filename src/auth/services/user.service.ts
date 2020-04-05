import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUser } from '~auth/dtos/create-user.dto';
import { UpdateUser } from '~auth/dtos/update-user.dto';
import type { User } from '~auth/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly User: Model<User>) {}

  create(newUser: CreateUser) {
    const user = new this.User(newUser);

    return user.save();
  }

  async findOne(id: string | Types.ObjectId) {
    const user = await this.User.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  findAll(size = 20, page = 1) {
    return this.User.find()
      .limit(size)
      .skip(size * (page - 1))
      .exec();
  }

  async update(id: string | Types.ObjectId, updateUser: UpdateUser) {
    const user = await this.findOne(id);

    Object.assign(user, updateUser);

    return user.save();
  }

  async remove(id: string | Types.ObjectId) {
    const user = await this.findOne(id);

    return user.remove();
  }
}
