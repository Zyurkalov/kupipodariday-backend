import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

import { IntersectionType, PickType } from "@nestjs/swagger";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import { maxLength_wishList, maxLength_wishname, minLength, } from "src/constants/constants";
import { Wish } from "src/wishes/entities/wish.entity";
import IWish from "src/constants/interface/wish";

@Entity()
export class Whishlist extends IntersectionType(
    BaseEntityForIdAndDate,
    PickType(Wish, ['image', 'owner'])) {

    @ApiProperty({ example: 'название списка' })
    @IsString()
    @Length(0, maxLength_wishname)
    @Column()
    name: IWish['name'];

    // description нет в описании API сервиса, но есть в вводном описании проекта
    @ApiProperty({ description: 'описание подборки', example: 'что дарить на мой ДР' })
    @IsOptional()
    @Length(minLength, maxLength_wishList)
    @Column({ default: 'что дарить на мой ДР' })
    description: IWish['description'];

    
    @ApiProperty({ description: 'содержит набор ссылок на подарки' })
    items: IWish[];
}
