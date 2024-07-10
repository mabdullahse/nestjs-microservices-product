import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private userRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.userRepository.findOneBy({ id: id });
  }

  create(user: Product): Promise<Product> {
    return this.userRepository.save(user);
  }

  async incrementLike(id: number): Promise<UpdateResult> {
    const product = await this.userRepository.increment({ id }, 'like', 1);
    return product;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
