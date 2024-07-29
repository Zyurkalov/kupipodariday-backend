import { PartialType } from "@nestjs/swagger";
import { Wish } from "./wish.entity";

export class wishPartical extends PartialType(Wish) {

}