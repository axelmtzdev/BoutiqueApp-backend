import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>
  ){}

  async create(createProductDto: CreateProductDto):Promise<Product> {
    try {
      const newProduct = new this.productModel(createProductDto);

      return await newProduct.save()

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`El producto con el nombre ${createProductDto.name} ya existe.`);
      }
      // Lanza una excepción para otros tipos de errores
      throw new InternalServerErrorException('Ocurrió un error al crear el producto.');
    }
  }

  findAll():Promise<Product[]> {
    return this.productModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
