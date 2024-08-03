import { UserPublicProfileResponseDto } from "src/users/dto/user-public-profile-response.dto";
import IdAndDate from "./idAndDate";
import { Offer } from "src/offers/entities/offer.entity";

export default interface Wish extends IdAndDate{
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    description: string;
    owner: UserPublicProfileResponseDto;
    offers: Offer
}