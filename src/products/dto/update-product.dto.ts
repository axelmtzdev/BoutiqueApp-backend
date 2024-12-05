import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    brand?: string;
  
    @IsOptional()
    @IsNumber()
    priceBuy?: number;
  
    @IsOptional()
    @IsNumber()
    priceSale?: number;
  
    @IsOptional()
    @IsString()
    size?: string;
  
    @IsOptional()
    @IsNumber()
    stock?: number;
  
    @IsOptional()
    @IsUrl()
    imageUrl?: string;
  }