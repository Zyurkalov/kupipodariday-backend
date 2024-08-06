import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishesGuard implements CanActivate {
  private readonly logger = new Logger(WishesGuard.name);
  constructor(private readonly wishesService: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const { amount, itemId } = req.body;
    const { owner, raised, price, offers } = await this.wishesService.getOne(
      itemId,
    );
    const isWasOffer = offers.some((offer) => offer.user.id === userId);

    try {
      if (owner.id === userId) {
        throw new ForbiddenException('Себе подарок спонсировать нелья');
      }
      if (isWasOffer) {
        throw new ForbiddenException('Вы уже спонсировали этот подарок');
      }
      if (raised >= price) {
        throw new ForbiddenException('Сбор на подарок уже закрыт');
      }
      if (raised + amount > price) {
        throw new BadRequestException('Указанная сумма превышает стоимость');
      }
    } catch (err) {
      this.logger.error(
        `ошибка в запросе пользователя ${userId} на подарок ${itemId}: ${err.message}`,
      );
      throw err;
    }

    return true;
  }
}
