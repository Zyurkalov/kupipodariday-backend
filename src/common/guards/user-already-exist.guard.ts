import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { MAP_EXCEPTION_TEXT } from 'src/constants/constants';

@Injectable()
export class UserAlreadyExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { username, email } = request.body;

    let existingUser: User;
    if (username !== undefined || email !== undefined) {
      existingUser = await this.userService.findUserByBody(username, email);
    }

    if (existingUser) {
      throw new ConflictException(MAP_EXCEPTION_TEXT.user.alreadyExists);
    }

    return true;
  }
}
