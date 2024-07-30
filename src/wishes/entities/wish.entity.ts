import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, IsUrl, Length, Min } from "class-validator";
import { maxLength_wishname, maxLength_description, minLength, DEFAULT_VALUES } from "src/constants/constants";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import IWish from "src/constants/interface/wish";
import { Column, Entity } from "typeorm";

@Entity()
export class Wish extends BaseEntityForIdAndDate {

    @ApiProperty({
        description: 'название подарка'
    })
    @IsString()
    @Length(minLength, maxLength_wishname)
    @Column()
    name: IWish['name'];
    //-------------------------------------------
    @ApiProperty({
        description: 'ссылка на интернет-магазин, в котором можно приобрести подарок'
    })
    @IsUrl()
    @IsNotEmpty()
    @Column()
    link: IWish['link'];
    //-------------------------------------------
    @ApiProperty({
        description: 'ссылка на изображение подарка', example: DEFAULT_VALUES.image
    })
    @IsUrl()
    @IsNotEmpty()
    @Column({ default: DEFAULT_VALUES.image })
    image: IWish['image'];
    //-------------------------------------------
    @ApiProperty({
        description: 'стоимость подарка', example: 1_000_000
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(minLength)
    @IsNotEmpty()
    @Column()
    price: IWish['price'];
    //-------------------------------------------
    @ApiProperty({ description: 'сумма которую пользователи сейчас готовы скинуть на подарок', example: 1_000 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(minLength)
    @Column()
    raised: IWish['raised'];
    //-------------------------------------------
    @ApiProperty({ description: 'содержит cчётчик тех, кто скопировал подарок себе', example: 11 })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column({ default: 0 })
    copied: IWish['copied'];
    //-------------------------------------------
    @ApiProperty({ description: 'описание подарка' })
    @IsNotEmpty()
    @Length(minLength, maxLength_description)
    @Column()
    description: IWish['description'];
    //-------------------------------------------
    @ApiProperty({ description: 'пользователь который добавил пожелание подарка', example: 'Антон' })
    @IsObject()
    owner: IWish['owner'];
    //-------------------------------------------
    @ApiProperty({ description: 'массив ссылок на заявки скинуться от других пользователей' })
    @IsArray()
    offers: IWish['offers'][];
}
