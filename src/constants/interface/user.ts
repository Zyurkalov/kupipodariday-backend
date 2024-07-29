import { Wish } from "src/wishes/entities/wish.entity";
import { Whishlist } from "src/whishlists/entities/whishlist.entity";

export default interface User {
    id: number;
    username: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    wishes: Wish;
    offers: Wish;
    wishlist: Whishlist;
}