import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class WishOwnerGuard implements CanActivate {
  // constructor(@InjectRepository(Wish) private readonly wishRepository: Repository<Wish> ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userWishes: Wish[] = req.user.wishes || [];
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
