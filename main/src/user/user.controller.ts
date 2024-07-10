// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  @EventPattern('product_created')
  async handleProductCreated(data: CreateUserDto) {
    console.log('Event Recieved: product_created');
    this.userService.create(data);
  }

  @EventPattern('product_deleted')
  async handleProductDeleted(id: string) {
    console.log('Event Recieved: product_deleted');
    this.userService.delete(id);
  }

  @Post(':id/like')
  async likePost(@Param('id') likeId: string) {
    this.httpService
      .post('http://localhost:8000/api/product/1/like', {})
      .subscribe();
    return this.userService.likeUpdate(likeId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }
}
