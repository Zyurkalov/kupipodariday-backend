import { Wish } from "src/wishes/entities/wish.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
// import IdAndDate from "./idAndDate";

interface User extends IdAndDate{
    username: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
    wishes: Wish;
    offers: Wish;
    wishlist: Wishlist;
}