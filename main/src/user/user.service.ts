// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);

      return createdUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async likeUpdate(id: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $inc: { like: 1 } },
      { new: true }, // Return the updated document
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
