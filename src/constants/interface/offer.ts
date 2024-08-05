// import IdAndDate from "./idAndDate";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";

interface Offer extends IdAndDate{
    item: Wish;
    amount: number;
    hidden: boolean;
    user: User;
    itemId: number;
}