import IdAndDate from "./idAndDate";
import User from "./user";
import Wish from "./wish";

export default interface Offer extends IdAndDate{
    item: Wish;
    amount: number;
    hidden: boolean;
    user: User;
    itemId: number;
}