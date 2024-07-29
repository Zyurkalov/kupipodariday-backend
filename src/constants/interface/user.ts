import Wish from "./wish";

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
    wishlist: Wish;
}