import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from "class-validator";
import IOffer from "src/constants/interface/offer"
import { UserDto } from "src/users/dto/user.dto";
import { WishDto } from "src/wishes/dto/wish.dto";

export class Offer {

    @IsNotEmpty()
    @IsNumber()
    id: IOffer['id'];

    @IsNotEmpty()
    @IsDate()
    createdAt: IOffer['createdAt'];

    @IsNotEmpty()
    @IsDate()
    updatedAt: IOffer['updatedAt'];

    @IsNotEmpty()
    item: WishDto;

    @IsNotEmpty()
    @IsNumber()
    amount: IOffer['amount'];

    @IsNotEmpty()
    @IsBoolean()
    hidden: IOffer['hidden'];

    @IsNotEmpty()
    user: UserDto
}