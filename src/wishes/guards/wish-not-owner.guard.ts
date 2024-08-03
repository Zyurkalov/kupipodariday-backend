import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from 'src/users/entities/user.entity';
import { Wish } from "src/wishes/entities/wish.entity";
import { Repository } from 'typeorm';

@Injectable()
export class WishNotOwnerGuard implements CanActivate {
    constructor(@InjectRepository(Wish) private readonly wishRepository: Repository<Wish> ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const userWishes: Wish[] = req.user.wishes;
        const wishId: number = +req.params.id;

        const wishExists = userWishes.some(wish => wish.id === wishId);

        if (wishExists) {
            throw new ForbiddenException('У вас уже есть это пожелание');
          }
        
        return true; 
    }
}