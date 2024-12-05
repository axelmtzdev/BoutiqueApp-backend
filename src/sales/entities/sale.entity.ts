import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Sale {

    _id?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
    client: string;

    @Prop([{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }
    }])
    products: { productId: string; quantity: number; price: number }[];

    @Prop({ required: true, min: 0 })
    totalAmount: number;

    @Prop({
        type: [
            {
                amount: { type: Number, required: true, min: 0 },
                date: { type: Date, required: true },
                paymentType: {type: String, required: true}
            }
        ],
        default: [],
    })
    payments: { amount: number; date: Date, paymentType: string }[];

    @Prop({ default: Date.now })
    saleDate: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

