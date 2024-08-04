import { ApiProperty, PickType } from '@nestjs/swagger';
import { Wishlist } from '../entities/wishlist.entity';
import IWish from 'src/constants/interface/wish';

export class CreateWhishlistDto extends PickType(Wishlist, ['name', 'image'] as const) {
    @ApiProperty({example: 'List [ 1 ]'})
    itemsId: IWish['id'][]

}
