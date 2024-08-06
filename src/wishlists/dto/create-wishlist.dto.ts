import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Wishlist } from '../entities/wishlist.entity';
// import IWish from 'src/constants/interface/wish';

export class CreateWhishlistDto extends PartialType(
  PickType(Wishlist, ['name', 'image']),
) {
  @ApiProperty({ example: '[ 0 ]' })
  itemsId: number[];
}
