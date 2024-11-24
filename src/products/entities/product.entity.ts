import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {
    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    brand: string;

    @Prop({ required: true, min: 0 })
    priceBuy: number;

    @Prop({ required: true, min: 0 })
    priceSale: number;

    @Prop({required: true})
    size: string;

    @Prop({ required: true, min: 1 })
    stock: number;

    @Prop()
    imageUrl: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
