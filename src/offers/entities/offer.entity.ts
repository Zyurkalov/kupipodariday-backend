import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import IOffer from "src/constants/interface/offer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { Wish } from "src/wishes/entities/wish.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Offer extends BaseEntityForIdAndDate {

    @ApiProperty({ description: 'Подарок' })
    @IsNotEmpty()
    @ManyToOne(() => Wish, (wish) => wish.offers)
    item: Wish;


    @ApiProperty({ description: 'Сумма заявки' })
    @IsNotEmpty()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column()
    amount: number;


    @ApiProperty({ 
        description: 'Флаг, который определяет показывать ли информацию о скидывающихся в списке' 
    })
    @IsNotEmpty()
    @IsBoolean()
    @Column({ default: false })
    hidden: boolean;


    @ApiProperty({ description: 'Желающий скинуться' })
    @IsNotEmpty()
    @ManyToOne(() => User, (user) => user.offers)
    user: User;
}
