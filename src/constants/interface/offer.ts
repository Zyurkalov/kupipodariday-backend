import User from "./user";
import Wish from "./wish";

export default interface Offer {
    id: number;
    createdAt: string;
    updatedAt: string;
    item: Wish;
    amount: number;
    hidden: boolean;
    user: User;
    itemId: number;
}