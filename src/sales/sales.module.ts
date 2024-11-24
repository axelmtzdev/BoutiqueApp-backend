import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './entities/sale.entity';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { Client, ClientSchema } from 'src/clients/entities/client.entity';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Sale.name,
        schema: SaleSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      },
      {
        name: Client.name,
        schema: ClientSchema
      }
    ])
  ]
})
export class SalesModule {}
