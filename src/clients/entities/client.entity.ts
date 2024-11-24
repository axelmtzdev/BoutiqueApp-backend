import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Client {
    _id?: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    contact: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);