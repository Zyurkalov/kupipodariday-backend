import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString, Length, MaxLength, Min, MinLength, minLength } from "class-validator";
import IWish from "src/constants/interface/wish"
import { Offer } from "src/offers/dto/offer.dto";
import UserPublicProfileResponseDto from "src/users/dto/user-public-profile-response.dto";
export class WishDto {

    @IsNotEmpty()
    @IsNumber()
    id: IWish['id'];

    @IsNotEmpty()
    @IsDate()
    createdAt: IWish['createdAt'];

    @IsNotEmpty()
    @IsDate()
    updatedAt: IWish['updatedAt'];

    @IsNotEmpty()
    @IsString()
    @Length(1, 250)
    name: IWish['name']

    @IsNotEmpty()
    @IsString()
    link: IWish['link']

    @IsNotEmpty()
    @IsString()
    image: IWish['image']

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: IWish['price']

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    raised: IWish['raised']

    @IsNotEmpty()
    @IsNumber()
    copied: IWish['copied']

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(1024)
    description: IWish['description']

    @IsNotEmpty()
    @IsObject()
    owner: UserPublicProfileResponseDto;

    @IsNotEmpty()
    @IsObject()
    offers: Offer; 
}