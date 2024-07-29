import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import { Column, Entity } from "typeorm";
import IOffer from "src/constants/interface/offer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

@Entity()
export class Offer extends BaseEntityForIdAndDate {

    @ApiProperty()
    @IsNotEmpty()
    item: IOffer['item'];
//-------------------------------------------
    @ApiProperty({description: 'количество'})
    @IsNotEmpty()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Column()
    amount: IOffer['amount'];
//-------------------------------------------
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Column({default: true})
    hidden: IOffer['hidden'];
//-------------------------------------------
    @ApiProperty()
    @IsNotEmpty()
    user: IOffer['user'];
}
