import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    name:string;

    @IsString()
    brand: string;
    
    @IsNumber()
    @Min(0)
    priceBuy: number;

    @IsNumber()
    @Min(0)
    priceSale: number;

    @IsString()
    size: string;

    @IsNumber()
    @Min(1)
    stock: number;

    @IsString()
    imageUrl: string;


}
