import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from '~auth/auth.module';
import { ChatModule } from '~chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ChatModule,
    AuthModule,
  ],
})
export class AppModule {}
