import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, IsUrl, Length, Min } from "class-validator";
import { maxLength_wishname, maxLength_description, minLength, DEFAULT_VALUES } from "src/constants/constants";
import { BaseEntityForIdAndDate } from "src/constants/entity/base.entity";
import IWish from "src/constants/interface/wish";
import { Column, Entity } from "typeorm";

@Entity()
export class Wish extends BaseEntityForIdAndDate {

    @ApiProperty()
    @IsString()
    @Length(minLength, maxLength_wishname)
    @Column()
    name: IWish['name'];
//-------------------------------------------
    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    @Column()
    link: IWish['link'];
//-------------------------------------------
    @ApiProperty()
    @IsUrl()
    @IsNotEmpty()
    @Column({default: DEFAULT_VALUES.image})
    image: IWish['image'];
//-------------------------------------------
    @ApiProperty()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Min(minLength)
    @IsNotEmpty()
    @Column()
    price: IWish['price'];
//-------------------------------------------
    @ApiProperty()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Min(minLength)
    @Column()
    raised: IWish['raised'];
//-------------------------------------------
    @ApiProperty()
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Column({default: 0})
    copied: IWish['copied'];
//-------------------------------------------
    @ApiProperty()
    @IsNotEmpty()
    @Length(minLength, maxLength_description)
    @Column()
    description: IWish['description'];
//-------------------------------------------
    @ApiProperty()
    @IsObject()
    owner: IWish['owner'];
//-------------------------------------------
    @ApiProperty()
    @IsArray()
    offers: IWish['offers'][];
}
