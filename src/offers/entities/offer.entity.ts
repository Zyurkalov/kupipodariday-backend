import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import { Column, Entity } from "typeorm";
import IOffer from "src/constants/interface/offer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

@Entity()
export class Offer extends BaseEntityForIdAndDate {

    @ApiProperty({ description: 'содержит ссылку на товар' })
    @IsNotEmpty()
    item: IOffer['item'];
    //-------------------------------------------
    @ApiProperty({ description: 'сумма заявки' })
    @IsNotEmpty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column()
    amount: IOffer['amount'];
    //-------------------------------------------
    @ApiProperty({ description: 'флаг, который определяет показывать ли информацию о скидывающемся в списке' })
    @IsNotEmpty()
    @IsBoolean()
    @Column({ default: false })
    hidden: IOffer['hidden'];
    //-------------------------------------------
    @ApiProperty({ description: 'содержит индефикатор желающего скинуться' })
    @IsNotEmpty()
    user: IOffer['user'];
}
