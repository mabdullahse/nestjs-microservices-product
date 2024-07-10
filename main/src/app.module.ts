import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest', {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      connectTimeoutMS: 30000, // 30 seconds
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const mongoose = require('mongoose');
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected');
    });
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error: ', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
  }
}
