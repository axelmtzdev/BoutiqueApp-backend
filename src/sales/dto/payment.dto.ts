import { IsDateString, IsNumber, IsOptional, Min } from "class-validator";

export class PaymentDto {
    @IsNumber()
    @Min(0)
    amount: number;

    @IsOptional()
    @IsDateString()
    date?: string;
}
