import { Wish } from "src/wishes/entities/wish.entity";
import { Whishlist } from "src/whishlists/entities/whishlist.entity";
import IdAndDate from "./idAndDate";

export default interface User extends IdAndDate{
    username: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
    wishes: Wish;
    offers: Wish;
    wishlist: Whishlist;
}