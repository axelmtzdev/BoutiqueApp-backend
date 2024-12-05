import { IsDateString, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class PaymentDto {
    @IsNumber()
    @Min(0)
    amount: number;

   
    @IsDateString()
    date: Date;

    @IsString()
    paymentType: string
}
