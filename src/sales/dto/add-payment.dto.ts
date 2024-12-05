import { Type } from "class-transformer";
import { IsMongoId, ValidateNested } from "class-validator";
import { PaymentDto } from "./payment.dto";

export class AddPaymentDto {
    @IsMongoId()
    saleId: string;

    @ValidateNested()
    @Type(() => PaymentDto)
    payment: PaymentDto;

    
}
