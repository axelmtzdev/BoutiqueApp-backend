import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),

    AuthModule, 
    ProductsModule, 
    SalesModule, 
    ClientsModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
