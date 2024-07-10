import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() user: Product): Promise<Product> {
    const product = await this.productService.create(user);
    this.client.emit<number>('product_created', product);
    return product;
  }

  @Post(':id/like')
  async likePost(@Param('id') likeId: number) {
    return this.productService.incrementLike(likeId);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    this.client.emit<number>('product_deleted', id);
    return this.productService.remove(id);
  }
}
