import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { createTestAccount } from 'nodemailer';
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
    BullModule.registerQueue({
      name: 'email',
      redis: process.env.REDIS_URL,
    }),
    MailerModule.forRootAsync({
      useFactory: async (): Promise<MailerOptions> => {
        const account = await createTestAccount();

        return {
          transport: {
            ...account.smtp,
            auth: {
              user: account.user,
              pass: account.pass,
            },
          },
        };
      },
    }),
    ChatModule,
    AuthModule,
  ],
})
export class AppModule {}
