import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, IsUrl, Length, Min, ValidateNested } from "class-validator";
import { maxLength_wishname, maxLength_description, minLength, DEFAULT_VALUES } from "src/constants/constants";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import IWish from "src/constants/interface/wish";
import { Offer } from "src/offers/entities/offer.entity";
import { UserPublicProfileResponseDto } from "src/users/dto/user-public-profile-response.dto";
import { User } from "src/users/entities/user.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Wish extends BaseEntityForIdAndDate {

    @ApiProperty({description: 'название подарка'})
    @IsString()
    @Length(minLength, maxLength_wishname)
    @Column()
    name: string;


    @ApiProperty({
        description: 'ссылка на интернет-магазин, в котором можно приобрести подарок'
    })
    @IsUrl()
    @IsNotEmpty()
    @Column()
    link: string;


    @ApiProperty({
        description: 'ссылка на изображение подарка', 
        example: DEFAULT_VALUES.image
    })
    @IsUrl()
    @IsNotEmpty()
    @Column({ default: DEFAULT_VALUES.image })
    image: string;


    @ApiProperty({
        description: 'стоимость подарка', 
        example: 1_000_000
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(minLength)
    @IsNotEmpty()
    @Column()
    price: number;


    @ApiProperty({ 
        description: 'сумма которую пользователи сейчас готовы скинуть на подарок', 
        example: 1_000 
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(minLength)
    @Column()
    raised: number;


    @ApiProperty({ 
        description: 'содержит cчётчик тех, кто скопировал подарок себе', 
        example: 11 
    })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Column({ default: 0 })
    copied: number;


    @ApiProperty({ description: 'описание подарка' })
    @IsNotEmpty()
    @Length(minLength, maxLength_description)
    @Column()
    description: string;


    @ApiProperty({ 
        description: 'пользователь который добавил пожелание подарка', 
        example: 'Антон' 
    })
    // @IsObject()
    @Column()
    @ValidateNested()
    @Type(() => User)
    @ManyToOne(() => User, (owner) => owner.wishes)
    owner: User;


    @ApiProperty({ 
        description: 'массив ссылок на заявки скинуться от других пользователей' 
    })
    @IsArray()
    @OneToMany(() => Offer, (offer) => offer.item)
    offers: Offer[];

    // @ApiProperty()
    // @IsArray()
    // @ManyToMany(() => Wishlist)
    // Wishlists: Wishlist[];
}
