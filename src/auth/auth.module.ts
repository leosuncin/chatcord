import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User } from '~auth/schemas/user.schema';
import { UserService } from '~auth/services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: User }])],
  providers: [UserService],
})
export class AuthModule {}
