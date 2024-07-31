import IdAndDate from "./idAndDate";
import Offer from "./offer";
import User from "./user";

export default interface Wish extends IdAndDate{
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    description: string;
    owner: User;
    offers: Offer
}