import { ApiProperty, PickType } from '@nestjs/swagger';
import { Whishlist } from '../entities/whishlist.entity';
import IWish from 'src/constants/interface/wish';

export class CreateWhishlistDto extends PickType(Whishlist, ['name', 'image'] as const) {
    @ApiProperty({example: 'List [ 1 ]'})
    itemsId: IWish['id'][]

}
