import Offer from "./offer";

export default interface Wish {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    description: string;
    owner: any;
    offers: Offer
}