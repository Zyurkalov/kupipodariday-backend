import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from '../wishes.service';

@Injectable()
export class WishOwnerGuard implements CanActivate {
  constructor(private readonly wishService: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userWishes: Wish[] = await this.wishService.getUserWish(
      req.user.username,
    );
    const wishId: number = +req.params.id;

    const wishExists = userWishes.some((wish) => wish.id === wishId);

    if (!wishExists) {
      throw new ForbiddenException(
        'Вы можете менять только собственные пожелания',
      );
    }

    return true;
  }
}
