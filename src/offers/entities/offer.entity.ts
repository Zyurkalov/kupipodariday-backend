import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import IOffer from "src/constants/interface/offer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { Wish } from "src/wishes/entities/wish.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Offer extends BaseEntityForIdAndDate {

    @ApiProperty({ description: 'содержит ссылку на товар' })
    @IsNotEmpty()
    @ManyToOne(() => Wish, (wish) => wish.offers)
    item: Wish;


    @ApiProperty({ description: 'сумма заявки' })
    @IsNotEmpty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column()
    amount: IOffer['amount'];


    @ApiProperty({ 
        description: 'флаг, который определяет показывать ли информацию о скидывающихся в списке' 
    })
    @IsNotEmpty()
    @IsBoolean()
    @Column({ default: false })
    hidden: IOffer['hidden'];


    @ApiProperty({ description: 'содержит индефикатор желающего скинуться' })
    @IsNotEmpty()
    @ManyToOne(() => User, (user) => user.offers)
    user: IOffer['user'];
}
