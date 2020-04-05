import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from '~auth/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: User }])],
})
export class AuthModule {}
