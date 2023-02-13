import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoAsyncConnection } from './config/mongo.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongoAsyncConnection),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
})
export class AppModule {}
