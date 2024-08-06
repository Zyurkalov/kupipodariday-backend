import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length, ValidateNested } from "class-validator";

import { IntersectionType, PickType } from "@nestjs/swagger";
import { BaseEntityForIdAndDate } from "src/constants/entity/base-entity";
import { DEFAULT_VALUES, maxLength_wishList, maxLength_wishname, minLength, } from "src/constants/constants";
import { Wish } from "src/wishes/entities/wish.entity";
import { User } from "src/users/entities/user.entity";
import { Type } from "class-transformer";
import { WishPartical } from "src/wishes/dto/wish-partical.dto";

// export class Wishlist extends IntersectionType(
//     BaseEntityForIdAndDate,
//     PickType(Wish, ['image', 'owner'] as const)) {

// export class Wishlist extends BaseEntityForIdAndDate {

@Entity()
export class Wishlist extends BaseEntityForIdAndDate {

    @ApiProperty({ example: 'Название списка' })
    @IsString()
    @Length(0, maxLength_wishname)
    @Column()
    name: string;

    // description нет в описании API сервиса, но есть в вводном описании проекта
    @ApiProperty({ 
        description: 'Описание подборки', 
        example: 'Что дарить на мой ДР' 
    })
    @IsOptional()
    @Length(minLength, maxLength_wishList)
    @Column({ default: 'Что дарить на мой ДР' })
    description: string;

    @ApiProperty({ 
        type: () => WishPartical, 
        description: 'Список подарков',
        isArray: true, 
    })
    @JoinTable()
    @ManyToMany(() => Wish)
    items: Wish[];

    // @ApiProperty({ type: () => User, description: 'Владелец списка пожелании' })
    // @ManyToOne(() => User, (owner) => owner.wishlists)
    // owner: User;

    //пробуем пофиксить баг: Entity "Wishlist" does not have a primary column
    // primary column должен был импортироваться из BaseEntityForIdAndDate

    @ApiProperty({
        description: 'Картинка списка',
        example: DEFAULT_VALUES.image
    })
    @IsUrl()
    @IsNotEmpty()
    @Column({ default: DEFAULT_VALUES.image })
    image: string;

    @ApiProperty({
        type: () => OmitType(User, ['password','wishes','wishlists','offers','email'] as const),
        description: 'Владелец пожелания',
        example: 'Антон'
    })
    @ManyToOne(() => User, (owner) => owner.wishlists, { eager: true })
    owner: User;
}
