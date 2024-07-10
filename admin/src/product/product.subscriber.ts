import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Product } from './product.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  private readonly logger = new Logger(ProductSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  beforeInsert(event: InsertEvent<Product>): void | Promise<any> {
    this.logger.log(`beforeInsert`, JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    this.logger.log(`afterInsert`, JSON.stringify(event.entity));
  }
}
