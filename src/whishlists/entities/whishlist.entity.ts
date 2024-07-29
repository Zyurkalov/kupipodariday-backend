import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

import { IntersectionType, PickType } from "@nestjs/swagger";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import { maxLength_wishname, } from "src/constants/constants";
import { Wish } from "src/wishes/entities/wish.entity";
import IWish from "src/constants/interface/wish";

@Entity()
export class Whishlist extends IntersectionType(
    BaseEntityForIdAndDate,
    PickType(Wish, ['image', 'owner'])
) {

    @ApiProperty({example: 'вишлист'})
    @IsString()
    @Length(0, maxLength_wishname)
    @Column()
    name: IWish['name'];

    @ApiProperty()
    items: IWish[];
}
