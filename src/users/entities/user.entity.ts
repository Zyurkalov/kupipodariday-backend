import { IsArray, IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntityForIdAndDate } from 'src/constants/entity/base-entity';
import { DEFAULT_VALUES, maxLength_username, maxLength_about, minLength } from 'src/constants/constants';
import { Exclude } from 'class-transformer';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class User extends BaseEntityForIdAndDate {

    @ApiProperty({ 
        description: "имя пользователя", 
        example: DEFAULT_VALUES.user, 
    })
    @IsNotEmpty()
    @IsString()
    @Length(minLength, maxLength_username)
    @Column({ unique: true })
    username: string;


    @ApiProperty({
        description: "информация об пользователе",
        example: DEFAULT_VALUES.about,
    })
    @Column({
        default: DEFAULT_VALUES.about
    })
    @IsNotEmpty()
    @IsString()
    @Length(minLength, maxLength_about)
    about: string;


    @ApiProperty({
        description: "аватар пользователя",
        example: DEFAULT_VALUES.avatar,
    })
    @Column({
        default: DEFAULT_VALUES.avatar
    })
    @IsNotEmpty()
    @IsUrl()
    avatar: string;


    @ApiProperty({
        description: "эл.почта пользователя",
        example: DEFAULT_VALUES.email,
    })
    @IsNotEmpty()
    @IsEmail()
    @Column({ unique: true })
    email: string;


    @ApiProperty({
        description: 'пaроль пользователя',
        example: 'password123'
    })
    @IsNotEmpty()
    @IsString()
    @Exclude()
    @Column({ select: false })
    password: string;


    @ApiProperty({
        type: () => Wish,
        description: 'список желаемых подарков',
        isArray: true,
    })
    @IsArray()
    @OneToMany(() => Wish, (wishes) => wishes.owner)
    wishes: Wish[];


    @ApiProperty({
        type: () => Offer,
        description: 'список дарителей',
        isArray: true,
    })
    @IsArray()
    @OneToMany(() => Offer, (offers) => offers.user)
    offers: Offer[];


    @ApiProperty({
        type: () => Wishlist,
        description: 'список вишлистов, которые создал пользователь',
        isArray: true,
    })
    @IsArray()
    @OneToMany(() => Wishlist, (wishlists) => wishlists.owner)
    wishlists: Wishlist[];
}
