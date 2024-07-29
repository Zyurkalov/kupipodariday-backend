import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { PickType, PartialType, ApiProperty } from '@nestjs/swagger';
import { Offer } from '../entities/offer.entity';
import IOffer from 'src/constants/interface/offer';

export class CreateOfferDto extends PartialType(PickType(Offer, ['hidden'])) {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: IOffer['amount'];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    itemId: IOffer['itemId'];
}
