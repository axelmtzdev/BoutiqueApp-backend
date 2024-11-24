import { IsArray, IsDateString, IsMongoId, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentDto } from './payment.dto';

class ProductDto {
    @IsMongoId()
    productId: string;
  
    @IsNumber()
    @Min(1)
    quantity: number;
  }
  
  export class CreateSaleDto {
    @IsMongoId()
    client: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PaymentDto)
    payments?: PaymentDto[];

    @IsOptional()  // saleDate es opcional
    @IsDateString()
    saleDate?: Date;
}

