import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from '../wishes.service';

@Injectable()
export class WishNotOwnerGuard implements CanActivate {
  constructor(private readonly wishService: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user.username;

    const userWishes: Wish[] = await this.wishService.getWishesByUsername(user);
    const wishId: number = +req.params.id;
    const wish = await this.wishService.getAllByArrayIds([wishId]);
    const { name, price, link } = wish[0];

    const wishExists = userWishes.some(
      ({ name: wishName, link: wishLink, price: wishPrice }) =>
        wishName === name && wishLink === link && wishPrice === price,
    );
    if (wishExists) {
      throw new ForbiddenException('Похоже у вас уже есть этот подарок');
    }

    return true;
  }
}
