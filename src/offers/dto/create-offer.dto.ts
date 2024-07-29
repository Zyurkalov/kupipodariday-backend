import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';
import IOffer from 'src/constants/interface/offer';

export default class CreateOfferDto {

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: IOffer['amount'];

    @IsNotEmpty()
    @IsBoolean()
    hidden: IOffer['hidden'];

    @IsNotEmpty()
    @IsNumber()
    itemId: IOffer['itemId'];
}
