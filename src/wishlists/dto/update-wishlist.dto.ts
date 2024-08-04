import { PartialType } from '@nestjs/swagger';
import { CreateWhishlistDto } from './create-wishlist.dto';

export class UpdateWhishlistDto extends PartialType(CreateWhishlistDto) {}
